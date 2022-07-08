# Sphere Testing Standards

We would like to use consistent standards within our tests to ensure product transparency.

## Directory Structure

In order to keep tests organised and manageable, we will use the following directory structure

pages

> Home
>
> > Header.spec.js
> > Timeline.spec.js
> > TaskList.spec.js
> > NetworkingSuggestions.spec.js

As shown above, each page will have a folder which contains a test file for each major component. In the future when we begin to test user stories we will extend this structure.

## Blocks

### "Describe" blocks

The text within a describe block should answer the following question:
**What do the tests within this block relate to?**

A "desribe" block should always:

- Be the name of a specific page (ie. "Home Tab")
  OR
- Be the name of a specific component (ie. "Header")

### "Context" blocks

The text within a context block should answer the following question:
**What conditions need to be true for the uocoming assertions to be true**

In other words:
**What conditions need to be true for the upcoming test cases to be relevant**

A "context" block should always:

- Begin with "When" (ie. "When the user has no profile image")

### "It" blocks

The text within a it block should answer the following question:
**Without going into specifics, what are we asserting in this block?**

A "it" block should always:

- Begin with a present tense verb (ie "Displays a welcome message" OR "Shifts the timeline component to the right" OR "Processes the payment)
- Refer to elements using a test-id (ie. cy.get('[data-testid=session-list-number-0]');)
- When possible, always refer to the appropriate fixture, for example
  - should('contain', sessionsFixture.sessions[0].number); OR
  - should('eq', `👋 Hi ${userFixture.first_name}, welcome to the ${cohortsFixture.code} Cohort!`);)
