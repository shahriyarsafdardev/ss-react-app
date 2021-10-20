const serverUrl = Cypress.env('serverUrl');

describe('Onboarding Flow', () => {
  before(() => {
    cy.server();

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onBoardingNotCompleted.json').as('onboardingData');
    cy.fixture('onboarding/home.json').as('home');
    cy.fixture('onboarding/stepCompleted.json').as('stepCompleted');
    cy.fixture('onboarding/saveUserProfile.json').as('saveProfile');
    cy.fixture('onboarding/homeOnComplete.json').as('homeOnComplete');
    cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');

    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
      '@sessionData'
    ).as('sessions');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.route('GET', `${serverUrl}/cohorts/onboarding_complete.json`, '@onboardingData').as(
      'onboarding_complete'
    );
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0&participant_id=8864c717-587d-472a-929a-8e5f298024da-1`,
      '@home'
    ).as('homeData');
    cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
      'select_fields_data'
    );
    cy.route(
      'POST',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/step_completed.json`,
      '@stepCompleted'
    ).as('step_completed');
    cy.route(
      'POST',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/save_user_profile.json`,
      '@saveProfile'
    ).as('save_user_profile');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0`,
      '@homeOnComplete'
    ).as('home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0');

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onBoardingNotCompleted.json').as('onboardingData');
    cy.fixture('onboarding/home.json').as('home');
  });

  it('should log user into app', () => {
    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });
    cy.wait(['@login', '@homeData']);
  });

  it('Displays the onboarding modal', () => {
    // Assert that the modal has appeared
    // Assert that the side image has the correct src
  });

  it('Displays Page 1', () => {
    // Assert title
    // Assert src of video
  });

  it('Sends message to backend when next is clicked', () => {
    // Click next button
    // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
  });

  it('Displays Page 2', () => {
    // Assert title
    // Assert question
    // Assert options text
    // Select option
    // Assert selected
    // Click next
  });

  it('Sends message to backend when next is clicked', () => {
    // Click next button
    // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
  });

  it('Displays Page 3', () => {
    // Assert title
    // Assert question
    // Assert options text
    // Select option
    // Assert selected
    // Click next
  });

  // ...
});
