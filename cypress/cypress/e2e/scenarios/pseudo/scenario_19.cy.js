
describe('ghost admins posts scenario 19', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {  
    cy.start('scenario_19');
    cy.login(email, password);   
    cy.deleteAll();
    cy.goToDashboard();
  });

  after(() => {
    cy.deleteAll();
    cy.logout();
  });

  context('Given admin accesses to tags', () => {
    beforeEach(() => {
      cy.listTags();
    });

    context('When admin create a new post with tag, list tags, new tag, validate tag, create page, publish page, list page', () => {
      let title;
      let description;
      let titleTag;
      let descriptionTag;
      beforeEach(() => {
        cy.mockarooTag().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          titleTag = data[0].title;
          descriptionTag = data[0].description;
          cy.createNewTag();
          cy.createTag(titleTag, descriptionTag);
          cy.wait(500);
          cy.listTagsAndCheck(titleTag);
          cy.listPages();
        });
        cy.mockarooPage().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          cy.newPage();
          cy.createPage(title, description);
          cy.wait(500);
          cy.addTagToPage(titleTag);
          cy.publishPage();
          cy.listPages();
          cy.wait(500);
        })
      });

      it('Then admin sees one page from list page by tag', () => {
        cy.validateScenarioNineteen(titleTag.replace(/\s+/g, '-').toLowerCase());
        cy.contains(title)
      });
    });
  });
});
