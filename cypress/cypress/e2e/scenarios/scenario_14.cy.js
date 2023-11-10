describe('ghost admins page scenario 14', () => {
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

  context('Given admin login into ghost', () => {
    context('When admin list pages', () => {
      beforeEach(() => {
        cy.listPages();
      });

      it('Then admin sees empty page list', () => {
        cy.wait(500);
        cy.get('li.gh-list-row').should('not.exist');
        cy.screenshot();
        cy.wait(500);
      });
    });
  });
});
