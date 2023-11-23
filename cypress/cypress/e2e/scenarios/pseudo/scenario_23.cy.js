
describe('ghost admins page scenario 23', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_23');
    cy.login(email, password);
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {
    cy.goToDashboard();
    cy.logout();
  });

  context('Given admin accesses page list option', () => {
    beforeEach(() => {
      cy.listPages();
    });

    context('When admin create two pages, list  pages', () => {
      let title;
      let description;
      let titleTwo;
      let descriptionTwo;
      beforeEach(() => {
        cy.mockarooPage().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.newPage();
          cy.createPage(title, description);
          cy.publishPage();
          cy.listPages();
          titleTwo = data[1].title;
          descriptionTwo = data[1].description;
          cy.newPage();
          cy.createPage(titleTwo, descriptionTwo);
          cy.publishPage();
          cy.listPages();
        })      
      });

      it('Then admin sees two pages', () => {
        cy.filterPublishedPages();
        cy.contains(title)
        cy.contains(titleTwo)
      });
    });
  });
});
