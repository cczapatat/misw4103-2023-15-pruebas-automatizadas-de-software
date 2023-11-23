import {faker} from '@faker-js/faker';


describe('ghost admin tags scenario 13', () => {    
	const name = Cypress.env('name')
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.start('scenario_13');
        cy.login(email, password)
        cy.deleteAll();
        cy.goToDashboard();
    }) 

	after(()=>{
        cy.goToDashboard();
		cy.logout();
	})  

	context('Given admin accesses tag list option', () => {

        beforeEach(() => {
            cy.listTags()
        })

        context('When admin creates a new tag, list the tag, edit and delete the tag', () => {
            let tagName;
            let desc;
            beforeEach(() => {
                cy.mockarooTag().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    tagName = data[0].title;
                    desc = data[0].description;
                    cy.createNewTag();
                    cy.createTag(tagName, desc);
                    cy.listTagsAndCheck(tagName);
                    cy.clickFirstTag();
                    cy.deleteTag();
                  })      
            })
            it('Then admin sees empty Tag list', () => {
                cy.listTags();
                cy.wait(1000);
                cy.testTagNotExist();
                cy.validateNoTagPseudo(tagName);
            }) 
        })	
	})

			
})