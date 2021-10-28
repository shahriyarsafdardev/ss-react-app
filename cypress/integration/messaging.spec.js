const serverUrl = Cypress.env('serverUrl');

const cohortUrl = 'c46fa46a-afe5-4175-adf0-65ba653cf5c8';
const email = 'waqas@scholar.com';
const password = '123456';

describe('Messaging Tab', () => {
  before(() => {
    cy.server();
    cy.fixture('Messaging/login.json').as('loginData');
    cy.fixture('Messaging/cohorts.json').as('cohortsData');
    cy.fixture('Messaging/sessions.json').as('sessionData');
    cy.fixture('Messaging/onBoarding.json').as('onboardingData');

    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.route('GET', `${serverUrl}/cohorts/${cohortUrl}/sessions.json`, '@sessionData').as(
      'sessions'
    );
    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/${cohortUrl}/onboarding_complete.json`,
      '@onboardingData'
    ).as('onboarding_complete');
  });

  it('should login user', () => {
    cy.visit('/');
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);

    cy.get('[data-testid=loginBtn]').click();

    cy.wait(['@login', '@cohorts', '@sessions', '@onboarding_complete']);
  });

  describe('Chat module', () => {
    context('Direct Chat module', () => {
      before(() => {
        cy.get('#messaging-3').click({
          multiple: true,
          force: true
        });
      });

      it('should open create new chat screen', () => {
        cy.get('[data-testid=create-messaging]').click({ force: true, multiple: true });
      });

      it('should select users from list', () => {
        cy.get('[data-testid=user-1]').click();
      });

      it('should create a chat with selected user', () => {
        cy.get('[data-testid=start-chat]').click();
      });

      it('asserts that user name in header is correct', () => {
        cy.get('[data-testid=user-header-name]').should('have.text', 'Aron Solberg');
      });

      it('asserts that new chat message is correct', () => {
        cy.get('[data-testid=new-chat-user-name]').should('have.text', '@Aron Solberg');
      });

      it('should type a message and send it to user', () => {
        cy.get('.str-chat__textarea__textarea').type('Hello there');
        cy.get('[data-testid=send-chat]').click({ force: true });
      });

      it('asserts that the message sent is correct', () => {
        cy.get('.str-chat__ul > li').last().contains('Hello there');
      });
    });
  });
});
