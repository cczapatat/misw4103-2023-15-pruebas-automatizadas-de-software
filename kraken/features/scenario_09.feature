Feature: Scenario 9

  @user1 @web
  Scenario: Admin creates a new post , publish post ,list posts, edit the post, delete the post, list posts
    Given Admin starts app
    When Admin navigates to "/posts" page
    And Admin clicks to new Post
    And Admin creates new Post
    And Admin publishes post
    And I wait for 2 seconds
    And Admin clicks Back to editor
    And I wait for 2 seconds
    And Admin list posts
    And I wait for 2 seconds
    Then Admin sees 1 posts
    And Admin clicks 1 post
    And I wait for 2 seconds
    And Admin clicks to delete post
    And I wait for 2 seconds
    And Admin list posts
    Then Admin sees 0 posts



   