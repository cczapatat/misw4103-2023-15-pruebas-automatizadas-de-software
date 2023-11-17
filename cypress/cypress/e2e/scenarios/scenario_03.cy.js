import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 3', () => {

  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {   
    cy.start('scenario_3');
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
        cy.publishPost();
        cy.listPost();
       
      });

      it('Then admin delete the post', () => {
        cy.validateScenarioThree();
      });
    });
  });
});
