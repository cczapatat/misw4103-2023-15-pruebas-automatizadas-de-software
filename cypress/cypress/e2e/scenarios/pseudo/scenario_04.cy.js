
describe('ghost admins posts scenario 4', () => {

  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_4');
    cy.login(email, password);  
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {  
    cy.goToDashboard();
    cy.logout();
  });

  context('Given admin accesses post list option', () => {
    beforeEach(() => {
      cy.listPost();
    });

    context('When admin create a new post', () => {
      let title;
      let description;
      beforeEach(() => {
        cy.mokarooPost().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.newPost();
          cy.createPost(title, description);       
          cy.listPost();
        })
      });

      it('Then admin delete the post', () => {
        cy.validateScenarioFour();
        cy.contains(title)
      });
    });
  });
});
