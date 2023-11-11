import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 3', () => {
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

    context('When admin create a new post', () => {
      beforeEach(() => {
        const title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);
       
        cy.newPost();
        cy.createPost(title, description);
        cy.publishPost();
        cy.listPost();
       
      });

      it('Then admin delete the post', () => {
        cy.filterPublishedPost();
        cy.wait(1500);

        let beforeDelete = 0;
        cy.get('li.gh-list-row').then(($post) => {
            beforeDelete = $post.length
        });

        cy.rigthDeletePost();
        cy.ConfirmDeleteDialog();
        cy.listPost();
        cy.wait(500);
        cy.get('li.gh-list-row').then(($post) => {
          expect($post.length).to.equal(beforeDelete - 1);
        });
        cy.screenshot();
        cy.wait(500);
      });
    });
  });
});
