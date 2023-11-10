// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createAdmin', (site, name, email, password) => {
    cy.visit('/ghost/')
    cy.wait(1000)
    cy.url().then(($url) => { // cy.url().should('include', 'signin')
        cy.log('url: '+ $url)
        if ($url.includes('setup')) {
            cy.visit('/ghost')
    
            cy.wait(1000)    
            cy.get('input[id="blog-title"]').clear().type(site)
            cy.get('input[id="name"]').clear().type(name)
            cy.get('input[id="email"]').clear().type(email)
            cy.get('input[id="password"]').clear().type(password)
            cy.get('button[type="submit"]').click()
    
            cy.wait(1000)

            cy.url().should('include', 'setup/done')
            cy.visit('/ghost/#/dashboard')        
            
        
            cy.wait(1000)
            cy.visit('/ghost/#/signout/')          
        } 
    })
})

Cypress.Commands.add('goToDashboard', () => {
    cy.visit('/ghost/#/dashboard')        
    cy.wait(1000)
})

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/ghost/#/signin/')
    cy.url().should('include', 'signin')

    cy.get('input[name="identification"]').clear().type(username)
    cy.get('input[name="password"]').clear().type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(4000)
	// cy.screenshot()
})

Cypress.Commands.add('logout', () => {
    cy.wait(1000)
    cy.visit('/ghost/#/signout/')
    // cy.url().should('include', 'signin')
})

Cypress.Commands.add('site', () => {
    cy.get('a[href="#/site/"]').click()
    cy.url().should('include', 'site')
    cy.wait(1000)
})

Cypress.Commands.add('searchGlobalAndClick', (value) => {
    cy.get('button.gh-nav-btn-search').click();
    cy.wait(500);
    cy.get('input[name="selectSearchTerm"].gh-input-with-select-input').type(value);
    cy.wait(1000);
    cy.screenshot();
    cy.contains(value).click();
    cy.wait(1000);
    cy.screenshot();
});

Cypress.Commands.add('listPages', () => {
    cy.visit('/ghost/#/pages/');
    cy.url().should('include', 'pages');
    cy.wait(1000);
    cy.screenshot();
})

Cypress.Commands.add('listPagesAndCheck', (page) => {
    cy.wait(1000)
    cy.visit('/ghost/#/pages/')
    cy.url().should('include', 'pages')
    cy.contains(page)
    cy.screenshot()
})

Cypress.Commands.add('newPage', () => {
    cy.wait(500);
    cy.contains('New page').click();
    cy.wait(1000);
    cy.url().should('include', 'editor/page');
    cy.screenshot();
})

Cypress.Commands.add('createPage', (title, description) => {
    cy.get('textarea[placeholder="Page title"]').type(title)
    cy.get('.koenig-react-editor').type(description +'{enter}')
    cy.wait(2000)
    cy.screenshot()
})

Cypress.Commands.add('editPage', (title, description) => {
    cy.get('textarea[placeholder="Page title"]').type(title)
    cy.get('.koenig-react-editor').type(description +'{enter}')
    cy.screenshot()

    cy.contains('Update').click()
    cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
    cy.wait(2000)
    cy.screenshot()		
})

Cypress.Commands.add('editPageExcerpt', (excerpt) => {
    cy.get('button.post-settings').click()
    // cy.get('.settings-menu-toggle').click()
    cy.get('textarea[id="custom-excerpt"]').type(excerpt +'{enter}')
    cy.screenshot()
    // cy.get('.settings-menu-toggle').click()
    cy.get('button.close.settings-menu-header-action').click()

    cy.contains('Update').click()

    cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
    // cy.get('.gh-publishmenu-button').click()
    cy.wait(2000)
    cy.screenshot()
})

Cypress.Commands.add('editTagPageByType', (title, tag, type) => {
    cy.contains(title).click()

    cy.get('button[title="Settings"]').click()

    cy.get('#tag-input').type(tag +'{enter}')
    
    cy.wait(2000)
    cy.screenshot()
  
    cy.get('button[title="Settings"]').click()
    cy.get('button.close.settings-menu-header-action').click()

    if(type == 'published') {
        cy.clickUpdate()
    }
    else if(type == 'draft'){
        cy.clickPreview()
    }        
})

Cypress.Commands.add('clickUpdate', () => {
    cy.contains('Update').click()
    cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
    cy.wait(2000)
    cy.screenshot()		
})

Cypress.Commands.add('clickPreview', () => {
    cy.get('button.gh-btn.gh-editor-preview-trigger').click() //Preview 
    cy.wait(1000)
    cy.get('button.gh-editor-back-button').click()
    cy.wait(1000)
    // cy.screenshot()		
})

