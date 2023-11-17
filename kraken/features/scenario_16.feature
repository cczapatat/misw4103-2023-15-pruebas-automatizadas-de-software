Feature: Scenario 16

  @user1 @web
  Scenario: Admin creates a new page , publish page ,list page, filter published published page, delete the page and filter published page
    Given Admin starts app
    When Bot sets 13 scenario
    And Admin list pages
    And Admin click on New Page
    And Admin create a New Page
    And Admin clicks to Publish page
    And Admin clicks Back to editor
    And Admin list pages
    And Admin filter published pages
    Then Admin sees 1 pages
    And Admin click the first Page
    And Admin clicks to delete page
    And Admin list pages
    And Admin filter published pages
    Then Admin sees 0 pages



   