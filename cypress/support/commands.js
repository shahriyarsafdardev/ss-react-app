Cypress.Commands.add('login', () => {
  const serverUrl = Cypress.env('serverUrl');
  cy.fixture('cohorts/cohorts.json').as('cohortsData');
  cy.fixture('login/login.json').as('loginData');
  cy.fixture('session/sessions.json').as('sessionData');
  cy.fixture('session/onboarding.json').as('onboardingData');
  cy.fixture('session/session_materials.json').as('sessionMaterials');
  cy.fixture('peer/peers.json').as('peers');
  cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
  cy.route(
    'GET',
    `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
    '@sessionData'
  ).as('sessions');
  cy.route('GET', `${serverUrl}/cohort_sessions/d1aa12c2-7658-4490-8fab-ec2b5187fe13/session_materials.json`, '@sessionMaterials').as('sessionmaterials');
  cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
  cy.route(
    'GET',
    `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/onboarding_complete.json`,
    '@onboardingData'
  ).as('onboarding_complete');
  cy.route('GET', `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/peers.json`, '@peers').as('peersData');
  cy.visit('/');
  const email = 'waqas@scholar.com';
  const password = '123456';
  cy.get('[data-testid=email]').type(email);
  cy.get('[data-testid=password]').type(password);

  cy.get('[data-testid=loginBtn]').click();

  cy.wait(['@login', '@cohorts', '@sessions', '@onboarding_complete']);
});
Cypress.Commands.add('form', () => {
  cy.get('[data-testid=first-name]').should('have.value', 'Aqib');
  cy.get('[data-testid=last-name]').should('have.value', 'Maqbool');
  cy.get('[data-testid=current-position]').should('have.value', 'Economist');
  cy.get('[data-testid=linkedin-url]').should(
    'have.value',
    'https://linkedin.com/aqibmaqqbool_react_dev'
  );
});
