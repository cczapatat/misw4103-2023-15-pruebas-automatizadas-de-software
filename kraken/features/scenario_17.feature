Feature: Scenario 17

    #login, agregar pagina, listar pagina, listar paginas draft

    @user1 @web
    Scenario: View draft post
        Given Admin starts app
            When Admin navigates to "/pages" page
                And I wait for 5 seconds
            Then Admin visualizes "/pages" page
                And I wait for 1 seconds
                And Admin click on New Page
                And Admin create a New Page                
                And I wait for 3 seconds
                And Admin navigates to "/pages" page
                And I wait for 3 seconds           
                And Admin filter draft pages
                And I wait for 3 seconds
            Then Admin sees 1 pages