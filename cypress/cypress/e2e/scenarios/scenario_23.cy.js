import { faker } from '@faker-js/faker';

describe('ghost admins page scenario 23', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_23');
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

    context('When admin create two pages, list  pages', () => {
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph(2);
      const titleTwo = faker.person.jobTitle();
      const descriptionTwo = faker.lorem.paragraph(2);

      beforeEach(() => {
          cy.newPage();
          cy.createPage(title, description);
          cy.publishPage();
          cy.listPages();
          cy.newPage();
          cy.createPage(titleTwo, descriptionTwo);
          cy.publishPage();
          cy.listPages();   
      });

      it('Then admin sees two pages', () => {
        cy.filterPublishedPages();
        cy.contains(title)
        cy.contains(titleTwo)
      });
    });
  });
});
