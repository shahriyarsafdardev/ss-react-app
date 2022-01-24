import sessionFixture from '../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../fixtures/login/login.json';
describe('Sessions > Resources', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`)
    .should('be.visible')
    .click();
    //cy.visit(`/cohorts/${sessionFixture.cohort_id}/sessions`);
    cy.get('[data-testid=session-resources]').click({ force: true });
  });

  context('When session resources are not uploaded', () => {
    it('Displays correct text in message', () => {
      cy.get('[data-testid=session-description]').then((description) => {
        const html = description.html();
        expect(html).to.eq(sessionFixture.sessions[0].description);
      });
    });
  });

  context('When session resources are uploaded', () => {
    it('Displays correct session description', () => {
      cy.get('[data-testid=session-description]').then((description) => {
        const html = description.html();
        expect(html).to.eq(sessionFixture.sessions[0].description);
      });
    });
  });
});
