describe('Home > To do', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });

  it('Displays a to do tab', () => {});

  context('When there is an upcoming session', () => {
    it('Displays a get ready text for the next session', () => {});
    it('Displays a circular progress bar for that session', () => {});
    it('Displays a session description', () => {});

    context('When a session has pre-reading materials', () => {
      it('Displays a pre-reading row for each material', () => {});
      // In this one assertion we want to assert that the following are shown:
      // The name
      // The publisher
      // Open link
      // The checkbox (both one that is checked and one that is not checked)

      it('Allows a user to mark and unmark materials as complete', () => {});
      // click and item
      // assert that progress bar has changed
      // assert that backend call was made
      // uncheck an item
      // assert that progress bar has changed
      // assert that backend call was made

      context('When all the pre-reading materials are completed', () => {
        it('Displays a text all ready for session', () => {});
      });
    });

    context('When current time is less than one hour before any session', () => {
      it('Displays starting time of the session', () => {});
      it('Displays time remaining in session to start', () => {});
      it('Displays a join zoom button', () => {}); //also verify the link to zoom meeting in this spec
    });
  });

  context('When there are no more upcoming sessions', () => {});
});
