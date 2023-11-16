import {faker} from '@faker-js/faker';


describe('ghost admin tags scenario 13', () => {

    const site = Cypress.env('site');
	const name = Cypress.env('name')
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
		cy.createAdmin(site, name, email, password)
        cy.login(email, password)
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.goToDashboard();
		cy.logout();
	})  

	context('Given admin accesses tag list option', () => {

        beforeEach(() => {
            cy.listTags()
        })

        context('When admin creates a new tag, list the tag, edit and delete the tag', () => {
            
            beforeEach(() => {
                tagName = faker.lorem.word();
                desc = faker.lorem.paragraphs(1);
                
                cy.createNewTag();
                cy.createTag(name, desc);
                cy.listTagsAndCheck(name);
                cy.clickFirstTag();
                cy.deleteTag();
                
            })
            it('Then admin sees empty Tag list', () => {
                cy.listTags();
                cy.wait(1000);
                cy.testTagNotExist();
                cy.wait(1000);
                cy.screenshot();
            }) 
        })	
	})

			
})