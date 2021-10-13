const serverUrl = Cypress.env('serverUrl');

describe('Survey Modal Flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('should log user into app', () => {
    cy.wait(200000);
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
    cy.contains(/^Strongly Agree$/).click();
    cy.contains(/^Strongly Agree$/).then((radio) => {
      expect(radio[0].children[0].getAttribute('data-checked')).to.eq('true');
    });
    cy.get('#btn-next').click();
    cy.contains(/^Agree$/).click();
    cy.contains(/^Agree$/).then((radio) => {
      expect(radio[0].children[0].getAttribute('data-checked')).to.eq('true');
    });
    cy.get('#btn-next').click();
    cy.contains(/^Neutral$/).click();
    cy.contains(/^Neutral$/).then((radio) => {
      expect(radio[0].children[0].getAttribute('data-checked')).to.eq('true');
    });
    cy.get('#btn-next').click();
    cy.get('#survey-text').type('Session was so good');
    cy.get('#survey-text').should('have.text', 'Session was so good');
    cy.get('#btn-next').click();
    cy.get('#survey-text').type('Everything was fine');
    cy.get('#survey-text').should('have.text', 'Everything was fine');
    cy.get('#btn-next').click();
  });
});
