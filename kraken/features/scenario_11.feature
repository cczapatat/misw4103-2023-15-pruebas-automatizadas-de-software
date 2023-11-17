Feature: Scenario 11

  @user1 @web
  Scenario: Admin creates a new Tag with name begining with # and list the tag
    Given Admin starts app
    When Bot sets 11 scenario
    And Admin navigates to "/tags" page
    And Admin clicks to new Tag
    And Admin creates new Tag with "#MyTag"
    And Admin navigates to "/tags" page    
    And Admin filter internal tags
    Then Admin sees 1 tags

   