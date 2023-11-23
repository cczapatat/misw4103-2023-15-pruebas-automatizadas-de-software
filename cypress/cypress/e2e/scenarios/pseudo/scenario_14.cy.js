describe('ghost admins page scenario 14', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_14');
    cy.login(email, password);
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {
    cy.goToDashboard();
    cy.logout();
  });

  context('Given admin login into ghost', () => {
    context('When admin list pages', () => {
      beforeEach(() => {
        cy.listPages();
      });

      it('Then admin sees empty page list', () => {
        cy.validateScenarioFourteen()
      });
    });
  });
});
