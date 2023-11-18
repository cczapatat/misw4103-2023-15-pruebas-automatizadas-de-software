Feature: Scenario 14

  @user1 @web
  Scenario: admin login into ghost and list pages
    Given Admin starts app
    When Bot sets 14 scenario
    And Admin navigates to "/pages" page
    And I wait for 2 seconds
    Then Admin sees 0 pages