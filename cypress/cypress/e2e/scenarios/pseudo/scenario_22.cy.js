
describe('ghost admin tags scenario 22', () => {

 
	const email = Cypress.env('email')
	const password = Cypress.env('password')
    let tagName = new String();
    let desc = new String();

    before(()=>{
        cy.start('scenario_22');
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

        context('When admin creates two public tag list tag', () => {
            let tagName;
            let desc;
            let tagNameTwo;
            let descTwo;
            beforeEach(() => {
                cy.mockarooTag().then((response) => {
                    expect(response.status).to.eq(200); 
                    const data = response.body;
                    tagName = data[0].title;
                    desc = data[0].description;
                    cy.createNewTag();
                    cy.createTag(tagName, desc);
                    cy.listTags();
                    tagNameTwo = data[1].title;
                    descTwo = data[1].description;
                    cy.createNewTag();
                    cy.createTag(tagNameTwo, descTwo);
                    cy.listTags();
                  })     
            })
            it('Then admin sees Two Tag', () => {
               cy.validateQuantityTags(2);
               cy.contains(tagName)
               cy.contains(tagNameTwo)
            }) 
        })	
	})
})