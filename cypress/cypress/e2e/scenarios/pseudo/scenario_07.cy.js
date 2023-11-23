
describe('ghost admins posts scenario 7', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_7');
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

    context('When admin create a new scheduled post, list scheduled posts, edit post, cancel scheduled, list posts and list scheduled posts', () => {
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
          cy.schedulePost();
          cy.filterScheduledPost();
          cy.validateQuantityItems(1);
          cy.clickFirstPost();
          cy.unschedulePost();
          cy.listPostAndCheck(title);
          cy.validateQuantityItems(1);
        })
      });

      it('Then admin sees empty scheduled post list', () => {
        cy.validateScenarioSeven();
        cy.validateNoPostPseudo(title);
      });
    });
  });
});
