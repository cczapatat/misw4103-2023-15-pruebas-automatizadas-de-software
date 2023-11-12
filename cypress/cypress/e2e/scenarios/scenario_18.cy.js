import { faker } from '@faker-js/faker';

describe('ghost admins pages scenario 18', () => {
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
        cy.filterScheduledPages();
        cy.get('li.gh-list-row').then(($post) => {
          expect($post.length).to.equal(1);
        });
        cy.screenshot();
        cy.wait(500);
      });
    });
  });
});
