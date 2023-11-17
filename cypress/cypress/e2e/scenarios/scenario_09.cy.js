import {faker} from '@faker-js/faker';


describe('ghost admin posts scenario 9', () => {
	const email = Cypress.env('email')
	const password = Cypress.env('password')
	let titulo = new String();
	let descripcion = new String();
	

    before(()=>{
        cy.start('scenario_9');
        cy.login(email, password)
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

        context('When admin creates a new post, publish the post, edit the post, delete the post and list post', () => {
            
            beforeEach(() => {
                titulo = faker.person.jobTitle()
                descripcion = faker.lorem.paragraphs(2) 
                cy.listPost()
                cy.newPost()
                cy.createPost(titulo, descripcion)
                cy.publishPost()
                cy.listPostAndCheck(titulo);
                cy.clickFirstPost();
                cy.deletePost();
            })
            it('Then admin sees empty Post list', () => {
                cy.listPost();
                cy.wait(1000);
                cy.testEmptyPostList();
            }) 
        })	
	})

			
})