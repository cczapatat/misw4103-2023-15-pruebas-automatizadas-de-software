import {faker} from '@faker-js/faker';

describe('ghost admin member scenario 31', () => {
 
	const email = Cypress.env('email')
	const password = Cypress.env('password')

    before(()=>{
        cy.start('scenario_31');
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

        context('When admin creates two member and list members and search second member', () => {
            const memberName = faker.person.fullName();
            const memberEmail = faker.internet.email().toLowerCase();
            const memberNote = faker.company.buzzPhrase();
            const memberNameTwo = faker.person.fullName();
            const memberEmailTwo = faker.internet.email().toLowerCase();
            const memberNoteTwo = faker.company.buzzPhrase();

            beforeEach(() => {
                cy.createNewMember();
                cy.createMember(memberName, memberEmail, memberNote);
                cy.listMembers();
                cy.createNewMember();
                cy.createMember(memberNameTwo, memberEmailTwo, memberNoteTwo);
                cy.listMembers();
                cy.searchMemberByName(memberNameTwo)  
            })
            it('Then admin sees only Member 2', () => {
               cy.contains(memberEmailTwo)
            }) 
        })	
	})
})