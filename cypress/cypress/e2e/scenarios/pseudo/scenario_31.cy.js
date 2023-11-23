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
            let memberName;
            let memberEmail;
            let memberNote;
            let memberNameTwo;
            let memberEmailTwo;
            let memberNoteTwo;
            beforeEach(() => {
                cy.mockarooMember().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    memberName = data[0].name;
                    memberEmail = data[0].email;
                    memberNote = data[0].note;
                    cy.createNewMember();
                    cy.createMember(memberName, memberEmail, memberNote);
                    cy.listMembers();
                    memberNameTwo = data[1].name;
                    memberEmailTwo = data[1].email;
                    memberNoteTwo = data[1].note;
                    cy.createNewMember();
                    cy.createMember(memberNameTwo, memberEmailTwo, memberNoteTwo);
                    cy.listMembers();
                    cy.searchMemberByName(memberNameTwo)
                  })     
            })
            it('Then admin sees only Member 2', () => {
               cy.contains(memberEmailTwo)
            }) 
        })	
	})
})