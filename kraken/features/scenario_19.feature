Feature: Scenario 19

  @user1 @web
  Scenario: Admin creates a new page with tag, list tags, new tag, validate tag, create page, publish page, list page
    Given Admin starts app
      When Admin navigates to "/tags" page
        And I wait for 2 seconds
        And Admin clicks to new Tag
        And I wait for 2 seconds
        And Admin creates new Tag with "cczt"
        And Admin navigates to "/pages" page
        And I wait for 2 seconds
        And Admin click on New Page
        And Admin create a New Page
        And I wait for 1 seconds
        And Admin adds tag "cczt" to tag
        And I wait for 1 seconds
        And Admin publishes tag
        And I wait for 2 seconds
        And Admin navigates to "/pages" page
        And I wait for 2 seconds
      Then Admin sees 1 pages
      When Admin navigates to "/pages?tag=cczt" page
        And I wait for 2 seconds
      Then Admin visualizes "/pages?tag=cczt" page
        And Admin sees 1 pages
