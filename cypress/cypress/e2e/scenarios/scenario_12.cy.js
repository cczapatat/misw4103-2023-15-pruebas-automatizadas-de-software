import { faker } from '@faker-js/faker';

describe('ghost admins posts scenario 12', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  before(() => {
    cy.start('scenario_12');
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
      cy.listTags();
    });

    context('When admin create a new post with tag, list tags, new tag, validate tag, create post, publish post, list post', () => {
      let titleTag;

      beforeEach(() => {
        titleTag = faker.lorem.word();
        const descriptionTag = faker.lorem.sentence();

        const title = faker.person.jobTitle();
        const description = faker.lorem.paragraph(2);

        cy.createNewTag();
        cy.createTag(titleTag, descriptionTag);
        cy.wait(500);
        cy.listTagsAndCheck(titleTag);
        cy.listPost();
        cy.newPost();
        cy.createPost(title, description);
        cy.wait(500);
        cy.addTagToPost(titleTag);
        cy.publishPost();
        cy.listPostAndCheck(title);
      });

      it('Then admin sees one post from list post by tag', () => {
        cy.validateScenarioTwelve(titleTag);
      });
    });
  });
});
