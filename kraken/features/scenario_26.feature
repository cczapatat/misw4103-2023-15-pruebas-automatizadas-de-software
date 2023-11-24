Feature: Scenario 26

  @user1 @web
  Scenario: crear tag, con desc, con color, sin nombre 
    Given Admin starts app
    When Bot sets 26 scenario
        And Admin navigates to "/tags" page
        And I wait for 3 seconds
        And Admin visualizes "/tags" page
        And I wait for 1 seconds
        And Admin clicks to new Tag
        And I wait for 3 seconds
        And Admin creates new Tag with color and no-name
      Then Admin sees no-tag-name error on tags
        