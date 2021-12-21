import sessionFixture from '../../../fixtures/session/sessions.json';

Cypress.Commands.add('getNumber', () => {
  return cy.get('[data-testid=session-number]');
});
Cypress.Commands.add('getTitle', () => {
  return cy.get('[data-testid=session-title]');
});

describe('Sessions > Heading', () => {
  before(() => {
    cy.server();
    cy.login();
    cy.visit(`/cohorts/${sessionFixture.cohort_id}/sessions`);
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
