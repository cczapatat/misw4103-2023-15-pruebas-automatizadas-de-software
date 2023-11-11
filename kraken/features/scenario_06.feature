Feature: Scenario 6

    #login, agregar post, listar post, listar draft, editar post, publicar,listar post, listar draft


    @user1 @web
    Scenario: Deleted post
        Given Admin starts app
        When Admin list pages
        And I wait for 1 seconds
        And Admin click on New Page
        And I wait for 1 seconds
        And Admin create a New Page
        And I wait for 1 seconds
        And Admin clicks to Publish page
        And I wait for 1 seconds
        And Admin list pages
        And I wait for 1 seconds
        And Admin click the first Page
        And I wait for 1 seconds
        And Admin edit an existing Page
        And I wait for 1 seconds
        And Admin list pages
        Then Admin visualizes "/pages" page

   