import { faker } from '@faker-js/faker';

describe('ghost admins pages scenario 18', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_18');
    cy.login(email, password);
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {
    cy.goToDashboard();
    cy.logout();
  });

  context('Given admin accesses pages list option', () => {
    beforeEach(() => {
      cy.listPages();
    });

    context('When admin crates new schedule page, publish page', () => {
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
          cy.schedulePage();
        })
      });

      it('Then admin sees one page from list schedule pages', () => {
        cy.validateScenarioEighteen();
        cy.contains(title);
      });
    });
  });
});
