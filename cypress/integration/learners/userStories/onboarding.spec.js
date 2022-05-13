import home_refactored from '../../../fixtures/onboarding/home_refactored.json';
import login_fixture from '../../../fixtures/login/login.json';
const dayjs = require('dayjs');
const serverUrl = Cypress.env('serverUrl');

describe('When a user visits the home page of a cohort for the first time', () => {
  beforeEach(() => {
    cy.server();
    cy.login({ onboardingpath: 'session/onboarding_not_completed.json' });
    cy.fixture('/FieldsData/selectFieldsData.json').as('fieldData');
    cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldData').as('field');
  });

  it('Opens an onboarding modal', () => {
    cy.get('[data-testid="onboarding-form-modal"]').should('be.visible');
  });

  describe('Page 1', () => {
    it('Displays the Calendar Instructions', () => {
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your calendar');
      cy.get('[data-testid="onboard-header-description"]').should('be.visible');
      cy.get('[data-testid="google-calendar-instructions"]').should('be.visible');
      // .click()
      // cy.get('[data-testid="web-google-calendar-instructions"]')
      // .should('be.visible')
      // .and('contains', 'On Web')
      cy.get('[data-testid="apple-calendar-instructions"]').should('be.visible');
      cy.get('[data-testid="outlook-instructions"]').should('be.visible');
    });
  });

  describe('Page 2', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click({ force: true });
    });
    it('Displays a "Understanding Your Goals" form', () => {
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your goals');
      cy.get('[data-testid="onboard-header-description"]').should('be.visible');
      cy.get('[data-testid="role-title"]').should('be.visible');
      cy.get('[data-testid="goals"]').should('be.visible');
      cy.get('[data-testid="improvements"]').should('be.visible');
    });

    it('Prefills inputs with existing user details', () => {
      cy.get('[data-testid="company-name-input"]')
        .should('be.visible')
        .children()
        .eq(1)
        .children()
        .eq(0)
        .and('have.attr', 'value', home_refactored.participant_profile.current_company);
      cy.get('[data-testid="role-title"]').and(
        'have.attr',
        'value',
        home_refactored.participant_profile.current_position
      );
    });

    it('Allows users to update or enter new details', () => {
      cy.get('[data-testid="company-name-input"]').should('be.visible').click();
      cy.contains('div', 'Amazon').click();
      cy.get('[data-testid="role-title"]').clear().type('Test');
      cy.get('[data-testid="goals"]').clear().type('Test');
      cy.get('[data-testid="improvements"]').clear().type('Test');
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', () => {
      cy.contains('button', 'Previous').should('be.visible').click();
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your calendar');
      cy.get('[data-testid="btn_next"]').should('be.visible').click();
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your goals');
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {
        cy.get('[data-testid="company-name-dropdown"]').type('{backspace}');
        cy.get('[data-testid="role-title"]').type('{backspace}');
        cy.get('[data-testid="goals"]').type('{backspace}');
        cy.get('[data-testid="improvements"]').type('{backspace}');
        cy.get('[data-testid="btn_next"]').and('have.attr', 'disabled');
      });
    });

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button', () => {
        cy.get('[data-testid="company-name-input"]').should('be.visible').click();
        cy.contains('div', 'Amazon').click();
        cy.get('[data-testid="role-title"]').clear().type('test');
        cy.get('[data-testid="goals"]').type('test');
        cy.get('[data-testid="improvements"]').type('test');
        cy.get('[data-testid="btn_next"]').should('be.visible').click();
        cy.get('[data-testid="onboard-title"]')
          .should('be.visible')
          .and('contain', 'housekeeping questions');
      });
    });
  });

  describe('Page 3', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click({ force: true });
      cy.get('[data-testid="goals"]').type('test');
      cy.get('[data-testid="improvements"]').type('test');
      cy.get('[data-testid="btn_next"]').should('be.visible').click();
    });
    it('Displays a "HouseKeeping Questions" form', () => {
      cy.get('[data-testid="onboard-title"]')
        .should('be.visible')
        .and('contain', 'housekeeping questions');
      cy.get('[data-testid="onboard-header-description"]').should('be.visible');
      cy.get('[data-testid="network-fellow-member"]').then(($el) => {
        Cypress.dom.isVisible($el);
      });
      cy.get('[data-testid="about-cohort"]').then(($el) => {
        Cypress.dom.isVisible($el);
      });
    });

    it('Prefills inputs with existing user details', () => {
      cy.get('[data-testid="network-fellow-member"]').and('have.attr', 'value', 'Yes');
    });

    it('Allows users to update or enter new details', () => {
      cy.get('[data-testid="about-cohort"]').should('be.visible').click();
      cy.contains('div', 'Other').click();
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', () => {
      cy.contains('button', 'Previous').should('be.visible').click();
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your goals');
      cy.get('[data-testid="btn_next"]').should('be.visible').click();
    });

    context('If any input is empty', () => {
      it('Displays a disabled “Next” button', () => {
        cy.get('[data-testid="about-cohort"]').should('be.visible').type('{backspace}');
        cy.get('[data-testid="btn_next"]').and('have.attr', 'disabled');
      });
    });

    context('If all inputs are filled', () => {
      it('Allows users to navigate to the next page through the “Next” button', () => {
        cy.get('[data-testid="about-cohort"]').should('be.visible').click();
        cy.contains('div', 'Other').click();
        cy.get('[data-testid="btn_next"]').should('be.visible').click();
        cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your picture');
      });
    });
  });

  describe('Page 4', () => {
    beforeEach(() => {
      cy.get('[data-testid="btn_next"]').should('be.visible').click({ force: true });
      cy.get('[data-testid="goals"]').type('test');
      cy.get('[data-testid="improvements"]').type('test');
      cy.get('[data-testid="btn_next"]').should('be.visible').click();
      cy.get('[data-testid="about-cohort"]').should('be.visible').click();
      cy.contains('div', 'Other').click();
      cy.get('[data-testid="btn_next"]').should('be.visible').click();
    });
    it('Displays a "Upload Profile Picture" form', () => {
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your picture');
      cy.get('[data-testid="onboard-header-description"]').should('be.visible');
      cy.get('[data-testid="profile-url"]').should('be.visible');
    });

    it('Prefills inputs with existing user details', () => {
      cy.get('[data-testid="profile-url"]').and(
        'have.attr',
        'src',
        home_refactored.participant_profile.profile_image_url
      );
    });

    it('Allows users to navigate to the previous page through the "Previous" buttons', () => {
      cy.contains('button', 'Previous').should('be.visible').click();
      cy.get('[data-testid="onboard-title"]')
        .should('be.visible')
        .and('contain', 'housekeeping questions');
      cy.get('[data-testid="btn_next"]').should('be.visible').click();
      cy.get('[data-testid="onboard-title"]').should('be.visible').and('contain', 'your picture');
    });

    context('If all inputs are filled', () => {
      it('Allows users to submit their onboarding details through the “Submit” button', () => {
        cy.fixture('/../fixtures/onboarding/saveUserProfileRefactored.json').as(
          'save_user_profile'
        );
        cy.route(
          'POST',
          `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/submit_onboarding_answers.json`,
          '@save_user_profile'
        ).as('submit');
        cy.get('[data-testid="btn_next"]').should('be.visible').click();
        cy.wait('@submit');
        cy.get('@submit').then((xhr) => {
          expect(xhr.response.body.first_name).to.eq(
            home_refactored.participant_profile.first_name
          );
          expect(xhr.response.body.last_name).to.eq(home_refactored.participant_profile.last_name);
          expect(xhr.response.body.email).to.eq(home_refactored.participant_profile.email);
          expect(xhr.response.body.linkedin_url).to.eq(
            home_refactored.participant_profile.linkedin_url
          );
          expect(xhr.response.body.country).to.eq(home_refactored.participant_profile.country);
          expect(xhr.response.body.city).to.eq(home_refactored.participant_profile.city);
          expect(xhr.response.body.number_of_employees).to.eq(
            home_refactored.participant_profile.number_of_employees
          );
          expect(xhr.response.body.discord_url).to.eq(
            home_refactored.participant_profile.discord_url
          );
          expect(xhr.response.body.current_position).to.eq(
            home_refactored.participant_profile.current_position
          );
          expect(xhr.response.body.current_company).to.eq(
            home_refactored.participant_profile.current_company
          );
          expect(xhr.response.body.preferred_pronoun).to.eq(
            home_refactored.participant_profile.preferred_pronoun
          );
          expect(xhr.response.body.profile_image_url).to.eq(
            home_refactored.participant_profile.profile_image_url
          );
          expect(xhr.response.body.company_logo_url).to.eq(
            home_refactored.participant_profile.company_logo_url
          );
          expect(xhr.response.body.current_industry_category_selections[0]).to.eq(
            home_refactored.participant_profile.current_industry_category_selections[0]
          );
          expect(xhr.response.body.current_role_category_selections[0]).to.eq(
            home_refactored.participant_profile.current_role_category_selections[0]
          );
          expect(xhr.response.body.do_manage_team).to.eq(
            home_refactored.participant_profile.do_manage_team
          );
          expect(xhr.response.body.interested_in_being_matched).to.eq(
            home_refactored.participant_profile.interested_in_being_matched
          );
          expect(xhr.response.body.networking_roles_categories[0]).to.eq(
            home_refactored.participant_profile.networking_roles_categories[0]
          );
          expect(xhr.response.body.networking_industries_categories[0]).to.eq(
            home_refactored.participant_profile.networking_industries_categories[0]
          );
          expect(xhr.response.body.referred_by).to.eq(
            home_refactored.participant_profile.referred_by
          );
          expect(xhr.response.body.payed_by).to.eq(home_refactored.participant_profile.payed_by);
          expect(xhr.response.body.opted_in_for_matching_suggestions).to.eq(
            home_refactored.participant_profile.opted_in_for_matching_suggestions
          );
        });
        cy.url().should('include', 'home');
        cy.get('[data-testid="dashboard-navbar-home"]').should('be.visible');
      });
    });
  });
});

