Feature: Scenario 28

  @user1 @web
  Scenario: login, agregar tag con nombre normal, eliminar tag en misma pagina, listar tag
     When Bot sets 28 scenario
      And Admin navigates to "/tags" page
      And Admin clicks to new Tag
      And I wait for 3 seconds
      And Admin creates new Tag  
      And Admin delete a Tag
      And I wait for 3 seconds
      And Admin navigates to "/tags" page
    Then Admin sees 0 tags
