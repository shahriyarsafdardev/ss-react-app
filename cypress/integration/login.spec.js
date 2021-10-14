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
});
