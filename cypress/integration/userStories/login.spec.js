// Each it block should mnatch a container element by its test id

describe('When a learner logs in', () => {
  context('More than one week before session starts', () => {
    it('Opens the Home#Empty page by default', () => {});
    describe('When the Sessions is selected from the Sidebar', () => {
      it('Opens Sessions#Empty page');
    });
    describe('When the Messaging is selected from the Sidebar', () => {
      it('Opens Messaging#Empty page');
    });
    describe('When the Networking is selected from the Sidebar', () => {
      it('Opens Networking#Empty page');
    });
    describe('When the Q&A is selected from the Sidebar', () => {
      it('Opens Q&A#Empty page');
    });
  });

  context('Less than one week before session starts', () => {
    it('Opens the Home page by default', () => {});
    describe('When the Sessions is selected from the Sidebar', () => {
      it('Opens Sessions page');
    });
    describe('When the Messaging is selected from the Sidebar', () => {
      it('Opens Messaging page');
    });
    describe('When the Networking is selected from the Sidebar', () => {
      it('Opens Networking page');
    });
    describe('When the Q&A is selected from the Sidebar', () => {
      it('Opens Q&A page');
    });
  });
});
