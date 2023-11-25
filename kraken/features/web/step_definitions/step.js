const { assert } = require('chai');
const { faker } = require('@faker-js/faker');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');

const configProperties = require('../../../kraken.config');
const baseDirScreens = "./reports/";
const URL_BASE = `${configProperties.env.baseUrl}/ghost/#`;
const version = configProperties.env.version;

const wait = (ms = 1) => new Promise(resolve => setTimeout(resolve, ms * 1000));
const fs = require('fs');
let escenario = 0
let counter

let lastCreatedEmail = '';

const suffix =  configProperties.env.version ? 'new' : 'old'

const getNamePhoto = () => {
    if (!fs.existsSync(baseDirScreens)){
        fs.mkdirSync(baseDirScreens, { recursive: true });
    }
    const title = `${baseDirScreens}scenario_${escenario}_${counter}_${suffix}.png`
    counter++

    return title
}

function selectComponent(context, componentDetails) {
    context.driver.$(componentDetails).waitForExist(5000);
    context.driver.$(componentDetails).waitForDisplayed(5000);

    return context.driver.$(componentDetails);
}

async function login(context, useBadCredentials = false) {
    await context.driver.url(`${URL_BASE}/signin/`);

    if (useBadCredentials) {
        await selectComponent(context, '.gh-input.email').setValue(faker.internet.email().toLowerCase());
        await selectComponent(context, '.gh-input.password').setValue(faker.internet.password().toLowerCase());
    } 
    else 
    {
        await selectComponent(context, '.gh-input.email').setValue(configProperties.env.email);
        await selectComponent(context, '.gh-input.password').setValue(configProperties.env.password);
    }

    await selectComponent(context, 'button[type="submit"]').click();

}

async function logout(context) {
    await context.driver.url(`${URL_BASE}/signout/`);
}

async function backToEditorPost(context) {
    await selectComponent(context, 'button.gh-btn-editor.gh-publish-back-button').click();
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function backToEditorPage(context) {
    await selectComponent(context, 'button.gh-btn-editor.gh-publish-back-button').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('editor/page'));
}

async function hasExceededDescTagOnScreen(context) {
    const errorMessage = await selectComponent(context, 'div.form-group.no-margin.error > p.response');
    await wait(1)
    assert.exists(errorMessage);
}

async function hasNoTagNameOnScreen(context) {
    const selectedComponent = await selectComponent(context, 'p.response');
    const errorContent = await selectedComponent.getText();
    await wait(1)
    assert.exists(selectedComponent);
    assert.equal(errorContent, 'You must specify a name for the tag.');
}

async function hasNoEmailOnScreen(context) {
    const selectedComponent = await selectComponent(context, 'div.gh-cp-member-email-name .error .response');
    const errorContent = await selectedComponent.getText();
    await wait(1)
    assert.exists(selectedComponent);
    assert.equal(errorContent, 'Please enter an email.');
}

async function hasNoteTooLongOnScreen(context) {
    const selectedComponent = await selectComponent(context, 'div.form-group.mb0.gh-member-note.error .response');
    const errorContent = await selectedComponent.getText();
    await wait(1)
    assert.exists(selectedComponent);
    assert.equal(errorContent, 'Note is too long.');
}

async function hasWrongEmailOnScreen(context) {
    const selectedComponent = await selectComponent(context, 'section .main-error');
    const errorContent = await selectedComponent.getText();
    await wait(1)
    assert.exists(selectedComponent);
    assert.include(errorContent, 'There is no user with that email address');
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
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(0.5);
}


async function doNotContainLastEmail(context) {
    const component = await selectComponent(context, `.gh-members-list-email`);
    const text = await component.getText();
    assert.notEqual(text, lastCreatedEmail); 
}

async function containLastEmail(context) {
    const component = await selectComponent(context, `.gh-members-list-email`);
    const text = await component.getText();
    assert.equal(text, lastCreatedEmail); 
}

async function clicksOnLastMember(context) {
    const component = await selectComponent(context, `.gh-members-list-email`);
    await component.click();
    await wait(1);
}

async function clickOnActions(context) {
    const component = await selectComponent(context, `div.gh-canvas-header.sticky.gh-member-header > header > section .gh-btn-action-icon`);
    await component.click();
    await wait(1);
}

async function clickOnDelete(context) {
    const component = await selectComponent(context, `.mr2 > .red`);
    await component.click();
    await wait(1);
}

