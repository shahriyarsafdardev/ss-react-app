const serverUrl = Cypress.env('serverUrl');

describe('login flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('should log user into app', () => {
    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('cohorts/login.json').as('loginData');

    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');

    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);

    cy.get('[data-testid=loginBtn]').click();

    cy.wait('@login');
  });
});
