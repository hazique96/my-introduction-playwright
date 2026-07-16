Feature: Ecommerce Validations

  Scenario: Placing the order with valid details
    Given a login to the application with valid "ajique.QA@protonmail.com" and "Testing123"
    When I add "zara coat3" to the cart
    Then Verify the "zara coat 3" is added to the cart
    When I proceed to checkout and fill in the details
    Then verify the order is placed successfully