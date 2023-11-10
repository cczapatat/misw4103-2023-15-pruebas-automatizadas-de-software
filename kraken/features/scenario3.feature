Feature: Scenario 3

#login, agregar post, publicar,listar post, filtrar, eliminar, filtrar


@user1 @web
Scenario: Deleted post
    Given User goes to "http://localhost:2368/ghost/#/signin"
        When I wait for 1 seconds
            And User enters "tester@uniandes.edu.co" on "gh-input.email" field
            And User enters "Secure1123##" on "gh-input.password" field
            And User clicks on button "[data-test-button='sign-in']"            
            And I wait for 2 seconds 
                Then User visualizes "/dashboard" page
         When User navigates to "/posts" page
                And I wait for 5 seconds
                Then User visualizes  "/posts" page
   