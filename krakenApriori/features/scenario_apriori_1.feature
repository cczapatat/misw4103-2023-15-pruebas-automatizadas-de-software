Feature: Scenario 2

  @user1 @web
  Scenario: admin creates a new post and list posts
    Given Admin starts app
    When Bot sets 1 scenario
    And Admin navigates to "/posts" page
    And I wait for 1 seconds
    And Admin clicks to new Post
    And Admin creates new Post with title "<title>" and description "<description>"
    And I wait for 1 seconds
    And Admin publishes post when total is <total>
    And Admin navigates to "/posts" page and expected total <total>
    And I wait for 1 seconds
    Then Admin sees <total> posts with title "<title>"

  Examples:
    | total | title   | description |
    | 0     | | |
    | 0     | 256Caracterespenatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in | |
    | 1     | 255caracteresconvallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinarf lobortis est phasellus sit ametg | Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. |
    | 1     | 254caracteresconvallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit ametg | In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. |
    | 1     | 1  | Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. |