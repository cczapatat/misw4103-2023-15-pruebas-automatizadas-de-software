Feature: Scenario 24

  @user1 @web
  Scenario: login, agregar tag con nombre, description large, guardar 
    Given Admin starts app
    When Bot sets 24 scenario
        And Admin navigates to "/tags" page
        And I wait for 3 seconds
        And Admin visualizes "/tags" page
        And I wait for 1 seconds
        And Admin clicks to new Tag
        And I wait for 3 seconds
        And Admin creates new Tag with long description
      Then Admin sees 500-char error on tags
        