describe('When onboarding flow is completed', () => {
  before(() => {
    cy.server();
    cy.login({});
  });

  it('Open account setting and verify profile information', () => {
    cy.get('[data-testid="user-icon"]').should('be.visible').click();
    cy.get('[data-testid="user-setting"]').should('be.visible').click();
    cy.get('[data-testid="first-name"]')
      .should('be.visible')
      .and('have.attr', 'value', login_fixture.user.first_name);
    cy.get('[data-testid="last-name"]')
      .should('be.visible')
      .and('have.attr', 'value', login_fixture.user.last_name);
    cy.get('[data-testid="preferred-pronoun"]')
      .should('be.visible')
      .find('input')
      .and('have.attr', 'value', login_fixture.user.preferred_pronoun);
    cy.get('[data-testid="current-position"]')
      .should('be.visible')
      .and('have.attr', 'value', login_fixture.user.current_position);
    cy.get('[data-testid="linkedin_url"]')
      .should('be.visible')
      .and('have.attr', 'value', login_fixture.user.linkedin_url);
    cy.get('[data-testid="user-introduction"]')
      .should('be.visible')
      .and('contain', login_fixture.user.bio_text);
    cy.get('[data-testid="networking"]').should('be.visible').click();
    cy.get('[data-testid="user-introduction"]')
      .should('be.visible')
      .and('have.attr', 'value', login_fixture.user.linkedin_url);
    cy.get('[data-testid="opt-for-networking"]')
      .should('be.visible')
      .find('input')
      .and('have.attr', 'value', 'Yes');
  });
});
