const { assert } = require('chai');
const { faker } = require('@faker-js/faker');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');

const configProperties = require('../../../kraken.config');

const URL_BASE = `${configProperties.env.baseUrl}/ghost/#`;
const version = configProperties.env.version;

const wait = (ms = 1) => new Promise(resolve => setTimeout(resolve, ms * 1000));

function selectComponent(context, componentDetails) {
    context.driver.$(componentDetails).waitForExist(5000);
    context.driver.$(componentDetails).waitForDisplayed(5000);

    return context.driver.$(componentDetails);
}

async function login(context) {
    await context.driver.url(`${URL_BASE}/signin/`);
    await selectComponent(context, '.gh-input.email').setValue(configProperties.env.email);
    await selectComponent(context, '.gh-input.password').setValue(configProperties.env.password);
    await selectComponent(context, 'button.login.gh-btn.gh-btn-login').click();
}

async function logout(context) {
    await context.driver.url(`${URL_BASE}/signout/`);
}

async function backToEditorPost(context) {
    await selectComponent(context, `[data-test-button='close-publish-flow']`).click();
    await wait(1)
}

async function backToEditorPage(context) {
    await selectComponent(context, 'button.gh-btn-editor.gh-publish-back-button').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('editor/page'));
}

async function addTagToPost(context, tag) {
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
    await selectComponent(context, '#tag-input').click()
    await wait(1);
    await selectComponent(context, '#tag-input').setValue(tag)
    await wait(1);
    await selectComponent(context, `li=${tag}`).click();
    await wait(1);
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(0.5);
}

async function createNewTag(context) {
    await selectComponent(context, 'span=New tag').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('tags/new'));
}

async function deleteTag(context) {
    await selectComponent(context, 'span=Delete tag').click();
    await wait(1)
    await selectComponent(context, 'span=Delete').click();
}

async function createTag(context, name, desc) {
    await selectComponent(context, 'input[id="tag-name"]').setValue(name);
    await wait(1);
    await selectComponent(context, 'textarea[id="tag-description"]').setValue(desc);
    await wait(1);
    await selectComponent(context, 'span=Save').click();
}

async function clickFirstTag(context) {
    const ol = await selectComponent(context, 'ol.tags-list');
    const items = await ol.$$('li.gh-list-row.gh-tags-list-item');

    const tag = items[0];
    await tag.click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('tags/'));
}

async function deleteAll(context) {
    const deleteButtonComponentName = version ? 'button[data-test-button="delete-all"]' : 'button.gh-btn.gh-btn-red.js-delete'

    await context.driver.url(`${URL_BASE}/settings/labs`);
    await selectComponent(context, deleteButtonComponentName).click();
    await wait(1);
    await selectComponent(context, `button.gh-btn.gh-btn-red.gh-btn-icon.ember-view`).click();
    await wait(1);
    await selectComponent(context, `button.gh-alert-close`).click();
    await wait(0.5);
}

async function goToDashboard(context) {
    await context.driver.url(`${URL_BASE}/dashboard`);
}

async function searchGlobalAndClick(context, title) {
    await selectComponent(context, 'button.gh-nav-btn-search').click();
    await wait(1);
    await selectComponent(context, 'input[name="selectSearchTerm"].gh-input-with-select-input').setValue(title);
    await wait(1);
    await selectComponent(context, 'li.ember-power-select-option').click();
    await wait(0.5);
}

async function newPost(context) {
    await selectComponent(context, `span=New post`).click();
    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('editor/post'));
}

async function createPost(context, title, description) {
    const descriptionFieldName = version ? '.koenig-react-editor' : '.koenig-editor'

    await selectComponent(context, 'textarea[placeholder="Post title"]').setValue(title);
    const element = await selectComponent(context, descriptionFieldName);
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
    await wait(1);
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
    await wait(1);
}

