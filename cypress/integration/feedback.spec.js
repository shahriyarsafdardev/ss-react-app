const serverUrl = Cypress.env('serverUrl');

describe('Survey Modal Flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('should log user into app', () => {
    // cy.wait(200000);
    cy.fixture('feedback/feedbackQuestions.json').as('questions');
    cy.route(
      'GET',
      `${serverUrl}/cohort_sessions/67540235-11b5-4666-9fa0-d875a0e7afbc/survey_questions.json`,
      '@questions'
    ).as('survey_questions');
    cy.login();
    cy.get('#session-list-1').click({ force: true });
  });
  it('should test the feedback Modal', () => {
    cy.fixture('feedback/surveyResponse.json').as('submitResponse');
    cy.route(
      'POST',
      `${serverUrl}/cohort_sessions/submit_survey_responses.json`,
      '@submitResponse'
    ).as('submit_survey_responses');
    //it selects option 1
    cy.get('[data-testid=option-1]').click();
    //it checks if right option is selected
    cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
    cy.get('[data-testid=btn-next]').click();
    //it selects option 2
    cy.get('[data-testid=option-2]').click();
    //it checks if right option is selected
    cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
    cy.get('[data-testid=btn-next]').click();
    //it selects option 3
    cy.get('[data-testid=option-3]').click();
    //it checks if right option is selected
    cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');
    cy.get('[data-testid=btn-next]').click();
    //it types text in textfield
    cy.get('[data-testid=survey-text]').type('Session was so good');
    //it checks if correct text is typed
    cy.get('[data-testid=survey-text]').should('have.text', 'Session was so good');
    cy.get('[data-testid=btn-next]').click();
    cy.get('[data-testid=survey-text]').type('Everything was fine');
    //it checks if correct text is typed
    cy.get('[data-testid=survey-text]').should('have.text', 'Everything was fine');
    cy.get('[data-testid=btn-next]').click();
  });
});
