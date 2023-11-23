import {faker} from '@faker-js/faker';

describe('ghost admin member scenario 29', () => {

	const email = Cypress.env('email')
	const password = Cypress.env('password')

    before(()=>{
        cy.start('scenario_29');
        cy.login(email, password)
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.goToDashboard();
		cy.logout();
	})  

	context('Given admin accesses member list option', () => {

        beforeEach(() => {
            cy.listMembers();
        })

        context('When admin creates a member with very long note and try to save', () => {
            const memberName = faker.person.fullName();
            const memberEmail = faker.internet.email().toLowerCase();
            const memberNote = faker.lorem.words(140);
            beforeEach(() => {
                cy.createNewMember();
                cy.createMember(memberName, memberEmail, memberNote);    
            })
            it('Then admin sees error in Member note', () => {
               cy.contains("Note is too long")
            }) 
        })	
	})
})