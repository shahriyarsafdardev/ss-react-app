describe('Sessions > Summary', () => {
  before(() => {
    cy.server();
    cy.login();
    cy.get('#sessions-1').click({ multiple: true, force: true });
  });

  context('When session summary is added', () => {
    it('Displays correct session summary', () => {});
  });

  context('When a summary is not present', () => {
    it('Displays correct text in message', () => {});
  });
});
