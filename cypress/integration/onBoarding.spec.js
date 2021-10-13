const serverUrl = Cypress.env('serverUrl');

describe('onboarding flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });
  it('should log user into app', () => {
    // cy.wait(200000);
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
    cy.route('GET', `${serverUrl}/cohorts/onboarding_complete.json`, '@onboardingData').as(
      'onboarding_complete'
    );
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0&participant_id=8864c717-587d-472a-929a-8e5f298024da-1`,
      '@home'
    ).as(
      'home.json?cohort_id=9550cc85-305a-438c-a115-e791a1…icipant_id=8864c717-587d-472a-929a-8e5f298024da-1'
    );

    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);

    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });

    cy.wait('@login');
    cy.wait(3000);
  });
  it('should complete onboarding', () => {
    cy.fixture('onboarding/stepCompleted.json').as('stepCompleted');
    cy.fixture('onboarding/saveUserProfile.json').as('saveProfile');
    cy.fixture('onboarding/homeOnComplete.json').as('homeOnComplete');
    cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
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

    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.contains('Google Search').click({ multiple: true, force: true });
    cy.contains('Google Search').then((radio) => {
      expect(radio[0].children[0].getAttribute('data-checked')).to.eq('true');
    });
    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.contains('My employer is').click({ multiple: true, force: true });
    cy.contains('My employer is').then((radio) => {
      expect(radio[0].children[0].getAttribute('data-checked')).to.eq('true');
    });
    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.contains('Maybe?').click({ multiple: true, force: true });
    cy.contains('Maybe?').then((radio) => {
      expect(radio[0].children[0].getAttribute('data-checked')).to.eq('true');
    });
    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.get('#check-2').click({ multiple: true, force: true });
    cy.get('#check-2').should('be.checked');
    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.get('#react-select-2-placeholder').type('Economics {enter} ');
    cy.get('#react-select-3-input').type('Hiring {enter} ');
    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.get('#btn-next').click({ multiple: true, force: true });
    cy.form();
    cy.get('#btn-submit').click({ multiple: true, force: true });
  });
});
