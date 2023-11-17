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
      beforeEach(() => {
        const title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);
       
        cy.newPost();
        cy.createPost(title, description);                   
      });

      it('Then admin publish post with schedule then filter ', () => {
        cy.validateScenarioFive()
      });
    });
  });
});
