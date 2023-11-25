Feature: Scenario 31

  @user1 @web
  Scenario: Crear member 1, listar member, Crear member 2, listar member, buscar member 1
    When Bot sets 31 scenario
        And Admin navigates to "/members" page
        And I wait for 3 seconds
        And Admin visualizes "/members" page
        And I wait for 1 seconds
        And Admin clicks on new Member
        And I wait for 2 seconds
        And Admin creates a new member
        And I wait for 2 seconds
        And Admin navigates to "/members" page
        And I wait for 2 seconds
        And Admin clicks on new Member
        And I wait for 2 seconds
        And Admin creates a new member
        And I wait for 2 seconds
        And Admin navigates to "/members" page
        And I wait for 2 seconds
      Then Admin sees last created email 
        