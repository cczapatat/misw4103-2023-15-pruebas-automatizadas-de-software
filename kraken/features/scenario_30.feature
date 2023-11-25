Feature: Scenario 30

  @user1 @web
  Scenario: crear member con name, email, note long
    Given Admin starts app
    When Bot sets 30 scenario
        And Admin logout
        And I wait for 3 seconds
        And Admin visualizes "/signin" page
        And I wait for 2 seconds     
        And Admin perform a wrong login  
        And I wait for 2 seconds
    Then Admin sees invalid-email error on login screen
        