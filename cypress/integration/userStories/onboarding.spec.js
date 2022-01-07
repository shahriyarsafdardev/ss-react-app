// Each it block should mnatch a container element by its test id

describe('When a user visits the home page of a cohort for the first time', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });

  it('Opens an onboarding modal',() => {

  });

  describe('Page 1', () => {
    it('Displays a "Personal Details" form',() => {
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Build Your Profile')
      // Assert description
      cy.get('[data-testid="onboard-header-description"]')
      .should('be.visible')
      // Assert pressense of inputs
      cy.get('[data-testid="user-first-name"]')
      .should('be.visible')
      cy.get('[data-testid="user-last-name"]')
      .should('be.visible')
      cy.get('[data-testid="user-country"]')
      .should('be.visible')
      cy.get('[data-testid="user-city"]')
      .should('be.visible')
      cy.get('[data-testid="user-pronoun-label"]')
      .should('be.visible')
      cy.get('[data-testid="user-linkedIn-url"]')
      .should('be.visible')
      cy.get('[data-testid="user-avatar-upload"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', () => {
      // Enter new details for each
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button', () => {});
    })
  });

  describe('Page 2', () => {
    beforeEach(() => {
      cy.contains('button', 'Next').should('be.visible').click()
    });
    it('Displays a "Company Details" form',() =>  {
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Where do you work?')
      // Assert description
      cy.get('[data-testid="onboard-header-description"]')
      .should('be.visible')
      // Assert pressense of inputs
      cy.get('[data-testid="company-logo"]')
      .should('be.visible')
      cy.get('[data-testid="company-name"]')
      .should('be.visible')
      cy.get('[data-testid="company-industry"]')
      .should('be.visible')
      cy.get('[data-testid="company-employees"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', () => {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons',() =>  {
      // Click previous button to navigate to previous page
      cy.contains('button', 'Previous').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Build Your Profile')
      // Click "Next"
      cy.contains('button', 'Next').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Where do you work?')
    });

    context('If any input is empty',() => {
      it('Displays a disabled “Next” button',() => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button', () => {});
    })
  });

  describe('Page 3', () => {
    beforeEach(() => {
      cy.contains('button', 'Next').should('be.visible').click()
      cy.contains('button', 'Next').should('be.visible').click()
    });
    it('Displays a "Role Info" form',() =>  {
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Tell us about your current role?')
      // Assert description
      cy.get('[data-testid="onboard-header-description"]')
      .should('be.visible')
      // Assert pressense of inputs
      cy.get('[data-testid="role-title"]')
      .should('be.visible')
      cy.get('[data-testid="role-categories"]')
      .should('be.visible')
      cy.get('[data-testid="role-manage"]')
      .should('be.visible')
      cy.get('[data-testid="role-responsibilities"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', () => {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons',() => {
      // Click previous button to navigate to previous page
      cy.contains('button', 'Previous').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Where do you work?')
      // Click "Next"
      cy.contains('button', 'Next').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Tell us about your current role?')
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button',() =>{});
    })
  });

  describe('Page 4', () => {
    beforeEach(() => {
      cy.contains('button', 'Next').should('be.visible').click()
      cy.contains('button', 'Next').should('be.visible').click()
      cy.contains('button', 'Next').should('be.visible').click()
    });
    it('Displays a "Networking Preferences" form',() =>  {
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Networking Preferences')
      // Assert description
      cy.get('[data-testid="onboard-header-description"]')
      .should('be.visible')
      // Assert pressense of inputs
      cy.get('[data-testid="network-roles"]')
      .should('be.visible')
      cy.get('[data-testid="network-industeries"]')
      .should('be.visible')
      cy.get('[data-testid="network-fellow-member"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', () => {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons',() => {
      // Click previous button to navigate to previous page
      cy.contains('button', 'Previous').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Tell us about your current role?')
      // Click "Next"
      cy.contains('button', 'Next').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Networking Preferences')
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button',() =>{});
    })
  });

  describe('Page 5', () => {
    beforeEach(() => {
      cy.contains('button', 'Next').should('be.visible').click()
      cy.contains('button', 'Next').should('be.visible').click()
      cy.contains('button', 'Next').should('be.visible').click()
      cy.contains('button', 'Next').should('be.visible').click()
    });
    it('Displays a "House Keeping" form',() => {
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Housekeeping Questions')
      // Assert description
      cy.get('[data-testid="onboard-header-description"]')
      .should('be.visible')
      // Assert pressense of inputs
      cy.get('[data-testid="housekeeping-dob"]')
      .should('be.visible')
      cy.get('[data-testid="housekeeping-cohort-tpoic"]')
      .should('be.visible')
      cy.get('[data-testid="housekeeping-about-cohort"]')
      .should('be.visible')
      cy.get('[data-testid="housekeeping-payment"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details',() => {
      // Assert input values using fixture data
    });

    it('Allows users to update or enter new details', () => {
      // Enter new details for each
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', () => {
       // Click previous button to navigate to previous page
       cy.contains('button', 'Previous').should('be.visible').click()
       // Assert title
       cy.get('[data-testid="onboard-title"]')
       .should('be.visible')
       .and('contain','Networking Preferences')
       // Click "Next"
       cy.contains('button', 'Next').should('be.visible').click()
       // Assert title
       cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Housekeeping Questions')
    });

    context('If any input is empty',() => {
      it('Displays a disabled “Next” button',() => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to submit their onboarding details through the “Submit” button',() => {
        // Press Submit
        // Assert the api is called with all the correct details
        // Assert Home page is opened
      });
    })
  });
});
