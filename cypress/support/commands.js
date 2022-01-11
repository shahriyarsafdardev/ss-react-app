Cypress.Commands.add('login', ({cohortspath = 'cohorts/cohorts.json', loginpath = 'login/login.json',
sessionpath = 'session/sessions.json', onboardingpath = 'session/onboarding.json',
sessionmaterialspath = 'session/session_materials.json', peerpath = 'peer/peers.json',
homepath = 'onboarding/home_refactored.json'}) => {
  const serverUrl = Cypress.env('serverUrl');
  cy.fixture(cohortspath).as('cohortsData');
  cy.fixture(loginpath ).as('loginData');
  cy.fixture(sessionpath).as('sessionData');
  cy.fixture(onboardingpath).as('onboardingData');
  cy.fixture(sessionmaterialspath ).as('sessionMaterials');
  cy.fixture(peerpath).as('peers');
  cy.fixture(homepath).as('homeData');
  cy.route('GET', `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0&participant_id=5386e36b-0f15-4d39-b698-41e6672ec2c0`, '@homeData').as('home');
  cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
  cy.route(
    'GET',
    `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
    '@sessionData'
  ).as('sessions');
  cy.route(
    'GET',
    `${serverUrl}/cohort_sessions/d1aa12c2-7658-4490-8fab-ec2b5187fe13/session_materials.json`,
    '@sessionMaterials'
  ).as('sessionmaterials');
  cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
  cy.route(
    'GET',
    `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/onboarding_complete.json`,
    '@onboardingData'
  ).as('onboarding_complete');
  cy.route(
    'GET',
    `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/peers.json`,
    '@peers'
  ).as('peersData');
  cy.visit('/');
  const email = 'waqasnazir9@gmail.com';
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
