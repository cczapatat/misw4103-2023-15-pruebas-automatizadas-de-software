const { assert } = require('chai');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');

const configProperties = require('../../../kraken.config');
const baseDirScreens = "./reports/";
const URL_BASE = `${configProperties.env.baseUrl}/ghost/#`;
const version = configProperties.env.version;

const wait = (ms = 1) => new Promise(resolve => setTimeout(resolve, ms * 1000));
const fs = require('fs');
let scenario = 0;
let counter;

const suffix = configProperties.env.version ? 'new' : 'old';

const getNamePhoto = () => {
    if (!fs.existsSync(baseDirScreens)) {
        fs.mkdirSync(baseDirScreens, { recursive: true });
    }
    const title = `${baseDirScreens}scenario_${scenario}_${counter}_${suffix}.png`;
    counter++;

    return title;
}

function selectComponent(context, componentDetails, needAwait = true) {
    if (needAwait) {
        context.driver.$(componentDetails).waitForExist(5000);
        context.driver.$(componentDetails).waitForDisplayed(5000);
    }

    return context.driver.$(componentDetails);
}

async function login(context) {
    await context.driver.url(`${URL_BASE}/signin/`);
    await selectComponent(context, '.gh-input.email').setValue(configProperties.env.email);
    await selectComponent(context, '.gh-input.password').setValue(configProperties.env.password);

    await selectComponent(context, 'button[type="submit"]').click();

}

async function logout(context) {
    await context.driver.url(`${URL_BASE}/signout/`);
}

async function createNewTag(context) {
    await selectComponent(context, 'span=New tag').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('tags/new'));
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function createTag(context, name, desc) {
    await selectComponent(context, 'input[id="tag-name"]').setValue(name);
    await wait(1);
    await selectComponent(context, 'textarea[id="tag-description"]').setValue(desc);
    await selectComponent(context, 'span=Save').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function deleteAll(context) {
    const buttonDeleteName = version ? 'button[data-test-button="delete-all"]' : 'button.gh-btn.gh-btn-red.js-delete';
    await context.driver.url(`${URL_BASE}/settings/labs`);
    await selectComponent(context, buttonDeleteName).click();

    await wait(1);
    await selectComponent(context, `button.gh-btn.gh-btn-red.gh-btn-icon.ember-view`).click();
    await wait(1);
    await selectComponent(context, `button.gh-alert-close`).click();
    await wait(0.5);
}

async function goToDashboard(context) {
    await context.driver.url(`${URL_BASE}/dashboard`);
}

async function newPost(context) {
    await selectComponent(context, `span=New post`).click();
    await wait(1);
    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('editor/post'));
    await context.driver.saveScreenshot(getNamePhoto());
}

