import {faker} from '@faker-js/faker';

describe('ghost admin tags scenario 28', () => {    
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.start('scenario_28');
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

        context('When admin creates a new tag and delete the tag on the same page', () => {
            tagName = faker.lorem.word();
            desc = faker.lorem.words(10)
            beforeEach(() => {
                cy.createNewTag();
                cy.createTag(tagName, desc);
                cy.deleteTag();    
            })
            it('Then admin sees empty Tag list', () => {
                cy.listTags();
                cy.wait(1000);
                cy.testTagNotExist();
                cy.validateNoTagPseudo(tagName);
            }) 
        })	
	})

			
})