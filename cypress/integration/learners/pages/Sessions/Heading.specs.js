import sessionFixture from '../../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../../fixtures/login/login.json';

describe('Sessions > Heading', () => {
  before(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`)
    .should('be.visible')
    .click();
  });

  it('Displays correct session number', () => {
    cy.get('[data-testid=session-number]').
    should('contain', sessionFixture.sessions[0].number);
  });
  it('Displays correct session title', () => {
    cy.get('[data-testid=session-title]')
    .should('contain', sessionFixture.sessions[0].name);
  });
});
