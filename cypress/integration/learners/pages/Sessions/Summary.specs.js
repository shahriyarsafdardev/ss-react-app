import sessionFixture from '../../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../../fixtures/login/login.json';

describe('Sessions > Summary', () => {
  before(() => {
    cy.server();
    cy.login({});
    cy.get(
      `[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`
    )
      .should('be.visible')
      .click({ force: true });
  });

  context('When session summary is added', () => {
    it('Displays correct session summary', () => {
      cy.get('[data-testid=session-notes]').click({ force: true });
      cy.get('[data-testid=summary-notes] > p').should(
        'contain',
        sessionFixture.sessions[0].summary.slice(3, -4)
      );
    });
  });

  context('When a summary is not present', () => {
    it('Displays correct text in message', () => {
      cy.get('[data-testid=session-list-title-2]').first().click({ multiple: true, force: true });
      cy.get('[data-testid=session-notes]').click({ force: true });
      cy.get('[data-testid=session-message]')
        .should('be.visible')
        .and('contain', 'The session summary will be available shortly after this session.');
    });
  });
});
