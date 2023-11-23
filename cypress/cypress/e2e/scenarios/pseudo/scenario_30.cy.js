describe('ghost admin login scenario 30', () => {

	const email = Cypress.env('email')
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
            let memberEmail;
            
            beforeEach(() => {
                cy.mockarooMember().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    memberEmail = data[0].email;
                    cy.login(memberEmail, password)
                  })     
            })
            it('Then admin sees error in login', () => {
               cy.contains("There is no user with that email address")
            }) 
        })	
	})
})