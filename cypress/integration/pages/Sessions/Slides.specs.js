describe('Sessions > Slides', () => {
  before(() => {
    cy.server();
    cy.login();
    cy.get('#sessions-1').click({ multiple: true, force: true });

  });

  context('When the session slides are not uploaded', () => {
    it('Displays correct text in message', () => {});
  });

  context('When the session slides are uploaded', () => {
    it('Displays pdf slides viewer', () => {});
    it('Displays navigation buttons', () => {});
    it('Slides to next page when rigth button is clicked', () => {});
    it('Slides to previous page when left button is clicked', () => {});
    it('Displays full screen button', () => {});
  });

  context('When slides are uploaded and downloadable', () => {
    it('Displays the download button', () => {});
  });

  context('When slides are uploaded and not downloadable', () => {
    it('Dos not display the download button', () => {});
  });
});
