import sessionFixture from '../../../fixtures/session/sessions.json';
describe('Sessions > Slides', () => {
  before(() => {
    cy.server();
    cy.login();
    cy.get('#sessions-1').click({ multiple: true, force: true });
    cy.get('[data-testid=session-slides]').click({ force: true })
    cy.wait(5000)
  });

  context('When the session slides are not uploaded', () => {
    it('Displays correct text in message', () => {});
  });

  context('When the session slides are uploaded', () => {
    it('Displays pdf slides viewer', () => {
      cy.get('[data-testid=session-pdf-slides]')
      .should('be.visible')
    });
    it('Displays navigation buttons', () => {
      cy.get('[data-testid=slides-left]')
      .should('be.visible')
      cy.get('[data-testid=slides-right]')
      .should('be.visible')
    });
    it('Slides to next page when rigth button is clicked', () => {
      cy.get('[data-testid=slides-left]')
      .should('be.visible')
      .click()
    });
    it('Slides to previous page when left button is clicked', () => {
      cy.get('[data-testid=slides-right]')
      .should('be.visible')
      .click()
    });
    it('Displays full screen button', () => {
      cy.get('[data-testid=slides-full-screen]')
      .should('be.visible')
    });
  });

  context('When slides are uploaded and downloadable', () => {
    it('Displays the download button', () => {});
  });

  context('When slides are uploaded and not downloadable', () => {
    it('Dos not display the download button', () => {});
  });
});
