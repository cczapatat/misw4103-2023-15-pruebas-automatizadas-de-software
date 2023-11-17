Feature: Scenario 6

  @user1 @web
  Scenario: Admin creates a new post, listar post, listar draft, editar post, publicar,listar post, listar draft
    Given Admin starts app
    When Bot sets 6 scenario
    And Admin navigates to "/posts" page
    And Admin clicks to new Post
    And Admin creates new Post
    And Admin navigates to "/posts" page
    And Admin filter draft post
    Then Admin sees 1 posts
    And Admin clicks 1 post
    And Admin publishes post
    And Admin clicks Back to editor
    And Admin list posts
    And Admin filter draft post
    Then Admin sees 0 posts



   