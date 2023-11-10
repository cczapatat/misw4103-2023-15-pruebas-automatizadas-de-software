import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 7', () => {
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
    cy.deleteAll();
    cy.logout();
  });

  context('Given admin accesses post list option', () => {
    beforeEach(() => {
      cy.listPost();
    });

    context('When admin create a new scheduled post, list scheduled posts, edit post, cancel scheduled, list posts and list scheduled posts', () => {
      beforeEach(() => {
        const title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);

        cy.listPost();
        cy.newPost();
        cy.createPost(title, description);
        cy.schedulePost();
        cy.filterScheduledPost();
        cy.get('li.gh-list-row').then(($post) => {
          expect($post.length).to.equal(1);
        });
        cy.clickFirstPost();
        cy.unschedulePost();
        cy.listPostAndCheck(title);
        cy.get('li.gh-list-row').then(($post) => {
          expect($post.length).to.equal(1);
        });
      });

      it('Then admin sees empty scheduled post list', () => {
        cy.filterScheduledPost();
        cy.wait(500);
        cy.get('li.gh-list-row').should('not.exist');
        cy.screenshot();
        cy.wait(500);
      });
    });
  });
});
