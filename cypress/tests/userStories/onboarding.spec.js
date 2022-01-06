// Each it block should mnatch a container element by its test id

describe('When a user visits the home page of a cohort for the first time', () => {
  it('Opens an onboarding modal')

  describe('Page 1', () => {
    it('Displays a "Personal Details" form', {
      // Assert title
      // Assert description
      // Assert pressense of inputs 
    });

    it('Prefills inputs with existing user details', {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', {
      // Enter new details for each
    });

    context('If any input is empty', {
      it('Displays a disabled “Next” button', {});
    })

    context('If all inputs are filled', {
      it('Allows users to navigate to the next page through the “Next” button', {});
    })
  });

  describe('Page 2', () => {
    it('Displays a "Company Details" form', {
      // Assert title
      // Assert description
      // Assert pressense of inputs 
    });

    it('Prefills inputs with existing user details', {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', {
      // Click previous button to navigate to previous page
      // Assert title
      // Click "Next"
      // Assert title
    });

    context('If any input is empty', {
      it('Displays a disabled “Next” button', {});
    })

    context('If all inputs are filled', {
      it('Allows users to navigate to the next page through the “Next” button', {});
    })
  });

  describe('Page 3', () => {
    it('Displays a "Networking Preferences" form', {
      // Assert title
      // Assert description
      // Assert pressense of inputs 
    });

    it('Prefills inputs with existing user details', {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', {
      // Click previous button to navigate to previous page
      // Assert title
      // Click "Next"
      // Assert title
    });

    context('If any input is empty', {
      it('Displays a disabled “Next” button', {});
    })

    context('If all inputs are filled', {
      it('Allows users to navigate to the next page through the “Next” button', {});
    })
  });

  describe('Page 4', () => {
    it('Displays a "House Keeping" form', {
      // Assert title
      // Assert description
      // Assert pressense of inputs 
    });

    it('Prefills inputs with existing user details', {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', {
      // Click previous button to navigate to previous page
      // Assert title
      // Click "Next"
      // Assert title
    });

    context('If any input is empty', {
      it('Displays a disabled “Next” button', {});
    })

    context('If all inputs are filled', {
      it('Allows users to submit their onboarding details through the “Submit” button', {
        // Press Submit 
        // Assert the api is called with all the correct details
        // Assert Home page is opened
      });
    })
  });

});
