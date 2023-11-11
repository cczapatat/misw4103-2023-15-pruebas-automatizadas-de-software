Feature: Scenario 3

    #login, agregar post, publicar,listar post, filtrar, eliminar, filtrar

    @user1 @web
    Scenario: Deleted post
        Given Admin starts app
        When Admin navigates to "/posts" page
        And I wait for 5 seconds
        Then Admin visualizes "/posts" page
