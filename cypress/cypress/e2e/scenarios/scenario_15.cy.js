import { faker } from '@faker-js/faker';

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
      beforeEach(() => {
        const title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);

        cy.validateNotExistItems()
        cy.newPage();
        cy.createPage(title, description);
        cy.publishPage();
        cy.listPages();
      });

      it('Then admin sees the new page', () => {
        cy.validateScenarioFifteen()
      });
    });
  });
});
