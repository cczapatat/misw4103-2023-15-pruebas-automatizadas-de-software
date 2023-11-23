import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 2', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_2');
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

    context('When admin create a new post, list  posts', () => {
      let title;
      let description;
      beforeEach(() => {
        cy.mokarooPost().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.validateNotExistItems()
          cy.newPost();
          cy.createPost(title, description);
          cy.publishPost();
          cy.listPost();
        })
      });

      it('Then admin sees the new post', () => {
        cy.validateScenarioTwo()
        cy.contains(title);
      });
    });
  });
});
