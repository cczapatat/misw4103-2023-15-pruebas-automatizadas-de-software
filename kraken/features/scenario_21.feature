Feature: Scenario 21

  @user1 @web
  Scenario: Admin create two posts
    Given Admin starts app
    When Bot sets 21 scenario
        And Admin navigates to "/posts" page
        And I wait for 3 seconds
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
        And I wait for 3 seconds
         And Admin clicks to new Post
        And Admin creates new Post
        And I wait for 5 seconds
        And Admin publishes post
        And I wait for 3 seconds
        And Admin navigates to "/posts" page
        And I wait for 3 seconds
    Then Admin sees 2 posts