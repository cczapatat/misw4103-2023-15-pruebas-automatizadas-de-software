import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 21', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_21');
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

    context('When admin create two post, list  posts', () => {
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph(2);
      const titleTwo = faker.person.jobTitle();
      const descriptionTwo = faker.lorem.paragraph(2);

      beforeEach(() => {
        cy.validateNotExistItems()
        cy.newPost();
        cy.createPost(title, description);
        cy.publishPost();
        cy.listPost();
        cy.newPost();
        cy.createPost(titleTwo, descriptionTwo);
        cy.publishPost();
        cy.listPost();
      });

      it('Then admin sees the two posts', () => {
        cy.validateQuantityItems(2)
        cy.contains(title);
        cy.contains(titleTwo);
      });
    });
  });
});
