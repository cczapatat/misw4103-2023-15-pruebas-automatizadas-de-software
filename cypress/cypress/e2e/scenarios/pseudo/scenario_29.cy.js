import {faker} from '@faker-js/faker';

describe('ghost admin member scenario 29', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

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
            let memberName;
            let memberEmail;
            let memberNote;
            beforeEach(() => {
                cy.mockarooMember().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    memberName = data[0].name;
                    memberEmail = data[0].email;
                    memberNote = data[0].note_long;
                    cy.createNewMember();
                    cy.createMember(memberName, memberEmail, memberNote);
                  })     
            })
            it('Then admin sees error in Member note', () => {
               cy.contains("Note is too long")
            }) 
        })	
	})
})