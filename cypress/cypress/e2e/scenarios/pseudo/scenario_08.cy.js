
describe('ghost admins posts scenario 8', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_8');
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

    context('When admin create a new draft post, list posts, list draft posts, edit post and scheduled, publish post, list posts', () => {
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
          cy.wait(500);
          cy.listPostAndCheck(title);
          cy.validateQuantityItems(1);
          cy.filterDraftPost();
          cy.validateQuantityItems(1);
          cy.clickFirstPost();
          cy.schedulePost();
          cy.listPostAndCheck(title);
          cy.filterScheduledPost();
          cy.validateQuantityItems(1);
        })

      });

      it('Then admin sees empty draft post list', () => {
        cy.validateScenarioEight();
        cy.validateNoPostPseudo(title);
      });
    });
  });
});
