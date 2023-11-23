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
      let title;
      let description;
      let titleTwo;
      let descriptionTwo;
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
          titleTwo = data[1].title;
          descriptionTwo = data[1].description;
          cy.newPost();
          cy.createPost(titleTwo, descriptionTwo);
          cy.publishPost();
          cy.listPost();
        })
      });

      it('Then admin sees the two posts', () => {
        cy.validateQuantityItems(2)
        cy.contains(title);
        cy.contains(titleTwo);
      });
    });
  });
});
