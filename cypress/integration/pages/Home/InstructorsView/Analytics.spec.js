describe('Home > CohortAnalytics', () => {
  context('When Cohort is accepting payments', () => {
    it('Displays a left arrow icon', () => {});
    it('Left arrow icon is disabled', () => {});
    it('Displays a right arrow icon', () => {});
    it('Displays a correct heading', () => {});

    it('Displays correct Earning amount', () => {});
    it('Displays correct Earnings growth rate', () => {});

    it('Displays correct Pipeline amount', () => {});
    it('Displays correct Pipeline growth rate', () => {});

    it('Displays correct Page impressions', () => {});
    it('Displays correct Pipeline impressions increase rate', () => {});

    context('When less than 10 enrollments are paid', () => {
      it('Right Arrow icon is disabled', () => {});
      it('Displays same tab after 10 seconds', () => {});
    });
    context('When 10 or more enrollments are paid', () => {
      it('Right Arrow icon is enabled', () => {});
      it('Displays users companies tab after 10 seconds', () => {});
      it('Clicking Right button moves to companies tab', () => {});
      it('Displays correct heading', () => {});
      it('Disaplays correct companies list', () => {});

      it('Clicking Right button twice moves to countries tab', () => {});
      it('Displays correct heading', () => {});
      it('Disaplays correct countries list', () => {});

      it('Clicking Right button thrice moves to users roles tab', () => {});
      it('Displays correct heading', () => {});
      it('Disaplays correct user roles list', () => {});

      it('Clicking Right button four times moves to industries tab', () => {});
      it('Displays correct heading', () => {});
      it('Disaplays correct industries list', () => {});
    });
  });
  context('When Cohort is not accepting payments', () => {
    it('Displays cohort timeline tab', () => {});
  });
});
