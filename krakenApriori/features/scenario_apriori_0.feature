Feature: Scenario Apriori 1 - Example Table

  @user1 @web
  Scenario: admin login into ghost and list posts
    Given Admin starts app
    When Bot sets 1 scenario
    And Admin navigates to "<site>" page
    And I wait for 2 seconds
    Then Admin sees <total> posts

  Examples:
    | site   | total |
    | /posts | 0     |
    | /pages | 0     |