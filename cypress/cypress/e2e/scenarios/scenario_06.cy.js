import {faker} from '@faker-js/faker';


describe('ghost admin posts scenario 6', () => {

    const site = Cypress.env('site');
	const name = Cypress.env('name')
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
            
            beforeEach(() => {
                titulo = faker.person.jobTitle()
                descripcion = faker.lorem.paragraphs(2) 
                cy.listPost()
                cy.newPost()
                cy.createPost(titulo, descripcion)
                cy.listPostAndCheck(titulo);
                cy.filterDraftPost();
                cy.checkFirstPost();
                cy.clickFirstPost();
                cy.publishPost()
                cy.wait(1000);
                cy.backToEditor()
            })
            it('Then admin sees empty draft list', () => {
                cy.filterDraftPost();
                cy.wait(1000);
                cy.testDraftPageNotExist();
            }) 
        })	
	})

			
})