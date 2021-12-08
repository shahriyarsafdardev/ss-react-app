describe('Sessions > Summary', () => {
  before(() => {
    cy.server();
    cy.login();
  });

  context('When session summary is added', () => {
    it('Displays correct session summary', () => {});
  });

  context('When a summary is not present', () => {
    it('Displays correct text in message', () => {});
  });
});
