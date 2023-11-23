import {faker} from '@faker-js/faker';

describe('ghost admin tags scenario 22', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();
    let tagNameTwo = new String();
    let descTwo = new String();

    before(()=>{
        cy.start('scenario_22');
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

        context('When admin creates two public tag list tag', () => {
            beforeEach(() => {
                tagName = faker.lorem.word();
                desc = faker.lorem.paragraphs(1);
                tagNameTwo = faker.lorem.word();
                descTwo = faker.lorem.paragraphs(1);
                cy.createNewTag();
                cy.createTag(tagName, desc);
                cy.listTags();
                cy.createNewTag();
                cy.createTag(tagNameTwo, descTwo);
                cy.listTags();    
            })
            it('Then admin sees Two Tag', () => {
               cy.validateQuantityTags(2);
               cy.contains(tagName)
               cy.contains(tagNameTwo)
            }) 
        })	
	})
})