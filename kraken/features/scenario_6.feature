Feature: Scenario 6

  @user1 @web
  Scenario: Admin creates a new post, listar post, listar draft, editar post, publicar,listar post, listar draft
    Given Admin starts app
    When Admin navigates to "/posts" page
    And Admin clicks to new Post
    And Admin creates new Post
    And Admin navigates to "/posts" page
    And Admin filter draft post
    Then Admin sees 1 posts
    And Admin clicks 1 post
    And I wait for 2 seconds
    And Admin publishes post
    And I wait for 2 seconds
    And Admin clicks Back to editor
    And Admin list posts
    And I wait for 2 seconds
    And Admin filter draft post
    And I wait for 2 seconds
    Then Admin sees 0 posts



   