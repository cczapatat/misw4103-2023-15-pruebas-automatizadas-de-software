Feature: Scenario 32

  @user1 @web
  Scenario: Crear member, listar member, Seleccionar member, borrar member, buscar member
    When Bot sets 32 scenario
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
        And Admin clicks on created member
        And Admin clicks on actions
        And Admin clicks on delete
        And Admin clicks on confirm delete
        And I wait for 2 seconds
      Then Admin dont see last created email
        