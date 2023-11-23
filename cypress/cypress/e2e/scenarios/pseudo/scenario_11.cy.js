
describe('ghost admin tags scenario 11', () => {
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.start('scenario_11');
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

        context('When admin creates a new tag with name starting with # and list tag', () => {
            let tagName;
            let desc;
            beforeEach(() => {
                cy.mockarooTag().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    tagName = '#'.concat(data[0].title);
                    desc = data[0].description;
                    cy.createNewTag();
                    cy.createTag(tagName, desc);
                    cy.listTags();
                  })      
            })
            it('Then admin sees Tag with Internal state', () => {
                cy.filterInternalTags();
                cy.wait(1000);
                cy.testFirstTagExist();
                cy.contains(tagName)
            }) 
        })	
	})

			
})