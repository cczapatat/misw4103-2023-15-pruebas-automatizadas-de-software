Feature: Scenario 13

  @user1 @web
  Scenario: Admin creates a new Tag,list the tag, edit the tag, delete the tag and list the tag
    Given Admin starts app
    When Admin navigates to "/tags" page
    And I wait for 2 seconds
    And Admin clicks to new Tag
    And I wait for 2 seconds
    And Admin creates new Tag
    And I wait for 2 seconds
    And Admin navigates to "/tags" page
    And I wait for 2 seconds
    Then Admin sees 1 tags
    And Admin clicks 1 tag
    And I wait for 2 seconds
    And Admin delete a Tag
    And Admin navigates to "/tags" page
    And I wait for 2 seconds
    Then Admin sees 0 tags

   