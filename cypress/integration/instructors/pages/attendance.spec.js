describe('Attendance Tab', () => {
  context('When no session has started', () => {
    it('Displays empty cohort overview section', () => {
    });
    it('Displays empty participant overview section', () => {
    });
  });
  context('When a session is completed', () => {
    it('Displays graph in cohort overview section', () => {
    });
    it('Displays all sessions number in cohort overview section', () => {
    });
    it('Displays live attendance text in cohort overview section', () => {
    });
    it('Displays live or async attendance text in cohort overview section', () => {
    });
    context('When there are no participants', () => {
      it('Displays empty Participant overview section', () => {
      });
    });
    context('When there are participants are there', () => {
      it('Displays all name of participant with position in participant overview section', () => {
      });
      it('Displays all session number in participant overview section', () => {
      });
      it('Displays a green tick if user has attended that specific session live', () => {
      });
      it('Displays a yellow dot if user has viewed that specific session recording', () => {
      });
      it('Displays a red cross if user has not attended that specific session live or not viewed that specific session recording', () => {
      });
    });
  });
});
