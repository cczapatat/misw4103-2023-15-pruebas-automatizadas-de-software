import {faker} from '@faker-js/faker';


describe('ghost admin page scenario 16', () => {

    const site = Cypress.env('site');
	const name = Cypress.env('name')
	const email = Cypress.env('email')
	const password = Cypress.env('password')
	let titulo = new String();
	let descripcion = new String();
	
    before(()=>{
		cy.createAdmin(site, name, email, password)
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
            
            beforeEach(() => {
                titulo = faker.person.jobTitle();
                descripcion = faker.lorem.paragraphs(2);
                cy.newPage();
                cy.createPage(titulo, descripcion);
                cy.publishPage();
                cy.backToEditorPage();
                cy.listPages();
                cy.filterPublishedPages();
                cy.clickFirstPage();
                cy.deletePage();
                
            })
            it('Then admin sees empty Page list', () => {
                cy.listPages();
                cy.wait(1000);
                
            }) 
        })	
	})

			
})