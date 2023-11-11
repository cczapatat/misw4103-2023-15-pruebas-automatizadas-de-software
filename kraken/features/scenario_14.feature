Feature: Scenario 14

  @user1 @web
  Scenario: admin login into ghost and list pages
    Given Admin starts app
    When Admin navigates to "/pages" page
    And I wait for 2 seconds
    Then Admin sees 0 pages