Cypress.Commands.add('getHeading', () => {
  return cy.get('[data-testid=session-header]');
});

describe('Sessions > Heading', () => {
  before(() => {
    cy.server();
    cy.login();
  });

  it('Displays correct session number', () => {});
  it('Displays correct session title', () => {});
});
