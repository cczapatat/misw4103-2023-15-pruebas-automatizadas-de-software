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

      beforeEach(() => {
        title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);

        cy.newPage();
        cy.createPage(title, description);
        cy.publishPage();
        cy.listPagesAndCheck(title);
        cy.filterPublishedPages();
        cy.validateQuantityItems(1);
        cy.goToDashboard();
      });

      it('Then admin searches page and sees it in edition format', () => {
        cy.validateScenarioTwenty(title);
      });
    });
  });
});
