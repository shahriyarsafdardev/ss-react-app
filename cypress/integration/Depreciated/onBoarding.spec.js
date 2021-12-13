const serverUrl = Cypress.env('serverUrl');

import homeFixture from '../../fixtures/onboarding/home.json';

describe('Onboarding Flow', () => {
  const assertStepCompleted = (
    step_number,
    answer,
    cohortId = '9550cc85-305a-438c-a115-e791a16c91f0',
    enrollmentId = 'f1b1b3f1-afad-4aec-8a4f-240698ac246c'
  ) => {
    cy.intercept(
      'POST',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/step_completed.json`,
      (req) => {
        req.reply({
          statusCode: 200, // default
          fixture: 'onboarding/stepCompleted'
        });
      }
    ).as('step_completed');

    cy.get('[data-testid=btn-next]').click();
    cy.wait('@step_completed').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      expect(request.body.step_number).to.eq(step_number);
      expect(request.body.cohort_id).to.eq(cohortId);
      expect(request.body.enrollment_id).to.eq(enrollmentId);
      if (answer) {
        typeof answer === 'string'
          ? expect(request.body.answer).to.eq(answer)
          : expect(request.body.answer).to.deep.eq(answer);
      }
    });
  };

  before(() => {
    cy.server();

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onBoardingNotCompleted.json').as('onboardingData');
    cy.fixture('onboarding/home.json').as('home');
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
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0&participant_id=8864c717-587d-472a-929a-8e5f298024da-1`,
      '@home'
    ).as('homeData');
  });

  it('should log user into app', () => {
    cy.visit('/');
    const email = 'waqas@scholar.com';
    const password = '123456';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });
    cy.wait(['@login', '@homeData']);
  });

  describe('Onboarding Modal', () => {
    context('Displays Pages of onBoarding Modal', () => {
      before('Opens Modal', () => {
        // Assert that the modal has appeared
        cy.get('.ReactModal__Overlay', { timeout: 3000 }).should('be.visible');
        // Assert that the side image has the correct src
        cy.get('[data-testid=onboarding-image]')
          .should('have.css', 'background-image')
          .and('include', homeFixture.onboarding_side_image_url);
      });
    });
    context('Displays Page 1', () => {
      it('Asserts data of Page 1', () => {
        // Assert title
        cy.get('[data-testid=onboard-title]').should('have.text', homeFixture.onboarding_header);
        // Assert src of video
        cy.get('[data-testid=onboard-video]')
          .should('have.attr', 'src')
          .and('equal', homeFixture.onboarding_video_url);
      });
      it('Sends message to backend when next is clicked', () => {
        assertStepCompleted(0);
      });
    });
    context('Displays Page 2', () => {
      it('Asserts data of Page 2', () => {
        // Assert title
        cy.get('[data-testid=onboard-title]').should(
          'have.text',
          "First off, we'd like to ask you a few questions so we can get to know you better"
        );
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'How did you hear about this cohort?'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'Google Search');
        cy.get('[data-testid=option-2] > input').should('have.value', 'Email Marketing');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Social Media');
        cy.get('[data-testid=option-4] > input').should(
          'have.value',
          'Recommended by a friend or colleague'
        );
        cy.get('[data-testid=option-5] > input').should(
          'have.value',
          'Personally invited by someone in the Scholarsite team'
        );
        cy.get('[data-testid=option-6] > input').should('have.value', 'Other');
        // Select option
        cy.get('[data-testid=option-1]').click();
        // Assert selected
        cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Sends message to backend when next is clicked', () => {
        // Click next button
        assertStepCompleted(1, 'Google Search');
        // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
      });
    });
    context('Displays Page 3', () => {
      it('Asserts data of Page 3', () => {
        // Assert title
        cy.get('[data-testid=onboard-title]').should(
          'have.text',
          "First off, we'd like to ask you a few questions so we can get to know you better"
        );
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Who is paying for this course?'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'I am');
        cy.get('[data-testid=option-2] > input').should('have.value', 'My employer is');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Other');
        // Select option
        cy.get('[data-testid=option-2]').click();
        // Assert selected
        cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Sends message to backend when next is clicked', () => {
        // Click next button
        assertStepCompleted(2, 'My employer is');
        // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
      });
    });
    context('Displays Page 4', () => {
      it('Asserts data of Page 4', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Would you like your participation in the Scholarsite cohort to count towards professional development accreditation (CPD, CPE or CE)?'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'Yes');
        cy.get('[data-testid=option-2] > input').should('have.value', 'No');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Maybe?');
        // Select option
        cy.get('[data-testid=option-3]').click();
        // Assert selected
        cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Sends message to backend when next is clicked', () => {
        // Click next button
        assertStepCompleted(3, 'Maybe?');
        // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
      });
    });
    context('Displays Page 5', () => {
      it('Asserts data of Page 5', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'What are you looking to find within the Scholarsite community?'
        );
        // Assert options text
        cy.get('[data-testid=check-1] > input').should('have.value', 'Find a mentor');
        cy.get('[data-testid=check-2] > input').should('have.value', 'Mentor others');
        cy.get('[data-testid=check-3] > input').should('have.value', 'Grow my network');
        cy.get('[data-testid=check-4] > input').should('have.value', 'Discuss materials');

        // Select option
        cy.get('[data-testid=check-2').click();
        cy.get('[data-testid=check-2').find('input[type="checkbox"]').should('be.checked');
      });

      it('Sends message to backend when next is clicked', () => {
        assertStepCompleted(4, ['Mentor others']);
      });
    });
    context('Displays Page 6', () => {
      it('Asserts data of Page 6', () => {
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'What topics can fellow cohort members ask you question on?'
        );
        //type Economics and press enter
        cy.get('#create-select').find('input[type="text"]').type('Economics {enter} ');
        //type hiring and press enter
        cy.get('#create-select').find('input[type="text"]').type('Hiring {enter} ');
        //asert
        cy.get('#create-select').contains('Hiring');
        cy.get('#create-select').contains('Economics');
      });

      it('Sends message to backend when next is clicked', () => {
        cy.server();
        cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
        cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
          'select_fields_data'
        );
        assertStepCompleted(5, ['Economics', 'Hiring']);
      });
    });
    context('Displays Page 7', () => {
      before(() => {
        //mocks the form fields data API
        cy.server();
        cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
        cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
          'select_fields_data'
        );
      });

      it('Asserts the fields of User profile', () => {
        cy.form();
        cy.get('[data-testid=current-company]').contains('Adobe').should('have.text', 'Adobe');
      });

      it('Submits the form', () => {
        cy.server();
        cy.fixture('onboarding/saveUserProfile.json').as('saveProfile');
        cy.route(
          'POST',
          `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/save_user_profile.json`,
          '@saveProfile'
        ).as('save_user_profile');
        cy.get('[data-testid=btn-submit]').click();
        cy.wait('@save_user_profile').then(({ response }) => {
          expect(response.body.first_name).to.eq('Aqib');
          expect(response.body.last_name).to.eq('Maqbool');
          expect(response.body.linkedin_url).to.eq('https://linkedin.com/aqibmaqqbool_react_dev');
          expect(response.body.discord_url).to.eq('https://linkedin.com/aqibmaqqbool_react_dev');
          expect(response.body.current_position).to.eq('Economist');
          expect(response.body.current_company).to.eq('Adobe');
          expect(response.body.profile_image_url).to.eq(
            'https://scholarsite-public.s3.eu-west-2.amazonaws.com/waqasnnnnn-nazir-524d71'
          );
          expect(response.body.interests).to.deep.eq(['Grow my network']);
          expect(response.body.strengths).to.deep.eq(['Economics', 'Hiring']);
        });
      });
    });
  });
});
