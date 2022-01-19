import sessionFixture from '../../../fixtures/session/sessions.json';
describe('Sessions > Summary', () => {
  before(() => {
    cy.server();
    cy.login({});
    cy.visit(`/cohorts/${sessionFixture.cohort_id}/sessions`);
    cy.get('[data-testid=session-notes]')
    .click({ force: true });
  });

  context('When session summary is added', () => {
    it('Displays correct session summary', () => {
      cy.get('[data-testid=summary-notes] > p')
      .should('contain',sessionFixture.sessions[0].summary.slice(3, -4)
      );
    });
  });

  context('When a summary is not present', () => {
    it('Displays correct text in message', () => {
      cy.get('[data-testid=session-list-2]')
      .click({ multiple: true, force: true });
      cy.get('[data-testid=session-message]')
      .should('be.visible')
      .and('contain','The session summary will be available shortly after this session.');
    });
  });
});
