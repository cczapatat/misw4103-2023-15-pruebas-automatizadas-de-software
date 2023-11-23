import {faker} from '@faker-js/faker';

describe('ghost admin tags scenario 24', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.start('scenario_24');
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

        context('When admin creates a new public tag with long description and try to save tag', () => {
            tagName = faker.lorem.word();
            desc = faker.lorem.words(150);
            beforeEach(() => {
                cy.createNewTag();
                cy.createTag(tagName, desc);    
            })
            it('Then admin sees error in description Tag', () => {
               cy.contains("Description cannot be longer than 500 characters")
            }) 
        })	
	})
})