async function deletePost(context) {
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click();
    await wait(1);
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

async function listPublishedPosts(context) {
    await context.driver.url(`${URL_BASE}/posts?type=published`);
}

async function listPages(context) {
    await context.driver.url(`${URL_BASE}/pages`);
}

async function listPosts(context) {
    await context.driver.url(`${URL_BASE}/posts`);
}

async function listTags(context) {
    await context.driver.url(`${URL_BASE}/tags`);
}

async function listInternalTags(context) {
    await context.driver.url(`${URL_BASE}/tags?type=internal`);
}

async function listPublishedPages(context) {
    await context.driver.url(`${URL_BASE}/pages?type=published`);
}

async function listDraftPages(context) {
    await context.driver.url(`${URL_BASE}/pages?type=draft`);
}

async function listScheduledPages(context) {
    await context.driver.url(`${URL_BASE}/pages?type=scheduled`);
}

async function listPagesAndCheck(context, page) {
    const currentPage = await this.driver.getUrl();
    await context.driver.url(`${URL_BASE}/pages`);
    assert.isTrue(currentPage.includes('ghost/#/pages'));
}

async function listDraftPosts(context) {
    await context.driver.url(`${URL_BASE}/posts?type=draft`);
}

async function newPage(context) {
    await selectComponent(context, 'span=New page').click();
}

async function createPage(context, titulo, descripcion) {
    const descriptionFieldName = version ? '.koenig-react-editor' : '.koenig-editor'

    await selectComponent(context, 'textarea[placeholder="Page title"]').setValue(titulo);
    await wait(1);
    const element = await selectComponent(context, descriptionFieldName)
    await element.click();
    await wait(1);
    await element.setValue(descripcion);

}

async function editPage(context, titulo, descripcion) {
    await selectComponent(context, 'textarea[placeholder="Page title"]').setValue(titulo)
    const element = await selectComponent(context, '.koenig-react-editor')
    await element.click();
    await wait(1);
    await element.clearValue();
    await wait(1);
    await element.setValue(descripcion);

    await selectComponent(context, 'span=Update').click();
    await context.driver.url(`${URL_BASE}/pages`);
}

async function clickFirstPage(context) {
    const div = await selectComponent(context, 'div.posts-list.gh-list.feature-memberAttribution');
    const items = await div.$$('div.gh-posts-list-item-group');
    const pageOne = items[0];
    await pageOne.click();
}

async function publishPage(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
}

async function schedulePage(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await selectComponent(context, 'span=Right now').click();
    await wait(1);
    await selectComponent(context, 'label=Schedule for later').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
}

async function deletePage(context) {
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click();
    await wait(1);
    await selectComponent(context, 'span=Delete').click();
    await wait(1);
}

async function unschedulePage(context) {
    await selectComponent(context, 'span=Unschedule').click();
    await wait(1);
    await selectComponent(context, 'button.gh-revert-to-draft').click();
    await wait(1);
}

async function addTagToPage(context, tag) {
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
    await selectComponent(context, '#tag-input').click()
    await wait(1);
    await selectComponent(context, '#tag-input').setValue(tag)
    await wait(1);
    await selectComponent(context, `li=${tag}`).click();
    await wait(1);
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
}

async function publishTag(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
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

When('Admin publishes tag', async function () {
    await publishTag(this);
});

When('Admin publishes post', async function () {
    await publishPost(this);
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

When('Admin clicks {int} tag', async function (position) {
    const ol = await selectComponent(this, 'ol.tags-list.gh-list');
    const items = await ol.$$('li.gh-tags-list-item');
    const tag = items[position - 1];
    await tag.click();
});

When('Admin clicks to Unschedule', async function () {
    await unschedulePost(this);
});

When('Admin clicks Back to editor', async function (){
    await backToEditorPost(this)
})

When('Admin list posts', async function () {
    await listPosts(this);
});

When('Admin list pages', async function () {
    await listPages(this);
});

When('Admin filter published pages', async function () {
    await listPublishedPages(this);
});

When('Admin filter draft pages', async function () {
    await listDraftPages(this);
});

When('Admin filter scheduled pages', async function () {
    await listScheduledPages(this);
});

When('Admin list Pages and check', async function () {
    await listPagesAndCheck(this);
});

When('Admin click on New Page', async function () {
    await newPage(this);
});

When('Admin create a New Page', async function () {
    const title = faker.person.jobTitle()
    const description = faker.lorem.paragraphs(2)
    await createPage(this, title, description);
});

When('Admin create a New Page with title {string}', async function (title) {
    await createPage(this, title, faker.lorem.paragraphs(2));
});

When('Admin click the first Page', async function () {
    await clickFirstPage(this);
});

When('Admin edit an existing Page', async function () {
    let titulo = faker.person.jobTitle()
    let descripcion = faker.lorem.paragraphs(2)
    await editPage(this, titulo, descripcion);
});

When('Admin add tag {string} to page', async function (tag) {
    await addTagToPage(this, tag);
});

When('Admin schedules page', async function () {
    await schedulePage(this);
});

When('Admin clicks to Unschedule page', async function () {
    await unschedulePage(this);
});

When('Admin filter draft post', async function () {
    await listDraftPosts(this);
});

When('Admin filter tags', async function () {
    await listTags(this)
});

When('Admin filter internal tags', async function () {
    await listInternalTags(this)
});

When('Admin clicks to Publish page', async function () {
    await publishPage(this);
});

When('Admin clicks to delete page', async function () {
    await deletePage(this);
});

When('Admin clicks to delete post', async function () {
    await deletePost(this);
});

When('Admin filter published posts', async function () {
    await listPublishedPosts(this);
});

When('Admin clicks to new Tag', async function () {
    await createNewTag(this);
});

When('Admin creates new Tag', async function () {
    await createTag(this, faker.person.jobTitle(), faker.lorem.paragraph(2));
});

When('Admin delete a Tag', async function () {
    await deleteTag(this);
});

When('Admin creates new Tag with {string}', async function (tag) {
    await createTag(this, tag, faker.lorem.paragraph(2));
});

When('Admin adds tag {string} to post', async function (tag) {
    await addTagToPost(this, tag);
});

When('Admin adds tag {string} to tag', async function (tag) {
    await addTagToPost(this, tag);
});

When('Admin searches {string} and click on it', async function (value) {
    await searchGlobalAndClick(this, value);
});

Then('Admin visualizes {string} page', async function (pageUrl) {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes(pageUrl));
});

Then('Admin sees {int} posts', async function (total) {
    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.posts-list.gh-list'
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item'

    const fatherComponent = await selectComponent(this, fatherItemComponent);
    const items = await fatherComponent.$$(childItemComponent);
    assert.equal(items.length, total);
});

Then('Admin sees {int} tags', async function (total) {
    const ol = await selectComponent(this, 'ol.tags-list.gh-list');
    const items = await ol.$$('li.gh-tags-list-item');
    assert.equal(items.length, total);
});

Then('Admin sees {int} pages', async function (total) {
    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.gh-list'
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item'

    const fatherComponent = await selectComponent(this, fatherItemComponent);
    const items = await fatherComponent.$$(childItemComponent);
    assert.equal(items.length, total);
});