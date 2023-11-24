Feature: Scenario 4

  @user1 @web
  Scenario Outline: Create member and list member
    Given Admin starts app
    When Bot sets 4 scenario
        And Admin navigates to "/members" page
        And I wait for 3 seconds
        And Admin visualizes "/members" page
        And I wait for 1 seconds
        And Admin clicks on new Member
        And I wait for 2 seconds
        And Admin creates a new member with name "<memberName>", email "<memberEmail>" and note "<memberNote>"
        And I wait for 2 seconds
        And Admin navigates to "/members" page and expected total <memberTotal>
        And I wait for 2 seconds
      Then Admin sees <memberTotal> members 

      Examples:
      | memberTotal | memberName | memberEmail | memberNote | 
      | 0 | | | |
      | 0 | 192 caracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck | example@email.com  | a |
      | 0 | descUpper | nonemail | b | 
      | 0 | descUpper | 192mpleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexampleexample@emailemailemailemailemailemailemailemailemailemailemai.com | c | 
      | 0 | descUpper | example@email.com | 501 caracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck aracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck aracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est sdd feed dd d |
      | 1 | 190 caractrs convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck | example@email.com  | a |
      | 1 | descUpper | pe73iemailemaileadssdledddddmailemailemXailemailemailemailemail@gmail.com | c |
      | 1 | descUpper | pe74ilemailemaileadssdledddddmailemailemXailemailemailemailemail@gmail.com | c |
      | 1 | descUpper | example@email.com | 499 caracres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck aracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck aracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est sdd feed dd d | 
      | 1 | descUpper | example@email.com | 500 caractres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck aracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tinck aracteres convallis morbi odio odio elementum eu intdum eu tincidunt in leo maecenas pulvinar lobortis est sdd feed dd d |