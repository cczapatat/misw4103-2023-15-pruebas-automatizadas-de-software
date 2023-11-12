Feature: Scenario 10

  @user1 @web
  Scenario: Admin creates a new normal Tag with name and list the tag
    Given Admin starts app
      When Admin navigates to "/tags" page
        And I wait for 2 seconds
        And Admin clicks to new Tag
        And I wait for 2 seconds
        And Admin creates new Tag with "MyTag"
        And I wait for 2 seconds
        And Admin navigates to "/tags" page       
        And I wait for 2 seconds
      Then Admin sees 1 tags

   