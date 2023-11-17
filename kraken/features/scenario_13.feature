Feature: Scenario 13

  @user1 @web
  Scenario: Admin creates a new Tag,list the tag, edit the tag, delete the tag and list the tag
    Given Admin starts app
    When Bot sets 13 scenario
    And Admin navigates to "/tags" page
    And Admin clicks to new Tag
    And Admin creates new Tag
    And Admin navigates to "/tags" page
    Then Admin sees 1 tags
    And Admin clicks 1 tag
    And Admin delete a Tag
    And Admin navigates to "/tags" page
    Then Admin sees 0 tags

   