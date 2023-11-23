import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 17', () => {
 
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_17');
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
      cy.listPages()
    });

    context('When admin create a new page', () => {
      let title;
      let description;
      beforeEach(() => {
        cy.mockarooPage().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.newPage();
          cy.createPage(title, description);       
          cy.listPages();
        })
      });

      it('Then admin filter by draft', () => {
        cy.validateScenarioSeventeen();
        cy.contains(title);
      });
    });
  });
});
