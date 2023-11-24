Feature: Scenario 23

  @user1 @web
  Scenario: Create two pages
    Given Admin starts app
    When Bot sets 23 scenario
        And Admin navigates to "/pages" page
        And I wait for 3 seconds
        And Admin visualizes "/pages" page
        And I wait for 1 seconds
        And Admin click on New Page
        And Admin create a New Page
        And I wait for 5 seconds
        And Admin clicks to Publish page
        And I wait for 3 seconds
        And Admin navigates to "/pages" page
        And I wait for 3 seconds
        And Admin sees 1 pages
        And I wait for 3 seconds
        And Admin click on New Page
        And Admin create a New Page
        And I wait for 5 seconds
        And Admin clicks to Publish page
        And I wait for 3 seconds
        And Admin navigates to "/pages" page
        And I wait for 3 seconds
    Then Admin sees 2 pages