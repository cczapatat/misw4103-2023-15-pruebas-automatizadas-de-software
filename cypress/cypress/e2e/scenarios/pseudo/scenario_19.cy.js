import { faker } from '@faker-js/faker';

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
      let titleTag;
      let title;
      let description;
      beforeEach(() => {
        cy.mockarooPage().then((response) => {
          expect(response.status).to.eq(200); 
          const data = response.body;
          title = data[0].title;
          description = data[0].description;
          titleTag = faker.lorem.word();
          const descriptionTag = faker.lorem.sentence();
          cy.createNewTag();
          cy.createTag(titleTag, descriptionTag);
          cy.wait(500);
          cy.listTagsAndCheck(titleTag);
          cy.listPages();
          cy.newPage();
          cy.createPage(title, description);
          cy.wait(500);
          cy.addTagToPage(titleTag);
          cy.publishPage();
          cy.listPagesAndCheck(title);
        })
      });

      it('Then admin sees one page from list page by tag', () => {
        cy.validateScenarioNineteen(titleTag);
        cy.contains(title)
      });
    });
  });
});
