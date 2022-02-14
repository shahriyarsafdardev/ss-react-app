
describe('Company User Type Login', () => {
  it('Displays ScholarSite header', () => {
    //Assert ScholarSite header
    //Assert Business Dashboard header
  });
  it('Displays Dashboard header', () => {
    //Assert Dashboard header
  });
  it('Displays My Wallet, New Enrollments and History section', () => {
    //Assert My Wallet section header
    //Assert New Enrollments section header
    //Assert History section header
  });
  context('when there is no data on dashboard', () => {
    it('Displays empty My Wallet section', () => {
      //Assert empty section placeholder for my wallet section
    });
    it('Displays empty New Enrollments section', () => {
      //Assert empty section placeholder for New Enrollments section
    });
    it('Displays empty History section', () => {
      //Assert empty section placeholder for History section
    });
  });
  context('when there is data on dashboard', () => {
    it('Displays data My Wallet section', () => {
      //Assert credits in My Wallet
      //Assert Credits label
      //Assert Top Up Credits button
    });
    describe('New Enrollments section', () => {
      it('Displays data in New Enrollments section', () => {
        //Assert correct count to new enrollments
        //Assert Display of all new enrollments
      });
      it('Displays information on a new enrollment', () => {
        //Assert enrollment date
        //Assert user name with text "want to attend"
        //Assert cohort title
        //Assert credits amount
        //Assert Approve button
        //Assert Reject button
      });
    });

    describe('History section', () => {
      it('Displays data in History section', () => {
        //Assert Display of all History records
      });
      it('Displays information on a new enrollment', () => {
        //Assert date
        //Assert user name with text "attended"
        //Assert cohort title
        //Assert credits amount
      });
    });
  });
});
