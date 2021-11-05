import moment from 'moment';

// const serverUrl = Cypress.env('serverUrl');
import sessionFixture from '../fixtures/session/session_for_feedback.json';

// describe('Survey Modal Flow', () => {
//   before(() => {
//     // network stub
//     cy.server();

//     cy.fixture('feedback/feedbackQuestions.json').as('questions');
//     cy.route(
//       'GET',
//       `${serverUrl}/cohort_sessions/d1aa12c2-7658-4490-8fab-ec2b5187fe13/survey_questions.json`,
//       '@questions'
//     ).as('survey_questions');
//   });

//   it('should log user into app', () => {
//     // cy.wait(200000);
//     cy.login();
//     cy.wait(3000);
//   });
//   it('should test the feedback Modal', () => {
//     var dateTime = moment(sessionFixture.sessions[1].time).add(5, 'hours');
//     cy.clock(new Date(dateTime.format()));
//     cy.get('#session-list-1').click({ force: true });
//     cy.server();
//     cy.fixture('feedback/surveyResponse.json').as('submitResponse');
//     cy.route(
//       'POST',
//       `${serverUrl}/cohort_sessions/submit_survey_responses.json`,
//       '@submitResponse'
//     ).as('submit_survey_responses');

//     // cy.get('#session-list-').click({ force: true });
//     //it selects option 1
//     cy.get('[data-testid=option-1]').click();
//     //it checks if right option is selected
//     cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
//     cy.get('[data-testid=btn-next]').click();
//     //it selects option 2
//     cy.get('[data-testid=option-2]').click();
//     //it checks if right option is selected
//     cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
//     cy.get('[data-testid=btn-next]').click();
//     //it selects option 3
//     cy.get('[data-testid=option-3]').click();
//     //it checks if right option is selected
//     cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');
//     cy.get('[data-testid=btn-next]').click();
//     //it types text in textfield
//     cy.get('[data-testid=survey-text]').type('Session was so good');
//     //it checks if correct text is typed
//     cy.get('[data-testid=survey-text]').should('have.text', 'Session was so good');
//     cy.get('[data-testid=btn-next]').click();
//     cy.get('[data-testid=survey-text]').type('Everything was fine');
//     //it checks if correct text is typed
//     cy.get('[data-testid=survey-text]').should('have.text', 'Everything was fine');
//     cy.get('[data-testid=btn-next]').click();
//   });
// });

//////////////////
const serverUrl = Cypress.env('serverUrl');
import feedbackFixture from '../fixtures/feedback/feedbackQuestions.json';

describe('Session Survey Flow', () => {
  before(() => {
    cy.server();

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/session_for_feedback.json').as('sessionData');
    cy.fixture('session/onboarding.json').as('onboardingData');
    cy.fixture('feedback/feedbackQuestions.json').as('questions');
    cy.route(
      'GET',
      `${serverUrl}/cohort_sessions/d1aa12c2-7658-4490-8fab-ec2b5187fe13/survey_questions.json`,
      '@questions'
    ).as('survey_questions');
    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
      '@sessionData'
    ).as('sessions');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/onboarding_complete.json`,
      '@onboardingData'
    ).as('onboarding_complete');
  });

  it('should log user into app', () => {
    cy.visit('/');
    const email = 'waqas@scholar.com';
    const password = '123456';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });
    // var dateTime = moment(sessionFixture.sessions[0].time).add(3, 'hours');
    // cy.clock(new Date(dateTime.format()));
    cy.wait(['@login', '@sessions']);
  });
  describe('Onboarding Modal', () => {
    context('When Question type is multiple-choice and is mandatory', () => {
      it('Asserts data of Question 1', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should('have.text', feedbackFixture[0].title);
        // Asserts the options
        cy.get('[data-testid=option-1] > input').should('have.value', 'Strongly Agree');
        cy.get('[data-testid=option-2] > input').should('have.value', 'Agree');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Neutral');
        cy.get('[data-testid=option-4] > input').should('have.value', 'Disagree');
        cy.get('[data-testid=option-5] > input').should('have.value', 'Strongly Disagree');
      });

      it('Asserts that button is disabled', () => {
        cy.get('[data-testid=btn-next]').should('be.disabled');
      });

      it('selects the option and assert it is selected', () => {
        cy.get('[data-testid=option-1]').click();
        //it checks if right option is selected
        cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Asserts that button is enabled now and cicks on ot', () => {
        cy.get('[data-testid=btn-next]').should('not.be.disabled');
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('When Question type is multiple-choice and is not mandatory', () => {
      it('Asserts data of Question 2', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should('have.text', feedbackFixture[1].title);
        // Asserts the options
        cy.get('[data-testid=option-1] > input').should('have.value', 'Strongly Agree');
        cy.get('[data-testid=option-2] > input').should('have.value', 'Agree');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Neutral');
        cy.get('[data-testid=option-4] > input').should('have.value', 'Disagree');
        cy.get('[data-testid=option-5] > input').should('have.value', 'Strongly Disagree');
      });

      // it('Asserts that button is enabled before slecting any option', () => {
      //   cy.get('[data-testid=btn-next]').should('not.be.disabled');
      // });

      it('selects the option and assert it is selected', () => {
        cy.get('[data-testid=option-2]').click();
        //it checks if right option is selected
        cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('clicks the next button', () => {
        cy.get('[data-testid=btn-next]').should('not.be.disabled');
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('When Question type is text-input', () => {
      it('Asserts data of Question 3', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should('have.text', feedbackFixture[2].title);
      });

      // it('Asserts that button is enabled before slecting any option', () => {
      //   cy.get('[data-testid=btn-next]').should('not.be.disabled');
      // });

      it('types the text and assert it is typed correctly', () => {
        cy.get('[data-testid=survey-text]').type('Session was so good');
        //it checks if correct text is typed
        cy.get('[data-testid=survey-text]').should('have.text', 'Session was so good');
      });

      it('clicks the next button', () => {
        cy.get('[data-testid=btn-next]').should('not.be.disabled');
        cy.get('[data-testid=btn-next]').click();
      });
    });
  });
});
