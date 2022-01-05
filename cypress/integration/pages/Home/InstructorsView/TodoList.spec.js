describe('Home > CohortGuides', () => {
  it('Displays a to do items tab', () => {});
  it('Displays correct session number', () => {});
  it('Displays a circular progress bar', () => {});
  it('Displays correct list of todo items', () => {});
  it('Displays 2 two items for each session', () => {});

  it('Displays Distribution Playbook item', () => {});
  it('Displays due date a week before first session', () => {});

  it('Displays Zoom Setup Guide item', () => {});
  it('Displays due date a week before first session', () => {});

  it('Displays Platform Tour', () => {});
  it('Displays due date a week before first session', () => {});

  context('When Slides are not uploaded', () => {
    it('Displays due date one day before session date', () => {});
    it('Displays blue right icon', () => {});
    it('clicking on right icon redirect to session spage with resources tab open', () => {});
  });

  context('When Slides are not uploaded and due date is today', () => {
    it('Displays due date today', () => {});
    it('Displays due date in red color', () => {});
    it('Displays red right icon', () => {});
    it('clicking on right icon redirect to session spage with resources tab open', () => {});
  });

  context('When Slides are uploaded', () => {
    it('Displays complete message', () => {});
    it('Displays green check mark for complete item', () => {});
  });

  context('When Materials are not uploaded', () => {
    it('Displays due date two days before session date', () => {});
    it('Displays blue right icon', () => {});
    it('clicking on right icon redirect to session spage with resources tab open', () => {});
  });

  context('When Materials are not uploaded and due date is today', () => {
    it('Displays due date today', () => {});
    it('Displays due date in red color', () => {});
    it('Displays red right icon', () => {});
    it('clicking on right icon redirect to session spage with resources tab open', () => {});
  });

  context('When Materials are uploaded', () => {
    it('Displays complete message', () => {});
    it('Displays green check mark for complete item', () => {});
  });
});
