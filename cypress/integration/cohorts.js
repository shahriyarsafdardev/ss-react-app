const serverUrl = Cypress.env('serverUrl');

describe('login flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
    cy.viewport(1400, 700);
  });

  it('should log user into app', () => {
    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onboarding.json').as('onboardingData');
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

    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);

    cy.get('[data-testid=loginBtn]').click();

    cy.wait('@login');
    cy.wait(3000);
  });
  it('should have correct Credentials', () => {
    cy.get('[alt="Aqib Maqbool"]').click();

    cy.get('[data-testid=user-name]').should('have.text', 'Aqib Maqbool');

    cy.get('[data-testid=user-email]').should('have.text', 'aqibmaqqbool@gmail.com');
  });
  it('should have correct session name for session 1', () => {
    cy.get('[data-testid=session-number]').should('have.text', 'Session 1 | ');

    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 1');
  });
  it('should have correct session name for session 2', () => {
    cy.get('#session-list-1').click({ force: true });

    cy.get('[data-testid=session-number]').should('have.text', 'Session 2 | ');

    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 2');
  });
  it('should have correct session name for session 3', () => {
    cy.get('#session-list-2').click({ force: true });

    cy.get('[data-testid=session-number]').should('have.text', 'Session 3 | ');

    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 3');
  });
});
