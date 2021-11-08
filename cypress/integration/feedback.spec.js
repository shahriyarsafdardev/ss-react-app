import moment from 'moment';

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
        //Asserts description
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          feedbackFixture[0].description
        );
        // Asserts the options
        cy.get('[data-testid=option-1] > input').should(
          'have.value',
          feedbackFixture[0].options[0]
        );
        cy.get('[data-testid=option-2] > input').should(
          'have.value',
          feedbackFixture[0].options[1]
        );
        cy.get('[data-testid=option-3] > input').should(
          'have.value',
          feedbackFixture[0].options[2]
        );
        cy.get('[data-testid=option-4] > input').should(
          'have.value',
          feedbackFixture[0].options[3]
        );
        cy.get('[data-testid=option-5] > input').should(
          'have.value',
          feedbackFixture[0].options[4]
        );
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
        // Asset Description
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          feedbackFixture[1].description
        );
        // Asserts the options
        cy.get('[data-testid=option-1] > input').should(
          'have.value',
          feedbackFixture[1].options[0]
        );
        cy.get('[data-testid=option-2] > input').should(
          'have.value',
          feedbackFixture[1].options[1]
        );
        cy.get('[data-testid=option-3] > input').should(
          'have.value',
          feedbackFixture[1].options[2]
        );
        cy.get('[data-testid=option-4] > input').should(
          'have.value',
          feedbackFixture[1].options[3]
        );
        cy.get('[data-testid=option-5] > input').should(
          'have.value',
          feedbackFixture[1].options[4]
        );
      });

      it('Asserts that button is enabled before slecting any option', () => {
        cy.get('[data-testid=btn-next]').should('not.be.disabled');
      });

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

    context('When Question type is text-input and is mandatory', () => {
      it('Asserts data of Question 3', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should('have.text', feedbackFixture[2].title);
        // Asset Description
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          feedbackFixture[2].description
        );
      });

      it('Asserts that button is disabled', () => {
        cy.get('[data-testid=btn-next]').should('be.disabled');
      });

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

    context('Checks if back button is working', () => {
      it('clicks back button three times', () => {
        cy.get('[data-testid=btn-previous]').click();
        cy.get('[data-testid=btn-previous]').click();
        cy.get('[data-testid=btn-previous]').click();
      });

      it('Goes back to last page to submit form', () => {
        cy.get('[data-testid=btn-next]').click();
        cy.get('[data-testid=btn-next]').click();
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('When Question type is text-input and is not mandatory', () => {
      it('Asserts data of Question 4', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should('have.text', feedbackFixture[3].title);
        // Asset Description
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          feedbackFixture[3].description
        );
      });

      it('types the text and assert it is typed correctly', () => {
        cy.get('[data-testid=survey-text]').type('Everything was fine');
        //it checks if correct text is typed
        cy.get('[data-testid=survey-text]').should('have.text', 'Everything was fine');
      });

      it('clicks the next button', () => {
        cy.get('[data-testid=btn-next]').should('not.be.disabled');
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('When Question type is slider', () => {
      it('Asserts data of Question 5', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should('have.text', feedbackFixture[4].title);
        // Asset Description
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          feedbackFixture[4].description
        );
      });

      it('checks the default value', () => {
        cy.get('[data-testid=slider-option]')
          .find('input')
          .should('have.value', feedbackFixture[4].options.max);
      });

      it('should have max value of 10', () => {
        cy.get('[data-testid=slider-option]')
          .find('input')
          .should('have.attr', 'max')
          .and('equal', `${feedbackFixture[4].options.max}`);
      });

      it('should select the value of 5', () => {
        cy.get('[data-testid=slider-option]').click({ force: true, multiple: true });
        cy.get('[data-testid=slider-option]')
          .find('input')
          .type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}');
      });

      it('asserts that correct value is selected', () => {
        cy.get('[data-testid=slider-option]').find('input').should('have.value', 5);
      });
    });

    context('Submits the form', () => {
      it('Asserts answers mapping to their respective question IDs', () => {
        cy.server();
        cy.fixture('feedback/surveyResponse.json').as('submitResponse');
        cy.route(
          'POST',
          `${serverUrl}/cohort_sessions/submit_survey_responses.json`,
          '@submitResponse'
        ).as('submit_survey_responses');
        cy.get('[data-testid=btn-next]').click();
        cy.wait('@submit_survey_responses').then(({ response, request }) => {
          const questionIDs = Object.keys(request.body.response);

          expect(request.body.response[questionIDs[0]]).to.eq('Strongly Agree');
          expect(request.body.response[questionIDs[1]]).to.eq('Agree');
          expect(request.body.response[questionIDs[2]]).to.eq('Session was so good');
          expect(request.body.response[questionIDs[3]]).to.eq('Everything was fine');
          expect(request.body.response[questionIDs[4]]).to.eq(5);
        });
      });
    });
  });
});
