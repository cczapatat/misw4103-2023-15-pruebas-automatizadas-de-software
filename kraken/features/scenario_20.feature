Feature: Scenario 20

  @user1 @web
  Scenario: Admin crates new page, publish page, list and validate page, admin searches page and sees it in edition format
    Given Admin starts app
    When Bot sets 20 scenario
    And Admin navigates to "/pages" page
    And I wait for 2 seconds
    And Admin click on New Page
    And I wait for 2 seconds
    And Admin create a New Page with title "Page One"
    And I wait for 2 seconds
    And Admin clicks to Publish page
    And I wait for 2 seconds
    And Admin navigates to "/dashboard" page
    And I wait for 2 seconds
    And Admin navigates to "/pages?type=published" page
    And I wait for 2 seconds
    Then Admin visualizes "/pages?type=published" page
    And Admin sees 1 pages
    When Admin navigates to "/dashboard" page
    And I wait for 2 seconds
    And Admin searches "Page One" and click on it
    And I wait for 2 seconds
    Then Admin visualizes "/editor/page" page
