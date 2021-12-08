describe('Home > To do', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });
  it('Displays a to do tab', () => {});
  context('When current time is one hour or more before any session', () => {
    it('Displays a get ready text for a session', () => {});
    it('Displays a circular progress bar for that session', () => {});
    context('When a session consists session description', () => {
      it('Displays a session description', () => {});
    });
    context('When a session consists of pre-reading materail', () => {
      it('Displays a pre-reading material', () => {});
      it('Displays a check box with pre-reading material', () => {});
      it('Displays a open button with pre-reading material', () => {});  //also verify the link to pre-reading material this spec
      context('When any check box is not checked', () => {
        it('Displays a circular progress bar with 0 count', () => {});
      });
      context('When any check box is checked', () => {
        it('Displays a circular progress bar with 1 count', () => {});
      });
      context('When all the pre-reading materials are completed', () => {
        it('Displays a text all ready for session', () => {});
      });
    });
    context('When current time is less than one hour before any session', () => {
      it('Displays starting time of the session', () => {});
      it('Displays time remaining in session to start', () => {});
      it('Displays a join zoom button', () => {});  //also verify the link to zoom meeting in this spec
    });
  });
});
