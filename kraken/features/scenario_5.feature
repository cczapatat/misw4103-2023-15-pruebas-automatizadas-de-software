Feature: Scenario 2

  @user1 @web
  Scenario: admin create a new post, publish with schedule and filter
    Given Admin starts app
    When Bot sets 5 scenario
    And Admin navigates to "/posts" page
    And I wait for 2 seconds
    Then Admin sees 0 posts
    When Admin clicks to new Post
    And Admin creates new Post
    And I wait for 1 seconds
    And Admin schedules post
    And Admin navigates to "/posts?type=scheduled" page
    And I wait for 2 seconds
    Then Admin sees 1 posts