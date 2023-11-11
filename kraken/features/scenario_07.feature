Feature: Scenario 7

  @user1 @web
  Scenario: Admin creates a new scheduled post, list scheduled posts, edit post, cancel scheduled, list posts and list scheduled posts
    Given Admin starts app
    When Admin navigates to "/posts" page
    And I wait for 3 seconds
    And Admin clicks to new Post
    And Admin creates new Post
    And I wait for 1 seconds
    And Admin schedules post
    And I wait for 3 seconds
    And Admin navigates to "/posts?type=scheduled" page
    And I wait for 3 seconds
    Then Admin sees 1 posts
    When Admin clicks 1 post
    And Admin clicks to Unschedule
    And I wait for 3 seconds
    And Admin navigates to "/posts" page
    And I wait for 3 seconds
    Then Admin sees 1 posts
    When Admin navigates to "/posts?type=scheduled" page
    And I wait for 3 seconds
    Then Admin sees 0 posts
