Feature: Scenario 27

  @user1 @web
  Scenario: crear member con name, sin email
    Given Admin starts app
    When Bot sets 27 scenario
        And Admin navigates to "/members" page
        And I wait for 3 seconds
        And Admin visualizes "/members" page
        And I wait for 1 seconds
        And Admin clicks on new Member
        And I wait for 2 seconds
        And Admin creates a new member without email
        And I wait for 2 seconds
    Then Admin sees no-email error on member screen
        