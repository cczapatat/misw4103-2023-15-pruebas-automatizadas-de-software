Feature: Scenario 8

  @user1 @web
  Scenario: Admin creates a new draft post, list posts, list draft posts, edit post and scheduled, publish post, list posts
    Given Admin starts app
    When Admin navigates to "/posts" page
    And I wait for 2 seconds
    And Admin clicks to new Post
    And Admin creates new Post
    And I wait for 2 seconds
    And Admin navigates to "/posts" page
    And I wait for 2 seconds
    Then Admin sees 1 posts
    When Admin navigates to "/posts?type=draft" page
    And I wait for 2 seconds
    Then Admin sees 1 posts
    When Admin clicks 1 post
    And I wait for 2 seconds
    And Admin schedules post
    And I wait for 2 seconds
    And Admin navigates to "/posts" page
    And I wait for 2 seconds
    Then Admin sees 1 posts
    When Admin navigates to "/posts?type=scheduled" page
    And I wait for 2 seconds
    Then Admin sees 1 posts
    When Admin navigates to "/posts?type=draft" page
    And I wait for 2 seconds
    Then Admin sees 0 posts