async function confirmDelete(context) {
    const component = await selectComponent(context, `.modal-content > .modal-footer > .gh-btn-red`);
    await component.click();
    await wait(1);
}

async function createMember(context) {
    await selectComponent(context, 'span=New member').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('/members/new'));
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
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

async function createNewTag(context) {
    await selectComponent(context, 'span=New tag').click();

    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('tags/new'));
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function deleteTag(context) {
    await selectComponent(context, 'span=Delete tag').click();
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, 'span=Delete').click();
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function createTag(context, name, desc, color) {
    await selectComponent(context, 'input[id="tag-name"]').setValue(name);
    await wait(1);
    await selectComponent(context, 'textarea[id="tag-description"]').setValue(desc);

    if(color) { 
        await selectComponent(context, 'input[data-test-input="accentColor"]').setValue(color);
        await wait(1);
    }

    await selectComponent(context, 'span=Save').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
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
    const buttonDeleteName = version ? 'button[data-test-button="delete-all"]' : 'button.gh-btn.gh-btn-red.js-delete'
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

async function searchGlobalAndClick(context, title) {
    await selectComponent(context, 'button.gh-nav-btn-search').click();
    await wait(1);
    await selectComponent(context, 'input[name="selectSearchTerm"].gh-input-with-select-input').setValue(title);
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
    await selectComponent(context, 'li.ember-power-select-option').click();
    await wait(0.5);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(0.5);
}

async function newPost(context) {
    await selectComponent(context, `span=New post`).click();
    await wait(1);
    const currentPage = await context.driver.getUrl();
    assert.isTrue(currentPage.includes('editor/post'));
    await context.driver.saveScreenshot(getNamePhoto());
}

async function createPost(context, title, description) {
    const descriptionFieldName = version ? '.koenig-react-editor' : '.koenig-editor'
    await selectComponent(context, 'textarea[placeholder="Post title"]').setValue(title);
    const element = await selectComponent(context, descriptionFieldName);
    await element.click();
    await wait(1);
    await element.setValue(description);
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
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
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function schedulePost(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
    await selectComponent(context, 'span=Right now').click();
    await wait(1);
    await selectComponent(context, 'label=Schedule for later').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
}

async function deletePost(context) { 
    const selectedDelete = version ?'button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth':'button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button';
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
    await selectComponent(context, selectedDelete).click();
    await wait(1);
    await selectComponent(context, 'span=Delete').click();
}

async function unschedulePost(context) {
    await selectComponent(context, 'span=Unschedule').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
    await selectComponent(context, 'button.gh-revert-to-draft').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
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
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function listPosts(context) {
    await context.driver.url(`${URL_BASE}/posts`);
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function listTags(context) {
    await context.driver.url(`${URL_BASE}/tags`);
}

async function listInternalTags(context) {
    await context.driver.url(`${URL_BASE}/tags?type=internal`);
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
}

async function listPublishedPages(context) {
    await context.driver.url(`${URL_BASE}/pages?type=published`);
    await wait(1)
    await context.driver.saveScreenshot(getNamePhoto());
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
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
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
    let div
    let items
    if(version) {
        div = await selectComponent(context, 'div.posts-list.gh-list.feature-memberAttribution');
        items = await div.$$('div.gh-posts-list-item-group');
    } else {
        div = await selectComponent(context, 'ol.gh-list');
        items = await div.$$('li.gh-posts-list-item');
    }
    const pageOne = items[0];
    await pageOne.click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function publishPage(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
}

async function schedulePage(context) {
    await selectComponent(context, 'span=Publish').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
    await selectComponent(context, 'span=Right now').click();
    await wait(1);
    await selectComponent(context, 'label=Schedule for later').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-black.gh-btn-large').click();
    await wait(1);
    await selectComponent(context, 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await wait(1);
}

async function deletePage(context) {
    const selectedDelete = version? 'button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth': 'button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button';
    await selectComponent(context, 'button[title="Settings"]').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, selectedDelete).click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
    await selectComponent(context, 'span=Delete').click();
    await wait(1);
    await context.driver.saveScreenshot(getNamePhoto());
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
    await wait(1);
    await this.driver.saveScreenshot(getNamePhoto());
});

When('Admin clicks to new Post', async function () {
    await newPost(this);
});

When('Admin creates new Post', async function () {
    await createPost(this, faker.person.jobTitle(), faker.lorem.paragraph(2));
});

When('Admin creates new Page', async function () {
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
    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.posts-list.gh-list'
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item'

    const div = await selectComponent(this, fatherItemComponent);
    const items = await div.$$(childItemComponent);

    const post = items[position - 1];
    await post.click();
    await wait(1);
    await this.driver.saveScreenshot(getNamePhoto());
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

When('Admin creates new Tag with long description', async function () {
    await createTag(this, faker.person.jobTitle(), faker.lorem.words(150));
});

When('Admin creates new Tag with color and no-name', async function () {
    tagName = "";
    desc = faker.lorem.words(10);
    color = faker.color.rgb({ casing: 'lower' }).substring(1)
    await createTag(this, tagName, desc, color);
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

When('Admin sees 500-char error on tags', async function () {
    await hasExceededDescTagOnScreen(this);
});

When('Admin sees no-tag-name error on tags', async function () {
    await hasNoTagNameOnScreen(this);
});

When('Admin searches {string} and click on it', async function (value) {
    await searchGlobalAndClick(this, value);
});

Then('Admin visualizes {string} page', async function (pageUrl) {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes(pageUrl));
});

When('Bot sets {int} scenario', async function (total) {
    escenario = total;
    counter = 0;
});

Then('Admin sees {int} posts', async function (total) {
    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.posts-list.gh-list'
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item'

    const fatherComponent = await selectComponent(this, fatherItemComponent);
    const items = await fatherComponent.$$(childItemComponent);

    assert.equal(items.length, total);
    await this.driver.saveScreenshot(getNamePhoto());
});

Then('Admin sees {int} tags', async function (total) {
    const ol = await selectComponent(this, 'ol.tags-list.gh-list');
    const items = await ol.$$('li.gh-tags-list-item');
    assert.equal(items.length, total);
    await wait(1)
    await this.driver.saveScreenshot(getNamePhoto());
});

Then('Admin sees {int} pages', async function (total) {

    const fatherItemComponent = version ? 'div.posts-list.gh-list.feature-memberAttribution' : 'ol.gh-list'
    const childItemComponent = version ? 'div.gh-posts-list-item-group' : 'li.gh-list-row.gh-posts-list-item'

    const fatherComponent = await selectComponent(this, fatherItemComponent);
    const items = await fatherComponent.$$(childItemComponent);

    assert.equal(items.length, total);
    await wait(1)
    await this.driver.saveScreenshot(getNamePhoto());
});

When('Admin logout', async function () {
    await logout(this);
});

When('Admin perform a wrong login', async function () {
    await login(this,true);
});


When('Admin clicks on new Member', async function () {
    await createMember(this);
});

When('Admin creates a new member', async function () {
    const memberName = faker.person.fullName();
    const memberEmail = faker.internet.email().toLowerCase();
    const memberNote = faker.company.buzzPhrase();
    await createNewMember(this, memberName, memberEmail, memberNote);
});

When('Admin creates a new member without email', async function () {
    const memberName = faker.person.fullName();
    const memberEmail = '';
    const memberNote = faker.company.buzzPhrase();
    await createNewMember(this, memberName, memberEmail, memberNote);
});

When('Admin creates a new member with long note', async function () {
    const memberName = faker.person.fullName();
    const memberEmail = faker.internet.email().toLowerCase();
    const memberNote = faker.lorem.words(150);;
    await createNewMember(this, memberName, memberEmail, memberNote);
});

Then('Admin clicks on created member', async function () {
    await clicksOnLastMember(this);
});

Then('Admin clicks on actions', async function () {
    await clickOnActions(this);
});

Then('Admin clicks on delete', async function () {
    await clickOnDelete(this);
});

Then('Admin clicks on confirm delete', async function () {
    await confirmDelete(this);
});

Then('Admin sees last created email', async function () {
    await containLastEmail(this);
});

Then('Admin dont see last created email', async function () {
    await doNotContainLastEmail(this);
});

Then('Admin sees no-email error on member screen', async function () {
    await hasNoEmailOnScreen(this);
});

Then('Admin sees note-long error on member screen', async function () {
    await hasNoteTooLongOnScreen(this);
});

Then('Admin sees invalid-email error on login screen', async function () {
    await hasWrongEmailOnScreen(this);
});


