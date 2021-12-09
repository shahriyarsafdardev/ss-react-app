describe('Sessions > Resources', () => {
  before(() => {
    cy.server();
    cy.login();
    cy.get('#sessions-1').click({ multiple: true, force: true });

  });

  context('When session resources are not uploaded', () => {
    it('Displays correct text in message', () => {});
  });

  context('When session resources are uploaded', () => {
    it('Displays correct session description', () => {});
  });
});
