import {faker} from '@faker-js/faker';

describe('ghost admin member scenario 32', () => {
 
	const email = Cypress.env('email')
	const password = Cypress.env('password')

    before(()=>{
        cy.start('scenario_32');
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

        context('When admin creates a member and list members and delete member', () => {
            const memberName = faker.person.fullName();
            const memberEmail = faker.internet.email().toLowerCase();
            const memberNote = faker.company.buzzPhrase();

            beforeEach(() => {
                cy.createNewMember();
                cy.createMember(memberName, memberEmail, memberNote);
                cy.listMembers();
                cy.clickMemberByEmail(memberEmail);
                cy.deleteMember();
                cy.searchMemberByName(memberName);     
            })
            it('Then admin not see the member', () => {
               cy.validateNoMemberseudo();
            }) 
        })	
	})
})