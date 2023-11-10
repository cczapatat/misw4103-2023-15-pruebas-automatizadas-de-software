const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

When('User enters {string} on {string} field', async function(text, component_class) {
    
    //if component_id has id=, then select component by id, otherwise, select by class
    let selectedComponent = await this.driver.$(`.${component_class}`); 
       
    return await selectedComponent.setValue(text);
})

When('User clicks on button {string}', async function(button_id) {
    
    //if component_id has id=, then select component by id, otherwise, select by class
    let selectedComponent = await this.driver.$(`${button_id}`); 
       
    //click the selected component
    return await selectedComponent.click();
})


Then('User visualizes {string} page', async function(page_url) {
    
    //check if the user is on the page, by validating the url, i.e the page url is http://localhost:2368/ghost/#/dashboard and the page_url is /dashboard,
    //if the page_url is /dashboard, then the user is on the page, otherwise is not
    onPage = false;
    const currentPage = await this.driver.getUrl();

    if (currentPage.includes(page_url)) {
        onPage = true;
    }

    expect(onPage).to.be.true;
})

Then('User goes to {string}', async function(page_url) {
    
    //navigate to the page page_url
    return await this.driver.url(page_url);
})

When('User navigates to {string} page', async function(page_url) {
    
    //get the current page url
    const pageUrl = new URL(await this.driver.getUrl());
    //get the root page url, i.e http://localhost:2368/ghost/#/dashboard -> http://localhost:2368/ghost/
    const rootPageUrl = `${pageUrl.protocol}//${pageUrl.host}/ghost/#`;
    //navigate to the root page url with the page_url, i.e http://localhost:2368/ghost/ + /#/dashboard -> http://localhost:2368/ghost/#/dashboard

    return await this.driver.url(`${rootPageUrl}${page_url}`);
})
