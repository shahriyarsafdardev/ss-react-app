import sessionFixture from '../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../fixtures/login/login.json';

Cypress.Commands.add('getNumber', () => {
  return cy.get('[data-testid=session-number]');
});
Cypress.Commands.add('getTitle', () => {
  return cy.get('[data-testid=session-title]');
});

describe('Sessions > Heading', () => {
  before(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`)
    .should('be.visible')
    .click();
    //cy.visit(`/cohorts/${sessionFixture.cohort_id}/sessions`);
  });

  it('Displays correct session number', () => {
    cy.getNumber().
    should('contain', sessionFixture.sessions[0].number);
  });
  it('Displays correct session title', () => {
    cy.getTitle()
    .should('contain', sessionFixture.sessions[0].name);
  });
});
