import { faker } from '@faker-js/faker';

describe('ghost admins page scenario 15', () => {
  const site = Cypress.env('site');
  const name = Cypress.env('name');
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.createAdmin(site, name, email, password);
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

        cy.get('li.gh-list-row').should('not.exist');
        cy.newPage();
        cy.createPage(title, description);
        cy.publishPage();
        cy.listPages();
      });

      it('Then admin sees the new page', () => {
        cy.filterPublishedPages();
        cy.wait(500);
        cy.get('li.gh-list-row').then(($post) => {
          expect($post.length).to.equal(1);
        });
        cy.screenshot();
        cy.wait(500);
      });
    });
  });
});
