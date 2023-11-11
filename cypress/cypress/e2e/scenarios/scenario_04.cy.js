import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 4', () => {
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
        cy.listPost();
       
      });

      it('Then admin delete the post', () => {
        cy.filterDraftPost();       
       
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
