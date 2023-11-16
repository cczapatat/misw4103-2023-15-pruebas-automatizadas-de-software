describe('ghost admins posts scenario 1', () => {
  const site = Cypress.env('site');
  const name = Cypress.env('name');
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_1');
    cy.login(email, password);
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {
    cy.goToDashboard();
    cy.logout();
  });

  context('Given admin login into ghost', () => {
    context('When admin list posts', () => {
      beforeEach(() => {
        cy.listPost();
      });

      it('Then admin sees empty post list', () => {
        cy.validateScenarioOne()
      });
    });
  });
});
