Feature: Scenario 3

    #login, agregar post, publicar,listar post, filtrar, eliminar, filtrar

    @user1 @web
    Scenario: Deleted post
        Given Admin starts app
            When Bot sets 3 scenario
            And Admin navigates to "/posts" page
            And I wait for 5 seconds
            And Admin visualizes "/posts" page
            And I wait for 1 seconds
            And Admin clicks to new Post
            And Admin creates new Post
            And I wait for 5 seconds
            And Admin publishes post
            And I wait for 3 seconds
            And Admin navigates to "/posts" page
            And I wait for 3 seconds
            And Admin sees 1 posts
            And Admin filter published posts
            And I wait for 3 seconds
            And Admin clicks 1 post
            And I wait for 3 seconds
            And Admin clicks to delete post
            And I wait for 3 seconds
        Then Admin sees 0 posts