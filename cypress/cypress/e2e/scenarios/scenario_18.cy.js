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
      beforeEach(() => {
        const title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);

        cy.newPage();
        cy.createPage(title, description);
        cy.schedulePage();
      });

      it('Then admin sees one page from list schedule pages', () => {
        cy.validateScenarioEighteen();
      });
    });
  });
});
