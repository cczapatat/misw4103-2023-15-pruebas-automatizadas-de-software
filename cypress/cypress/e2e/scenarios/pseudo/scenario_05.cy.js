import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 5', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_5');
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

    context('When admin create a new post', () => {
      let title;
      let description;
      beforeEach(() => {
        cy.mokarooPost().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.newPost();
          cy.createPost(title, description);
        })                  
      });

      it('Then admin publish post with schedule then filter ', () => {
        cy.validateScenarioFive()
        cy.contains(title);
      });
    });
  });
});
