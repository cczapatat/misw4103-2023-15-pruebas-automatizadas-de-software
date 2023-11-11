Feature: Scenario 11

  @user1 @web
  Scenario: Admin creates a new Tag with name begining with # and list the tag
    Given Admin starts app
    When Admin navigates to "/tags" page
    And I wait for 2 seconds
    And Admin clicks to new Tag
    And I wait for 2 seconds
    And Admin creates new Tag with "#MyTag"
    And I wait for 2 seconds
    And Admin navigates to "/tags" page    
    And Admin filter internal tags
    And I wait for 2 seconds
    Then Admin sees 1 tags

   