Feature: Scenario 29

  @user1 @web
  Scenario: crear member con name, email, note long
    Given Admin starts app
    When Bot sets 29 scenario
        And Admin navigates to "/members" page
        And I wait for 3 seconds
        And Admin visualizes "/members" page
        And I wait for 1 seconds
        And Admin clicks on new Member
        And I wait for 2 seconds
        And Admin creates a new member with long note
        And I wait for 2 seconds
    Then Admin sees note-long error on member screen
        