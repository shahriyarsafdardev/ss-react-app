import sessionFixture from '../../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../../fixtures/login/login.json';

Cypress.Commands.add('loadSlides', (sessionurl) => {
  cy.intercept('GET', sessionurl).as('getSlides')
  cy.wait('@getSlides')
});

describe('Sessions > Slides', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`)
    .should('be.visible')
    .click({ force: true });
  });

  context('When the session slides are not uploaded', () => {
    beforeEach(() => {
      cy.get('[data-testid=session-list-title-1]').first()
      .click({ force: true });
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
    });
    it('Displays correct text in message', () => {
      cy.get('[data-testid="session-message"]')
      .should('be.visible')
      .and('contain','The presentation slides will be available shortly after this session.')
    });
  });

  context('When the session slides are uploaded', () => {
    beforeEach(() => {
      cy.get('[data-testid=session-list-title-0]').first()
      .click({ force: true });
    });
    it('Displays pdf slides viewer', () => {
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
      cy.get('[data-testid=session-pdf-slides]')
      .should('be.visible')
    });
    it('Displays navigation buttons', () => {
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
      cy.get('[data-testid=slides-right]')
      .should('be.visible')
      cy.get('[data-testid=slides-left]')
      .should('be.visible')
    });
    it('Slides to previous page when right button is clicked', () => {
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
      cy.get('[data-testid=slides-right]')
      .should('be.visible')
      .click({ multiple: true, force: true });
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
    });
    it('Slides to next page when left button is clicked', () => {
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
      cy.get('[data-testid=slides-left]')
      .should('be.visible')
      .click({ multiple: true, force: true });
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
    });
    it('Displays full screen button', () => {
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
      cy.get('[data-testid=slides-full-screen]')
      .should('be.visible')
    });
  });

  context('When slides are uploaded and downloadable', () => {
    it('Displays the download button', () => {
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
      cy.loadSlides(sessionFixture.sessions[0].presentation_pdf_url)
      cy.get('[data-testid="pdf-download-button"]').should('be.visible')
    });
  });

  context('When slides are uploaded and not downloadable', () => {
    beforeEach(() => {
      cy.get('[data-testid=session-list-title-2]').first()
      .click({ force: true });
      cy.get('[data-testid=session-slides]')
      .click({ force: true })
    });
    it('Dos not display the download button', () => {
      cy.loadSlides(sessionFixture.sessions[2].presentation_pdf_url)
      cy.get('[data-testid="pdf-download-button"]').should('not.exist')
    });
  });
});