async function createPost(context, title, description) {
    const descriptionFieldName = version ? '.koenig-react-editor' : '.koenig-editor';
    await selectComponent(context, 'textarea[placeholder="Post title"]').setValue(title);
    const element = await selectComponent(context, descriptionFieldName);
    await element.click();
    await wait(1);
    await element.setValue(description);
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function publishPost(context, total) {
    const btnPublish = await selectComponent(context, 'span=Publish', total > 0);

    if (total > 0) {
        assert.exists(btnPublish.elementId);
        assert.notExists(btnPublish.error);
    } else {
        assert.exists(btnPublish.error);
        assert.notExists(btnPublish.elementId);
    }

    if (btnPublish.elementId && !btnPublish.error) {
        btnPublish.click();
        await wait(1);
        await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
        await wait(1);
        await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
        await wait(1);
        await context.driver.saveScreenshot(getNamePhoto());
    }
}

async function setUp(context) {
    await login(context);
    await deleteAll(context);
    await goToDashboard(context);
}

async function newPage(context) {
    await selectComponent(context, 'span=New page').click();
    await wait(0.5);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(0.5);
}

async function createPage(context, titulo, descripcion) {
    const descriptionFieldName = version ? '.koenig-react-editor' : '.koenig-editor'

    await selectComponent(context, 'textarea[placeholder="Page title"]').setValue(titulo);
    await wait(1);
    const element = await selectComponent(context, descriptionFieldName)
    await element.click();
    await wait(1);
    await element.setValue(descripcion);
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function publishPage(context, total) {
    const btnPublish = await selectComponent(context, 'span=Publish', total > 0);

    if (total > 0) {
        assert.exists(btnPublish.elementId);
        assert.notExists(btnPublish.error);
    } else {
        assert.exists(btnPublish.error);
        assert.notExists(btnPublish.elementId);
    }

    if (btnPublish.elementId && !btnPublish.error) {
        btnPublish.click();
        await wait(1);
        await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
        await wait(1);
        await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
        await wait(1);
        await context.driver.saveScreenshot(getNamePhoto());
    }
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

async function navigateTo(context, pageUrl) {
    const newUrl = pageUrl[0] === '/' ? pageUrl.substring(1) : pageUrl;
    await context.driver.url(`${URL_BASE}/${newUrl}`);
    await wait(1);
}

async function createNewMember(context, name, email, note) {
    await selectComponent(context, 'textarea[id="member-note"]').setValue(note);
    await wait(1);
    await selectComponent(context, 'input[id="member-name"]').setValue(name);
    await wait(1);
    await selectComponent(context, 'input[id="member-email"]').setValue(email);
    lastCreatedEmail = email;
    await wait(1);
    await selectComponent(context, 'span=Save').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function createMember(context) {
    await selectComponent(context, 'span=New member').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('/members/new'));
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function deleteMember(context) {
    await selectComponent(context, 'a.ember-view.gh-list-data').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-icon.icon-only.gh-btn-action-icon.closed.ember-view').click();
    await wait(1);
    await selectComponent(context, 'button=Delete member').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
    await wait(0.5);
}

When('Admin navigates to {string} page', async function (pageUrl) {
    await navigateTo(this, pageUrl);
});

When('Admin navigates to {string} page and expected total {int}', async function (pageUrl, total) {
    await navigateTo(this, pageUrl);

    if (total <= 0) {
        const btnLeave = await selectComponent(this, 'span=Leave', false);

        if (btnLeave.elementId) {
            btnLeave.click();
        }
    }
})

When('Admin clicks to new Post', async function () {
    await newPost(this);
});

When('Admin creates new Post with title {string} and description {string}', async function (title, description) {
    await createPost(this, title, description);
});

When('Admin publishes post when total is {int}', async function (total) {
    await publishPost(this, total);
});

When('Admin click on New Page', async function () {
    await newPage(this);
});

When('Admin create a New Page with title {string} and description {string}', async function (title, description) {
    await createPage(this, title, description);
});

When('Admin publishes page when total is {int}', async function (total) {
    await publishPage(this, total);
});

When('Admin clicks to new Tag', async function () {
    await createNewTag(this);
});

When('Admin creates new Tag with name {string} and description {string}', async function (name, descripcion) {
    await createTag(this, name, descripcion);
});

Then('Admin visualizes {string} page', async function (pageUrl) {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes(pageUrl));
});

When('Bot sets {int} scenario', async function (total) {
    scenario = total;
    counter = 0;
});

Then('Admin sees {int} posts with title {string}', async function (total, title) {
    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.posts-list.gh-list';
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item';

    const fatherComponent = await selectComponent(this, fatherItemComponent);
    const items = await fatherComponent.$$(childItemComponent);
    assert.equal(items.length, total);


    if (total > 0) {
        const titlePost = await selectComponent(this, `h3=${title}`);
        assert.exists(titlePost);
    }

    await this.driver.saveScreenshot(getNamePhoto());
});

Then('Admin sees {int} tags', async function (total) {
    const ol = await selectComponent(this, 'ol.tags-list.gh-list');
    const items = await ol.$$('li.gh-tags-list-item');
    assert.equal(items.length, total);
    await wait(1)
    await this.driver.saveScreenshot(getNamePhoto());
});

Then('Admin sees {int} pages with title {string}', async function (total, title) {
    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.posts-list.gh-list';
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item';

    const fatherComponent = await selectComponent(this, fatherItemComponent);
    const items = await fatherComponent.$$(childItemComponent);
    assert.equal(items.length, total);


    if (total > 0) {
        const titlePost = await selectComponent(this, `h3=${title}`);
        assert.exists(titlePost);
    }

    await this.driver.saveScreenshot(getNamePhoto());
});

When('Admin creates a new member with name {string}, email {string} and note {string}', async function (memberName, memberEmail, memberNote) {
    await createNewMember(this, memberName, memberEmail, memberNote);
});

When('Admin clicks on new Member', async function () {
    await createMember(this);
});

Then('Admin sees {int} members', async function (total) {
    const tbody = await selectComponent(this, 'tbody.ember-view', total > 0);

    if (total > 0) {
        assert.exists(tbody.elementId);
        assert.notExists(tbody.error);

        const items = await tbody.$$('tr');
        assert.equal(items.length, total);
        await wait(1)
        await this.driver.saveScreenshot(getNamePhoto());

        await deleteMember(this)
    } else {
        assert.exists(tbody.error);
        assert.notExists(tbody.elementId);
    }
});