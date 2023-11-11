Feature: Scenario 4

    #login, agregar post, listar post, listar Draft

    @user1 @web
    Scenario: View draft post
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
            When Admin filter draft post
                 And I wait for 3 seconds
            Then Admin sees 1 posts