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
                    cy.publishPost()
                    cy.wait(500);
                    cy.listPost()
                    cy.wait(500);
                    cy.clickFirstPost();
                    cy.deletePost();
                  })  
            })
            it('Then admin sees empty Post list', () => {
                cy.listPost();
                cy.wait(1000);
                cy.testEmptyPostList();
                cy.validateNoPostPseudo(title);
            }) 
        })	
	})

			
})