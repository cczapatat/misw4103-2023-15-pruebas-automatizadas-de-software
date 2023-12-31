import {faker} from '@faker-js/faker';

describe('ghost admin tags scenario 10', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.start('scenario_10');
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

        context('When admin creates a new public tag list tag', () => {
            
            beforeEach(() => {
                tagName = faker.lorem.word();
                desc = faker.lorem.paragraphs(1);
                
                cy.createNewTag();
                cy.createTag(tagName, desc);
                cy.listTags();
                
            })
            it('Then admin sees Tag', () => {
               cy.validateScenarioTen();
            }) 
        })	
	})
})