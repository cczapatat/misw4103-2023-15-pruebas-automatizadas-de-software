import {faker} from '@faker-js/faker';

describe('ghost admin tags scenario 26', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();
    let color = new String();

    before(()=>{
        cy.start('scenario_26');
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

        context('When admin creates a new public tag with no name and try to save', () => {
            tagName = "";
            desc = faker.lorem.words(10);
            color = faker.color.rgb({ casing: 'lower' }).substring(1)
            beforeEach(() => {
                cy.createNewTag();
                cy.createTagColor(tagName, desc, color);
                cy.listTags();    
            })
            it('Then admin sees error in Name', () => {
               cy.contains("You must specify a name for the tag")
            }) 
        })	
	})
})