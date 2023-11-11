const { assert, expect } = require('chai');
const { faker } = require('@faker-js/faker');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');

const URL_BASE = 'http://localhost:2368/ghost/#';

const wait = (ms = 1) => new Promise(resolve => setTimeout(resolve, ms * 1000));

function selectComponent(context, componentDetails) {
    context.driver.$(componentDetails).waitForExist(5000);
    context.driver.$(componentDetails).waitForDisplayed(5000);

    return context.driver.$(componentDetails);
}

async function login(context) {
    await context.driver.url(`${URL_BASE}/signin/`);
    await selectComponent(context, '.gh-input.email').setValue('admin@email.com');
    await selectComponent(context, '.gh-input.password').setValue('pruebasE2E');
    await selectComponent(context, `[data-test-button='sign-in']`).click();
}

async function logout(context) {
    await context.driver.url(`${URL_BASE}/signout/`);
}

async function deleteAll(context) {
    await context.driver.url(`${URL_BASE}/settings/labs`);
    await selectComponent(context, `button[data-test-button="delete-all"]`).click();
    await wait(1);
    await selectComponent(context, `button.gh-btn.gh-btn-red.gh-btn-icon.ember-view`).click();
    await wait(1);
    await selectComponent(context, `button.gh-alert-close`).click();
}

async function goToDashboard(context) {
    await context.driver.url(`${URL_BASE}/dashboard`);
}

async function searchGlobalAndClick(context) {
    await selectComponent(context, 'button.gh-nav-btn-search').click();
    await wait(1);
    await selectComponent(context, 'input[name="selectSearchTerm"].gh-input-with-select-input').click();
}

async function newPost(context) {
    await selectComponent(context, `span=New post`).click();
    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('editor/post'));
}

async function createPost(context, title, description) {
    await selectComponent(context, 'textarea[placeholder="Post title"]').setValue(title);
    const element = await selectComponent(context, '.koenig-react-editor');
    await element.click();
    await wait(1);
    await element.setValue(description);
}

async function editPost(context, title, description) {
    await selectComponent(context, 'textarea[placeholder="Post title"]').setValue(title);
    const element = await selectComponent(context, '.koenig-react-editor');
    await element.click();
    await wait(1);
    await element.setValue(description);

    await selectComponent(context, 'span=Update').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
}

async function publishPost(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
}

async function schedulePost(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await selectComponent(context, 'span=Right now').click();
    await wait(1);
    await selectComponent(context, 'label=Schedule for later').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
}

async function deletePost(context) {
    await selectComponent(context, 'button[title="Settings"]').click();
    await selectComponent(context, 'button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click();
    await selectComponent(context, 'span=Delete').click();
}

async function unschedulePost(context) {
    await selectComponent(context, 'span=Unschedule').click();
    await wait(1);
    await selectComponent(context, 'button.gh-revert-to-draft').click();
}

async function setUp(context) {
    await login(context);
    await deleteAll(context);
    await goToDashboard(context);
}

Before(async function () {
    await setUp(this);
});

After(async function () {
    await goToDashboard(this);
    await logout(this);
});

Given('Admin starts app', async function () {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes('ghost/#/dashboard'));
});

When('Admin navigates to {string} page', async function (pageUrl) {
    const newUrl = pageUrl[0] === '/' ? pageUrl.substring(1) : pageUrl;
    await this.driver.url(`${URL_BASE}/${newUrl}`);
});

When('Admin clicks to new Post', async function () {
    await newPost(this);
});

When('Admin creates new Post', async function () {
    await createPost(this, faker.person.jobTitle(), faker.lorem.paragraph(2));
});

When('Admin schedules post', async function () {
    await schedulePost(this);
});

When('Admin clicks {int} post', async function (position) {
    const div = await selectComponent(this, 'div.posts-list.gh-list.feature-memberAttribution');
    const items = await div.$$('div.gh-posts-list-item-group');
    const post = items[position - 1];
    await post.click();
});

When('Admin clicks to Unschedule', async function () {
    await unschedulePost(this);
});

Then('Admin visualizes {string} page', async function (pageUrl) {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes(pageUrl));
});

Then('Admin sees {int} posts', async function (total) {
    const div = await selectComponent(this, 'div.posts-list.gh-list.feature-memberAttribution');
    const items = await div.$$('div.gh-posts-list-item-group');
    assert.equal(items.length, total);
});
