Feature: Scenario 1

  @user1 @web
  Scenario: admin login into ghost and list posts
    Given Admin starts app
    When Admin navigates to "/posts" page
    And I wait for 2 seconds
    Then Admin sees 0 posts