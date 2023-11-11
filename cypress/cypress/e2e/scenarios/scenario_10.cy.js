import {faker} from '@faker-js/faker';

describe('ghost admin tags scenario 10', () => {

    const site = Cypress.env('site');
	const name = Cypress.env('name')
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.createAdmin(site, name, email, password)
        cy.login(email, password)
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.deleteAll()
		cy.logout() 
	})  

	context('Given admin accesses tag list option', () => {

        beforeEach(() => {
            cy.listTags()
        })

        context('When admin creates a new public tag list tag', () => {
            
            beforeEach(() => {
                tagName = faker.lorem.word();
                desc = faker.lorem.paragraphs(1);
                
                cy.createNewTag();
                cy.createTag(tagName, desc);
                cy.listTags();
                
            })
            it('Then admin sees Tag', () => {
                cy.listTags();
                cy.wait(1000);
                cy.get('li.gh-list-row.gh-tags-list-item').then(($tags)=>{
                    expect($tags.length).to.equal(1)
                });
                cy.screenshot();
            }) 
        })	
	})
})