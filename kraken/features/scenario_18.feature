Feature: Scenario 18

  @user1 @web
  Scenario: Admin crates new schedule page, publish page
    Given Admin starts app
    When Admin navigates to "/pages" page
    And I wait for 2 seconds
    And Admin click on New Page
    And I wait for 2 seconds
    And Admin create a New Page
    And I wait for 2 seconds
    And Admin schedules page
    And Admin navigates to "/pages?type=scheduled" page
    And I wait for 2 seconds
    Then Admin visualizes "/pages?type=scheduled" page
    And Admin sees 1 pages
