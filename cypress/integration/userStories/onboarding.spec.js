// Each it block should mnatch a container element by its test id
import home_refactored from '../../fixtures/onboarding/home_refactored.json'
import save_user_profile from '../../fixtures/onboarding/saveUserProfileRefactored.json'
const serverUrl = Cypress.env('serverUrl');

describe('When a user visits the home page of a cohort for the first time', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
  });

  it('Opens an onboarding modal',() => {
    cy.get('[data-testid="onboarding-form-modal"]')
      .should('be.visible')
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
      cy.get('[data-testid="user-country"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="user-city"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="user-pronoun-label"]')
      .should('be.visible')
      cy.get('[data-testid="user-linkedIn-url"]')
      .should('be.visible')
      cy.get('[data-testid="profile-url"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
      cy.get('[data-testid="user-first-name"]')
      .should('be.visible')
      .and("have.attr", "value", home_refactored.participant_profile.first_name)
      cy.get('[data-testid="user-last-name"]')
      .should('be.visible')
      .and("have.attr", "value", home_refactored.participant_profile.last_name)
      cy.get('[data-testid="user-country"]')
      .and("have.attr", "value", home_refactored.participant_profile.country)
      cy.get('[data-testid="user-city"]')
      .and("have.attr", "value", home_refactored.participant_profile.city)
      cy.get('[data-testid="profile-url"]')
      .should('be.visible')
      .and("have.attr", "src", home_refactored.participant_profile.profile_image_url)
    });

    it('Allows users to update or enter new details', () => {
      // Enter new details for each
      cy.get('[data-testid="user-first-name"]')
      .should('be.visible')
      .clear()
      .type('New Name')
      .and("have.attr", "value", 'New Name')
      cy.get('[data-testid="user-last-name"]')
      .should('be.visible')
      .clear()
      .type('New Name')
      .and("have.attr", "value", 'New Name')
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {
        cy.get('[data-testid="user-first-name"]')
        .should('be.visible')
        .clear()
        cy.get('[data-testid="btn_next"]')
        .should('be.visible')
        .and("have.attr", "disabled")
      });
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button', () => {
        cy.get('[data-testid="btn_next"]')
        .should('be.visible').click()
        cy.get('[data-testid="onboard-title"]')
        .should('be.visible')
        .and('contain','Where do you work?')
      });
    })
  });

  describe('Page 2', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
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
      cy.get('[data-testid="company-industry"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="company-employees"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
      cy.get('[data-testid="company-name"]')
      .should('be.visible')
      .children().eq(1)
      .and("contain", home_refactored.participant_profile.current_company)
      cy.get('[data-testid="company-logo"]')
      .children().eq(0)
      .children().eq(0)
      .children().eq(0)
      .children().eq(1)
      .and("have.attr", "src", home_refactored.participant_profile.company_logo_url)
      cy.get('[data-testid="company-industry"]')
      .and("have.attr", "value", home_refactored.participant_profile.current_industry_category_selections[0])
      cy.get('[data-testid="company-employees"]')
      .and("have.attr", "value", home_refactored.participant_profile.number_of_employees)
    });

    it('Allows users to update or enter new details', () => {
      
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons',() =>  {
      // Click previous button to navigate to previous page
      cy.contains('button', 'Previous').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Build Your Profile')
      // Click "Next"
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Where do you work?')
    });

    context('If any input is empty',() => {
      it('Displays a disabled “Next” button',() => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button', () => {
        cy.get('[data-testid="btn_next"]')
        .should('be.visible')
        .click()
        cy.get('[data-testid="onboard-title"]')
        .should('be.visible')
        .and('contain','Tell us about your current role?')
      });
    })
  });

  describe('Page 3', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
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
      cy.get('[data-testid="role-categories"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="role-manage"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="role-responsibilities"]')
      .should('be.visible')
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
      cy.get('[data-testid="role-title"]')
      .and("have.attr", "value", home_refactored.participant_profile.current_company)
      cy.get('[data-testid="role-categories"]')
      .and("have.attr", "value", home_refactored.participant_profile.current_role_category_selections[0])
      cy.get('[data-testid="role-manage"]')
      .and("have.attr", "value", "Yes")
      cy.get('[data-testid="role-responsibilities"]')
      .and("contain", home_refactored.participant_profile.bio_text)
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
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Tell us about your current role?')
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {});
    })

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button',() =>{
        cy.get('[data-testid="btn_next"]')
        .should('be.visible')
        .click()
        cy.get('[data-testid="onboard-title"]')
        .should('be.visible')
        .and('contain','Networking Preferences')
      });
    })
  });

  describe('Page 4', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
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
      cy.get('[data-testid="network-roles"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="network-industeries"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="network-fellow-member"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
    });

    it('Prefills inputs with existing user details', () => {
      // Assert input values using fixture data
      cy.get('[data-testid="network-roles"]')
      .and("have.attr", "value", home_refactored.participant_profile.networking_roles_categories[0])
      cy.get('[data-testid="network-industeries"]')
      .and("have.attr", "value", home_refactored.participant_profile.networking_industries_categories[0])
      cy.get('[data-testid="network-fellow-member"]')
      .and("have.attr", "value", "Yes")
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
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      // Assert title
      cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Networking Preferences')
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {});
    });

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button',() =>{
        cy.get('[data-testid="btn_next"]')
        .should('be.visible')
        .click()
        cy.get('[data-testid="onboard-title"]')
      .should('be.visible')
      .and('contain','Housekeeping Questions')
      });
    });
  });

  describe('Page 5', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
      cy.get('[data-testid="btn_next"]').should('be.visible').click()
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
      cy.get('[data-testid="housekeeping-cohort-tpoic"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="housekeeping-about-cohort"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
      cy.get('[data-testid="housekeeping-payment"]').then(($el)  => {
        Cypress.dom.isVisible($el)
      })
    });

    it('Prefills inputs with existing user details',() => {
      // Assert input values using fixture data
      cy.get('[data-testid="housekeeping-dob"]')
      .children().eq(0)
      .children().eq(1)
      .children().eq(0)
      .and("have.attr", "value", home_refactored.participant_profile.date_of_birth)
      cy.get('[data-testid="housekeeping-cohort-tpoic"]')
      .and("have.attr", "value", home_refactored.participant_profile.current_understanding)
      cy.get('[data-testid="housekeeping-about-cohort"]')
      .and("have.attr", "value", home_refactored.participant_profile.referred_by)
      cy.get('[data-testid="housekeeping-payment"]')
      .and("have.attr", "value", home_refactored.participant_profile.payed_by)
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
       cy.get('[data-testid="btn_next"]').should('be.visible').click()
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
        cy.fixture('/../fixtures/onboarding/saveUserProfileRefactored.json').as('save_user_profile');
        cy.route('POST',`${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/submit_onboarding_answers.json` ,'@save_user_profile')
        .as('submit');
        // Press Submit
        cy.get('[data-testid="btn_next"]')
        .should('be.visible')
        .click()
        // Assert the api is called with all the correct details
        cy.wait('@submit')
        cy.get('@submit').then((xhr) => {
          expect(xhr.response.body.first_name).to.eq(home_refactored.participant_profile.first_name);
          expect(xhr.response.body.last_name).to.eq(home_refactored.participant_profile.last_name);
          expect(xhr.response.body.email).to.eq(home_refactored.participant_profile.email);
          expect(xhr.response.body.linkedin_url).to.eq(home_refactored.participant_profile.linkedin_url);
          expect(xhr.response.body.country).to.eq(home_refactored.participant_profile.country);
          expect(xhr.response.body.city).to.eq(home_refactored.participant_profile.city);
          expect(xhr.response.body.number_of_employees).to.eq(home_refactored.participant_profile.number_of_employees);
          expect(xhr.response.body.discord_url).to.eq(home_refactored.participant_profile.discord_url);
          expect(xhr.response.body.current_position).to.eq(home_refactored.participant_profile.current_position);
          expect(xhr.response.body.current_company).to.eq(home_refactored.participant_profile.current_company);
          expect(xhr.response.body.preferred_pronoun).to.eq(home_refactored.participant_profile.preferred_pronoun);
          expect(xhr.response.body.profile_image_url).to.eq(home_refactored.participant_profile.profile_image_url);
          expect(xhr.response.body.company_logo_url).to.eq(home_refactored.participant_profile.company_logo_url);
          expect(xhr.response.body.current_industry_category_selections[0]).to.eq(home_refactored.participant_profile.current_industry_category_selections[0]);
          expect(xhr.response.body.current_role_category_selections[0]).to.eq(home_refactored.participant_profile.current_role_category_selections[0]);
          expect(xhr.response.body.do_manage_team).to.eq(home_refactored.participant_profile.do_manage_team);
          expect(xhr.response.body.interested_in_being_matched).to.eq(home_refactored.participant_profile.interested_in_being_matched);
          expect(xhr.response.body.networking_roles_categories[0]).to.eq(home_refactored.participant_profile.networking_roles_categories[0]);
          expect(xhr.response.body.networking_industries_categories[0]).to.eq(home_refactored.participant_profile.networking_industries_categories[0]);
          expect(xhr.response.body.current_understanding).to.eq(home_refactored.participant_profile.current_understanding);
          expect(xhr.response.body.referred_by).to.eq(home_refactored.participant_profile.referred_by);
          expect(xhr.response.body.payed_by).to.eq(home_refactored.participant_profile.payed_by);
          expect(xhr.response.body.date_of_birth).to.eq(home_refactored.participant_profile.date_of_birth);
          expect(xhr.response.body.opted_in_for_matching_suggestions).to.eq(home_refactored.participant_profile.opted_in_for_matching_suggestions);
        })
        // Assert Home page is opened
        cy.url()
        .should('include', 'home')
        cy.get('[data-testid="dashboard-navbar-home"]')
        .should('be.visible')
      });
    })
  });
});
