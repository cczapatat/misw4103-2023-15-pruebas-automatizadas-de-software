Feature: Scenario 16

  @user1 @web
  Scenario: Admin creates a new page , publish page ,list page, filter published published page, delete the page and filter published page
    Given Admin starts app
    When Admin list pages
    And I wait for 2 seconds
    And Admin click on New Page
    And I wait for 2 seconds
    And Admin create a New Page
    And I wait for 2 seconds
    And Admin clicks to Publish page
    And I wait for 2 seconds
    And Admin clicks Back to editor
    And I wait for 2 seconds
    And Admin list pages
    And Admin filter published pages
    And I wait for 2 seconds
    Then Admin sees 1 pages
    And Admin click the first Page
    And I wait for 2 seconds
    And Admin clicks to delete page
    And I wait for 2 seconds
    And Admin list pages
    And Admin filter published pages
    Then Admin sees 0 pages



   