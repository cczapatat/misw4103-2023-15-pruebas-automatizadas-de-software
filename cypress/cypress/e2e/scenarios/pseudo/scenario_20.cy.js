import { faker } from '@faker-js/faker';

describe('ghost admins pages scenario 20', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_20');
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

    context('When admin crates new page, publish page, list and validate page', () => {
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
          cy.publishPage();
          cy.listPagesAndCheck(title);
          cy.filterPublishedPages();
          cy.validateQuantityItems(1);
          cy.goToDashboard();
        })

      });

      it('Then admin searches page and sees it in edition format', () => {
        cy.validateScenarioTwenty(title);
      });
    });
  });
});
