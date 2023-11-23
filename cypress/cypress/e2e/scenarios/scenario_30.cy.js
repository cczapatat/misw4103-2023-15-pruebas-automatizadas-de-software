import {faker} from '@faker-js/faker';

describe('ghost admin login scenario 30', () => {

	const password = Cypress.env('password')

    before(()=>{
        cy.start('scenario_30');
    }) 

	after(()=>{
		cy.logout();
	})  

	context('Given admin accesses Ghost page', () => {

        beforeEach(() => {
            cy.listMembers();
        })

        context('When admin login with not existing email', () => {
            const memberEmail = faker.internet.email().toLowerCase();
            beforeEach(() => {
                cy.login(memberEmail, password) 
            })
            it('Then admin sees error in login', () => {
               cy.contains("There is no user with that email address")
            }) 
        })	
	})
})