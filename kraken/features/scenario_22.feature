Feature: Scenario 22

  @user1 @web
  Scenario: Create two tags
    Given Admin starts app
    When Bot sets 22 scenario
        And Admin navigates to "/tags" page
        And I wait for 3 seconds
        And Admin visualizes "/tags" page
        And I wait for 1 seconds
        And Admin clicks to new Tag
        And Admin creates new Tag
        And I wait for 3 seconds
        And Admin navigates to "/tags" page
        And I wait for 3 seconds
        And Admin sees 1 tags
        And I wait for 3 seconds
        And Admin clicks to new Tag
        And Admin creates new Tag
        And I wait for 3 seconds
        And Admin navigates to "/tags" page
        And I wait for 3 seconds
    Then Admin sees 2 tags