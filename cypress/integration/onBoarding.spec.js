const serverUrl = Cypress.env('serverUrl');
var stepNumber = 0;

describe('onboarding flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('should log user into app', () => {
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
    ).as('homeData');

    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });

    cy.wait(['@login', '@homeData']);
  });
  it('should complete onboarding', () => {
    // cy.fixture('onboarding/stepCompleted.json').as('stepCompleted');
    cy.fixture('onboarding/saveUserProfile.json').as('saveProfile');
    cy.fixture('onboarding/homeOnComplete.json').as('homeOnComplete');
    cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
    cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
      'select_fields_data'
    );
    // cy.route(
    //   'POST',
    //   `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/step_completed.json`,
    //   '@stepCompleted'
    // ).as('step_completed');
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
    cy.intercept(
      'POST',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/step_completed.json`,
      (req) => {
        expect(req.body).to.have.property('step_number', stepNumber);
        if (stepNumber) {
          switch (stepNumber) {
            case 1:
              expect(req.body).to.have.property('answer', 'Google Search');
              break;
            case 2:
              expect(req.body).to.have.property('answer', 'My employer is');
          }
        }
        stepNumber++;
      }
    );
    cy.get('[data-testid=btn-next]').click();
    //selects option 1
    cy.get('[data-testid=option-1]').click();
    // //it checks if the right option is selected
    cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
    // //clicks on next button
    // stepNumber = 1;
    cy.get('[data-testid=btn-next]').click();

    // //selects option 2
    cy.get('[data-testid=option-2]').click();
    // //it checks if the right option is selected
    cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
    // stepNumber = 2;
    // //clicks on next button
    cy.get('[data-testid=btn-next]').click();
    // //selects option 3
    // cy.get('[data-testid=option-3]').click();
    // //it checks if the right option is selected
    // cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');

    // //clicks on next button
    // cy.get('[data-testid=btn-next]').click();
    // cy.get('[data-testid=check-2').click();
    // cy.get('[data-testid=check-2').find('input[type="checkbox"]').should('be.checked');
    // cy.get('[data-testid=btn-next]').click();
    // //type economics and press enter
    // cy.get('#create-select').find('input[type="text"]').type('Economics {enter} ');
    // //type hiring and press enter
    // cy.get('#create-select').find('input[type="text"]').type('Hiring {enter} ');
    // //check if fields are selected
    // cy.get('#create-select').contains('Hiring');
    // cy.get('#create-select').contains('Economics');
    // //click next
    // cy.get('[data-testid=btn-next]').click();
    // cy.get('[data-testid=btn-next]').click();
    // //calls command to test form
    // cy.form();

    // cy.get('[data-testid=current-company]').contains('Adobe').should('have.text', 'Adobe');
    // cy.get('[data-testid=btn-submit]').click();
  });
});
