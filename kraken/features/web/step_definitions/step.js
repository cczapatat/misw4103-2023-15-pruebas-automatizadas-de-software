const { assert, expect } = require('chai');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');

const URL_BASE = 'http://localhost:2368/ghost/#';

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
    await selectComponent(context, `button.gh-btn.gh-btn-red.gh-btn-icon.ember-view`).click();
    await selectComponent(context, `button.gh-alert-close`).click();
}

async function goToDashboard(context) {
    await context.driver.url(`${URL_BASE}/dashboard`);
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
    await deleteAll(this);
    await logout(this);
});

Given('Admin starts app', async function () {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes('ghost/#/dashboard'));
});

When('Admin navigates to {string} page', async function(pageUrl) {
    const newUrl = pageUrl[0] === '/' ? pageUrl.substring(1) : pageUrl;
    await this.driver.url(`${URL_BASE}/${newUrl}`);
});

Then('Admin visualizes {string} page', async function (pageUrl) {
    const currentPage = await this.driver.getUrl();
    assert.isTrue(currentPage.includes(pageUrl));
});