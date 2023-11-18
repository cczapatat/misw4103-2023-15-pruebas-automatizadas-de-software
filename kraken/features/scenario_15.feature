Feature: Scenario 15

  @user1 @web
  Scenario: admin create a new page and list pages
    Given Admin starts app
    When Bot sets 15 scenario
    And Admin navigates to "/pages" page
    And I wait for 2 seconds
    Then Admin sees 0 pages
    When Admin click on New Page
    And Admin create a New Page
    And I wait for 1 seconds
    And Admin clicks to Publish page
    And Admin navigates to "/pages" page
    And I wait for 2 seconds
    Then Admin sees 1 pages