import {faker} from '@faker-js/faker';


describe('ghost admin posts scenario 6', () => {
	const email = Cypress.env('email')
	const password = Cypress.env('password')
	let titulo = new String();
	let descripcion = new String();

    before(()=>{
        cy.start('scenario_6');
        cy.login(email, password);
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.goToDashboard();
		cy.logout();
	})  

	context('Given admin accesses post list option', () => {

        beforeEach(() => {
            cy.listPost()
        })

        context('When admin creates a new draft post, list the draft and publish the post', () => {
            let title;
            let description;
            beforeEach(() => {
                cy.mokarooPost().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    title = data[0].title;
                    description = data[0].description;
                    cy.newPost()
                    cy.createPost(title, description)
                    cy.listPostAndCheck(title);
                    cy.filterDraftPost();
                    cy.checkFirstPost();
                    cy.clickFirstPost();
                    cy.publishPost()
                    cy.wait(1000);
                    cy.backToEditor()
                  })
            })
            it('Then admin sees empty draft list', () => {
                cy.filterDraftPost();
                cy.wait(1000);
                cy.testDraftPageNotExist();
                cy.validateNoPostPseudo(title);
            }) 
        })	
	})

			
})