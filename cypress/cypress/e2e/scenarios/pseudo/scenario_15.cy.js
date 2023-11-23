
describe('ghost admins page scenario 15', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_15');
    cy.login(email, password);
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {
    cy.goToDashboard();
    cy.logout();
  });

  context('Given admin accesses page list option', () => {
    beforeEach(() => {
      cy.listPages();
    });

    context('When admin create a new page, list  pages', () => {
      let title;
      let description;
      beforeEach(() => {
        cy.mockarooPage().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.validateNotExistItems()
          cy.newPage();
          cy.createPage(title, description);
          cy.publishPage();
          cy.listPages();
        })      
      });

      it('Then admin sees the new page', () => {
        cy.validateScenarioFifteen()
        cy.contains(title)
      });
    });
  });
});
