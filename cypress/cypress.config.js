const { defineConfig } = require('cypress');
const {validateVersion} = require('./utils');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: validateVersion() ? 'http://localhost:2368' : 'http://localhost:3100'
  },
  projectId:"Ghost E2E tests",
  screenshotsFolder: 'cypress/screenshots',

  env: {  
    site: 'Ghost',
    name: 'admin',
    email: 'admin@email.com',
    password: 'pruebasE2E', 
    draftPage: "Cypress Test Page", 
    scheduledPage: "Cypress Test Page Scheduled", 
    publishedPage: "Cypress Test Page Published",
    featuredPage: "Cypress Test Page Featured", 
    lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a lacus in sem tempus",
    draftPost: "Cypress Test Post", 
    scheduledPost: "Cypress Test Post Scheduled", 
    publishedPost: "Cypress Test Post Published",
    version: validateVersion()
  }
})