import {faker} from '@faker-js/faker';

describe('ghost admin member scenario 25', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')

    before(()=>{
        cy.start('scenario_25');
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

        context('When admin creates a member list members', () => {
            const memberName = faker.person.fullName();
            const memberEmail = faker.internet.email().toLowerCase();
            const memberNote = faker.company.buzzPhrase();
            beforeEach(() => {
                cy.createNewMember();
                cy.createMember(memberName, memberEmail, memberNote);
                cy.listMembers();    
            })
            it('Then admin sees Member', () => {
               cy.contains(memberEmail)
            }) 
        })	
	})
})