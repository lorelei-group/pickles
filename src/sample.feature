Feature: A simple set than allows me to add and remove keys and without duplication.

  Scenario: Add a item to the set
    Given I have a new set
      And I have a key
     When I add the key to the set
     Then The set should have the key

  Scenario: Remove an existing item
    Given I have a new set
      And I have a key
      And I add the key to the set
     When I remove the key
     Then The set should not have the key
