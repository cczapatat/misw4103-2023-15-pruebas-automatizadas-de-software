import {faker} from '@faker-js/faker';
describe('ghost admin member scenario 27', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')

    before(()=>{
        cy.start('scenario_27');
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

        context('When admin creates a member without email and try to save', () => {
            const memberName = faker.person.fullName();
            const memberEmail = faker.internet.email().toLowerCase();
            const memberNote = faker.company.buzzPhrase();
            beforeEach(() => {
                cy.createNewMember();
                cy.createMemberNoEmail(memberName, memberNote);    
            })
            it('Then admin sees error in Member', () => {
               cy.contains("Please enter an email")
            }) 
        })	
	})
})