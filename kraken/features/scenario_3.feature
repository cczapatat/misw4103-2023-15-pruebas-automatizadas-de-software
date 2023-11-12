Feature: Scenario 3

    #login, agregar post, publicar,listar post, filtrar, eliminar, filtrar

    @user1 @web
    Scenario: Deleted post
        Given Admin starts app
            When Admin navigates to "/posts" page
                And I wait for 5 seconds
            Then Admin visualizes "/posts" page
                And I wait for 1 seconds
                And Admin clicks to new Post
                And Admin creates new Post
                And I wait for 5 seconds
            When Admin publishes post
                And I wait for 3 seconds
                And Admin navigates to "/posts" page
                And I wait for 3 seconds
            Then Admin sees 1 posts
            When Admin filter published posts
                And I wait for 3 seconds
                And Admin clicks 1 post
                And I wait for 3 seconds
                And Admin clicks to delete post
                And I wait for 3 seconds
            Then Admin sees 0 posts