const serverUrl = Cypress.env('serverUrl');

describe('login flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('should log user into app', () => {
    cy.login();
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
