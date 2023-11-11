import {faker} from '@faker-js/faker';


describe('ghost admin posts scenario 6', () => {

    const site = Cypress.env('site');
	const name = Cypress.env('name')
	const email = Cypress.env('email')
	const password = Cypress.env('password')
	let titulo = new String();
	let descripcion = new String();
	

    before(()=>{
		cy.createAdmin(site, name, email, password);
        cy.login(email, password);
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.deleteAll()
		cy.logout() 
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
                cy.get('li.gh-list-row').then(($post)=>{
                    expect($post.length).to.equal(1)
                });
                cy.clickFirstPost();
                cy.publishPost()
                cy.wait(1000);
                cy.backToEditor()
            })
            it('Then admin sees empty draft list', () => {
                cy.filterDraftPost();
                cy.wait(1000);
                cy.get('li.gh-list-row').should('not.exist');
                cy.screenshot();
            }) 
        })	
	})

			
})