Cypress.Commands.add('deletePage', () => {
    cy.get('button[title="Settings"]').click() 
    cy.wait(1000)
    cy.get('button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click({force: true }) 
    cy.screenshot()
    cy.wait(2000)
    cy.get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').children().contains('Delete').click()
    cy.wait(2000)
    // cy.get('.modal-footer .gh-btn:not(:first-child)').click()
})

Cypress.Commands.add('clickFirstPage', () => {
    cy.get('li.gh-list-row').first().click()
    cy.wait(1000)
    cy.url().should('include', 'editor/page')
    cy.wait(1000)
    cy.screenshot()
})

Cypress.Commands.add('schedulePage', () => {
    cy.wait(500);
    cy.contains('Publish').click();
    cy.screenshot();
    cy.wait(500);
    cy.contains('Right now').click();
    cy.wait(500);
    cy.contains('Schedule for later').click();
    cy.wait(500);
    cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click();
    cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    cy.wait(1000);
})

Cypress.Commands.add('publishPage', () => {
    cy.wait(500);
    cy.contains('Publish').click()
    cy.screenshot()
    cy.wait(2000)
	cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click()
	cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click()	
    cy.wait(1000)
})

Cypress.Commands.add('featurePage', (excerpt) => {
    cy.get('button[title="Settings"]').click() 

    // Timed out retrying after 4050ms: cy.check() failed because this element is not visible:
    // <input class="gh-input post-settings-featured" type="checkbox">
    // This element <input.gh-input.post-settings-featured> is not visible because it has CSS property: display: none 
    cy.get('input[type="checkbox"].gh-input.post-settings-featured').check() // ({ force: true}) 
    cy.screenshot()

    cy.get('button[title="Settings"]').click() 
    cy.get('button.post-settings').click()
    
    cy.contains('Update').click()
    cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()

    cy.wait(2000)
    cy.screenshot()
})

Cypress.Commands.add('filterDraftPages', () => {
    cy.visit('/ghost/#/pages?type=draft')
    cy.url().should('include', 'draft')
    cy.wait(2000)
})

Cypress.Commands.add('filterScheduledPages', () => {
    cy.goToDashboard();
    cy.visit('/ghost/#/pages?type=scheduled')
    cy.wait(1000);
    cy.url().should('include', 'scheduled')
    cy.wait(2000)
})

Cypress.Commands.add('filterPublishedPages', () => {
    cy.visit('/ghost/#/pages?type=published')
    cy.url().should('include', 'published')
    cy.wait(2000)
})

Cypress.Commands.add('filterFeaturedPages', () => {
    cy.visit('/ghost/#/pages?type=featured')
    cy.url().should('include', 'featured')
    cy.wait(2000)
})

Cypress.Commands.add('filterNewestPages', () => {
    cy.visit('ghost/#/pages"]').click()
    cy.url().should('include', 'pages')
    cy.wait(2000)
})

Cypress.Commands.add('filterOldestPages', () => {
    cy.visit('/ghost/#/pages?order=published_at%20asc')
    cy.url().should('include', 'order=published_at')
    cy.wait(2000)
})

Cypress.Commands.add('filterRecentrlyUpdatedPages', () => {
    cy.visit('/ghost/#/pages?order=updated_at%20desc')
    cy.url().should('include', 'order=updated_at')
    cy.wait(2000)
})

Cypress.Commands.add('visitTags', () => {
})

//----------------------------------------------------------

Cypress.Commands.add('listPost', () => {
    cy.visit('/ghost/#/posts/')
    cy.url().should('include', 'posts')
    cy.wait(1000)
    cy.screenshot()
})

Cypress.Commands.add('newPost', () => {
    cy.wait(2000)
    cy.contains('New post').click()
    cy.wait(2000)
    cy.url().should('include', 'editor/post')
    cy.screenshot()	
})

Cypress.Commands.add('clickFirstPost', () => {
    cy.get('li.gh-list-row').first().click()
    cy.wait(1000)
    cy.url().should('include', 'editor/post')
    cy.wait(1000)
    cy.screenshot()
})

Cypress.Commands.add('createPost', (title, description) => {
    cy.get('textarea[placeholder="Post title"]').type(title)
    cy.get('.koenig-react-editor').type(description +'{enter}')
    cy.wait(1000)
    cy.screenshot()
})

Cypress.Commands.add('listPostAndCheck', (post) => {
    cy.wait(1000)
    cy.visit('/ghost/#/posts/')
    cy.url().should('include', 'posts')
    cy.contains(post)
    cy.screenshot()
})

Cypress.Commands.add('schedulePost', () => {
    cy.wait(500);
    cy.contains('Publish').click();
    cy.screenshot();
    cy.wait(500);
    cy.contains('Right now').click();
    cy.wait(500);
    cy.contains('Schedule for later').click();
    cy.wait(500);
    cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click();
    cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click();
    cy.wait(1000);
})

Cypress.Commands.add('unschedulePost', () => {
    cy.wait(500);
    cy.contains('Unschedule').click();
    cy.screenshot();
    cy.wait(500);
    cy.get('button.gh-revert-to-draft').click();
    cy.wait(500);
    cy.screenshot();
    cy.wait(1000);
});

Cypress.Commands.add('publishPost', () => {
    cy.wait(2000)
    cy.contains('Publish').click()
    cy.screenshot()
    cy.wait(2000)
	cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click()
	cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click()
    cy.wait(1000)
})

Cypress.Commands.add('filterDraftPost', () => {
    cy.visit('/ghost/#/posts?type=draft')
    cy.url().should('include', 'draft')
    cy.wait(2000)
})

Cypress.Commands.add('filterScheduledPost', () => {
    cy.goToDashboard();
    cy.visit('/ghost/#/posts?type=scheduled')
    cy.wait(1000);
    cy.url().should('include', 'scheduled')
    cy.wait(2000)
})

Cypress.Commands.add('filterPublishedPost', () => {
    cy.visit('/ghost/#/posts?type=published')
    cy.url().should('include', 'published')
    cy.wait(2000)
})

Cypress.Commands.add('filterOldestPost', () => {
    cy.visit('/ghost/#/posts?order=published_at%20asc')
    cy.url().should('include', 'order=published_at')
    cy.wait(2000)
})

Cypress.Commands.add('filterPostByTag', tag => {
    cy.goToDashboard();
    cy.visit(`/ghost/#/posts?tag=${tag}`);
    cy.wait(1000);
    cy.url().should('include', `tag=${tag}`);
    cy.wait(500);
})

Cypress.Commands.add('filterRecentrlyUpdatedPost', () => {
    cy.visit('/ghost/#/posts?order=updated_at%20desc')
    cy.url().should('include', 'order=updated_at')
    cy.wait(2000)
})

Cypress.Commands.add('editPost', (title, description) => {
    cy.get('textarea[placeholder="Post title"]').type(title)
    cy.get('.koenig--react-editor').type(description +'{enter}')
    cy.screenshot()

    cy.contains('Update').click()
    cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
    cy.wait(2000)
	cy.screenshot()		
})

Cypress.Commands.add('deletePost', () => {
    cy.get('button[title="Settings"]').click() 
    cy.wait(1000)
    cy.get('button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click({force: true })  
    cy.screenshot()
    cy.wait(2000)
    cy.get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').children().contains('Delete').click()
    cy.wait(2000)
    // cy.get('.modal-footer .gh-btn:not(:first-child)').click()
})

Cypress.Commands.add('backToEditor', () => {
    cy.get('button.gh-btn-editor.gh-publish-back-button').click()
    cy.wait(2000)
    cy.url().should('include', 'editor/post')
    cy.screenshot()
})

Cypress.Commands.add('backToEditorPage', () => {
    cy.get('button.gh-btn-editor.gh-publish-back-button').click()
    cy.wait(2000)
    cy.url().should('include', 'editor/page')
    cy.screenshot()
})

Cypress.Commands.add('addTagToPost', (tag) => {
    cy.get('button[title="Settings"]').click();
    cy.wait(500);
    cy.get('#tag-input ul:first > input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
    cy.screenshot();
    cy.get('button[title="Settings"]').click();
    cy.wait(500);
});

Cypress.Commands.add('deleteTag', () => {
    cy.get('button[data-test-button="delete-tag"]').click() 
    cy.wait(2000)
    cy.get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').children().contains('Delete').click()
    cy.wait(2000) 
    cy.screenshot()
    // cy.get('.modal-footer .gh-btn:not(:first-child)').click()
})

Cypress.Commands.add('listTags', () => {
    cy.visit('/ghost/#/tags/')
    cy.wait(3000)
    cy.screenshot()
})

Cypress.Commands.add('listTagsAndCheck', (tag) => {
    cy.wait(1000)
    cy.visit('/ghost/#/tags/')
    cy.url().should('include', 'tags')
    cy.contains(tag)
    cy.screenshot()
})

Cypress.Commands.add('createNewTag', () => {
    cy.contains('New tag').click()
    cy.wait(1000)
    cy.url().should('include', 'tags/new')
    cy.wait(1000)
    cy.screenshot()	
})

Cypress.Commands.add('createTag', (name, desc) => {
    cy.get('input[id="tag-name"]').type(name)
    cy.wait(1000)
    cy.get('textarea[id="tag-description"]').type(desc)
    cy.wait(1000)
    cy.contains('Save').click()
    cy.wait(2000)
    cy.screenshot()
})

Cypress.Commands.add('clickFirstTag', () => {
    cy.get('li.gh-list-row.gh-tags-list-item').first().click()
    cy.wait(1000)
    cy.url().should('include', 'tags/')
    cy.wait(1000)
    cy.screenshot()
})

Cypress.Commands.add('filterInternalTags', () => {
    cy.visit('/ghost/#/tags?type=internal')
    cy.url().should('include', 'internal')
    cy.wait(2000)
})

Cypress.Commands.add('clickLeaveButton', () => {
    cy.contains('Leave').click({ force: true})
    cy.wait(2000)
})

Cypress.Commands.add('deleteAll', () => {
    cy.visit('/ghost/#/settings/labs')
    cy.wait(4000)
    cy.get('button[data-test-button="delete-all"]').click({force: true});
    cy.wait(3000)
    cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click({force: true});
    cy.wait(1000)
    cy.get('button.gh-alert-close').click();
})