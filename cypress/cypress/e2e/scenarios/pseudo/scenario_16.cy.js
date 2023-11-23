
describe('ghost admin page scenario 16', () => {
	const email = Cypress.env('email')
	const password = Cypress.env('password')
	
    before(()=>{
        cy.start('scenario_16');
        cy.login(email, password)
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.goToDashboard();
		cy.logout();
	})  

	context('Given admin accesses page list option', () => {

        beforeEach(() => {
            cy.listPages()
        })

        context('When admin creates a new page, publish the page, list the page, filter the page and delete the page', () => {
            let title;
            let description;
            beforeEach(() => {
                cy.mockarooPage().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    title = data[0].title;
                    description = data[0].description;
                    cy.newPage();
                    cy.createPage(title, description);
                    cy.publishPage();
                    cy.backToEditorPage();
                    cy.listPages();
                    cy.filterPublishedPages();
                    cy.clickFirstPage();
                    cy.deletePage();
                  })
            })
            it('Then admin sees empty Page list', () => {
                cy.listPages();
                cy.wait(1000);
                cy.testFirstPageNotExist();
                cy.validateNoPagePseudo(title);
            }) 
        })	
	})

			
})