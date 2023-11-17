Feature: Scenario 12

  @user1 @web
  Scenario: Admin creates a new post with tag, list tags, new tag, validate tag, create post, publish post, list post
    Given Admin starts app
    When Bot sets 12 scenario
    And Admin navigates to "/tags" page
    And I wait for 2 seconds
    And Admin clicks to new Tag
    And I wait for 2 seconds
    And Admin creates new Tag with "cczt"
    And Admin navigates to "/posts" page
    And I wait for 2 seconds
    And Admin clicks to new Post
    And Admin creates new Post
    And I wait for 1 seconds
    And Admin adds tag "cczt" to post
    And I wait for 1 seconds
    And Admin publishes post
    And I wait for 2 seconds
    And Admin navigates to "/posts" page
    And I wait for 2 seconds
    Then Admin sees 1 posts
    When Admin navigates to "/posts?tag=cczt" page
    And I wait for 2 seconds
    Then Admin visualizes "/posts?tag=cczt" page
    And Admin sees 1 posts

