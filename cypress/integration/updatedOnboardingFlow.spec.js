const serverUrl = Cypress.env('serverUrl');

import homeFixture from '../fixtures/onboarding/home_refactored.json';
import userProfileFixture from '../fixtures/onboarding/saveUserProfileRefactored.json';
const cohortId = '9550cc85-305a-438c-a115-e791a16c91f0';
const enrollmentId = 'f1b1b3f1-afad-4aec-8a4f-240698ac246c';
const onboardingHeaderText = 'Build Your Profile';
const onboardingHeaderDescription =
  'Your profile will be visible to other members of the EODP F21 cohort. You can edit all details again later in profile settings.';

const networkHeader = 'Networking Preferences';
const networkDescription =
  'We’ll help you make meaningful connections with other professionals in the cohort.';
const houseKeepingHeader = 'Housekeeping Questions';
const houseKeepingDescription = 'Don’t worry, there’s just a few!';
describe('Onboarding Flow', () => {
  before(() => {
    cy.server();

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onBoardingNotCompleted.json').as('onboardingData');
    cy.fixture('onboarding/home_refactored.json').as('home');
    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
      '@sessionData'
    ).as('sessions');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/onboarding_complete.json`,
      '@onboardingData'
    ).as('onboarding_complete');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0&participant_id=8864c717-587d-472a-929a-8e5f298024da-1`,
      '@home'
    ).as('homeData');
  });

  it('should log user into app', () => {
    cy.visit('/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions');
    const email = 'waqas@scholar.com';
    const password = '123456';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });
    cy.wait(['@login', '@homeData']);
  });

  describe('Onboarding Modal', () => {
    context('Displays Pages of onBoarding Modal', () => {
      before('Opens Modal', () => {
        // Assert that the modal has appeared
        cy.get('.ReactModal__Overlay', { timeout: 3000 }).should('be.visible');
      });
    });
    context('Displays Page 1', () => {
      it('Asserts data of Page 1', () => {
        // Assert title
        cy.get('[data-testid=onboard-title]').should('have.text', homeFixture.onboarding_header);
        // Assert that the side image has the correct src
        cy.get('[data-testid=onboarding-image]')
          .should('have.css', 'background-image')
          .and('include', homeFixture.onboarding_side_image_url);
        //Assert src of video thumbnail
        cy.get('[data-testid=onboard-video]')
          .should('have.attr', 'poster')
          .and('equal', homeFixture.onboarding_video_thumbnail_url);
        // Assert src of video
        cy.get('[data-testid=onboard-video]')
          .should('have.attr', 'src')
          .and('equal', homeFixture.onboarding_video_url);
      });
      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 2', () => {
      before(() => {
        //mocks the form fields data API
        cy.server();
        cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
        cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
          'select_fields_data'
        );
      });
      it('Asserts data of Page 2', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', onboardingHeaderText);
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          onboardingHeaderDescription
        );
        cy.get('[data-testid=first-name]').should(
          'have.value',
          homeFixture.participant_profile.first_name
        );
        cy.get('[data-testid=last-name]').should(
          'have.value',
          homeFixture.participant_profile.last_name
        );
        cy.get('[data-testid=preferred-pronoun]').contains(
          homeFixture.participant_profile.preferred_pronoun
        );
        cy.get('[data-testid=current-company]')
          .contains('Adobe')
          .should('have.text', homeFixture.participant_profile.current_company);
        cy.get('[data-testid=current-position]').should(
          'have.value',
          homeFixture.participant_profile.current_position
        );
        cy.get('[data-testid=linkedin-url]').should(
          'have.value',
          homeFixture.participant_profile.linkedin_url
        );
        // cy.get(['data-testid=profile-url'])
        //   .should('have.attr', 'src')
        //   .and('equal', homeFixture.participant_profile.profile_image_url);
      });
    });
    context('Submits the user profile form', () => {
      before(() => {
        //mocks the update user profile api
        cy.server();
        cy.fixture('onboarding/saveUserProfileRefactored.json').as('saveProfile');
        cy.route(
          'POST',
          `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/save_user_profile.json`,
          '@saveProfile'
        ).as('save_user_profile');
      });
      it('Submits the form', () => {
        cy.get('[data-testid=btn-submit]').click();
        cy.wait('@save_user_profile').then(({ response }) => {
          expect(response.body.first_name).to.eq(userProfileFixture.first_name);
          expect(response.body.last_name).to.eq(userProfileFixture.last_name);
          expect(response.body.linkedin_url).to.eq(userProfileFixture.linkedin_url);
          expect(response.body.discord_url).to.eq(userProfileFixture.discord_url);
          expect(response.body.current_position).to.eq(userProfileFixture.current_position);
          expect(response.body.current_company).to.eq(userProfileFixture.current_company);
          expect(response.body.profile_image_url).to.eq(userProfileFixture.profile_image_url);
          expect(response.body.interests).to.deep.eq(userProfileFixture.interests);
          expect(response.body.strengths).to.deep.eq(userProfileFixture.strengths);
        });
      });
    });
    context('Displays Page 3', () => {
      it('Asserts data of Page 3', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', onboardingHeaderText);
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          onboardingHeaderDescription
        );
      });
      it('Types user introduction in text field', () => {
        cy.get('[data-testid=survey-text]').type('Types the little background info');
      });
      it('Asserts the right text is typed', () => {
        cy.get('[data-testid=survey-text]').should('have.text', 'Types the little background info');
      });
      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 4', () => {
      it('Asserts data of Page 4', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', onboardingHeaderText);
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          onboardingHeaderDescription
        );
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'What is the best way to describe your current role?'
        );
      });
      it('Selects 2 fields in dropdown', () => {
        cy.get('#multi-select').find('input').type('Data {enter} ');
        cy.get('#multi-select').find('input').type('Design {enter} ');
      });
      it('Asserts the right fields are selected', () => {
        cy.get('#multi-select').contains('Data');
        cy.get('#multi-select').contains('Design');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 5', () => {
      it('Asserts data of Page 5', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', onboardingHeaderText);
        cy.get('[data-testid=onboard-description]').should(
          'have.text',
          onboardingHeaderDescription
        );
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Which best describes the industry you work in? Make between 1 and 5 choices.'
        );
      });

      it('Selects 2 fields in dropdown', () => {
        cy.get('#multi-select').find('input').type('Agriculture {enter} ');
        cy.get('#multi-select').find('input').type('Artificial Intelligence {enter} ');
      });

      it('Asserts the right fields are selected', () => {
        cy.get('#multi-select').contains('Agriculture');
        cy.get('#multi-select').contains('Artificial Intelligence');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 6', () => {
      it('Asserts data of Page 6', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', networkHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', networkDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'What topics can fellow cohort members ask you question on?'
        );
      });
      it('Types two Topics and press enter', () => {
        //type Economics and press enter
        cy.get('#create-select').find('input[type="text"]').type('Economics {enter} ');
        //type hiring and press enter
        cy.get('#create-select').find('input[type="text"]').type('Hiring {enter} ');
      });
      it('Asserts the right Text is typed', () => {
        cy.get('#create-select').contains('Hiring');
        cy.get('#create-select').contains('Economics');
      });
      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 7', () => {
      it('Asserts data of Page 7', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', networkHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', networkDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'What are you looking to find within the Scholarsite community?'
        );
        // Assert options text
        cy.get('[data-testid=check-1] > input').should('have.value', 'Find a mentor');
        cy.get('[data-testid=check-2] > input').should('have.value', 'Mentor others');
        cy.get('[data-testid=check-3] > input').should('have.value', 'Grow my network');
        cy.get('[data-testid=check-4] > input').should('have.value', 'Discuss materials');
      });
      it('Selects 2 options', () => {
        cy.get('[data-testid=check-2').click();
        cy.get('[data-testid=check-3').click();
      });
      it('Asserts that right options are selected', () => {
        cy.get('[data-testid=check-2').find('input[type="checkbox"]').should('be.checked');
        cy.get('[data-testid=check-3').find('input[type="checkbox"]').should('be.checked');
      });
      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 8', () => {
      it('Asserts data of Page 8', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', networkHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', networkDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Are you interested in being matched with a peer in your cohort based on commonalities and interests? (This is one of our students’ favorite part of the cohort!)'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'Yes');
        cy.get('[data-testid=option-2] > input').should('have.value', 'No');
      });
      it('Selects Yes', () => {
        cy.get('[data-testid=option-1]').click();
      });
      it('Asserts that right option is selected', () => {
        cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
      });
      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('Displays Page 9 if user selects yes on page 8', () => {
      it('Asserts data of Page 9', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', networkHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', networkDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          "I'm most interested in matching with someone who: (Make between 1 and 3 choices)"
        );
      });
      it('Selects 2 fields in dropdown', () => {
        cy.get('#multi-select').find('input').type('Has the same years of experience {enter} ');
        cy.get('#multi-select').find('input').type('Can mentor me {enter} ');
      });
      it('Asserts the right fields are selected', () => {
        cy.get('#multi-select').contains('Has the same years of experience');
        cy.get('#multi-select').contains('Can mentor me');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 10', () => {
      it('Asserts data of Page 10', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', networkHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', networkDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Would you be open to mentoring more junior professionals?'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'Yes');
        cy.get('[data-testid=option-2] > input').should('have.value', 'No');
      });
      it('Selects Yes', () => {
        cy.get('[data-testid=option-1]').click();
      });
      it('Asserts that right option is selected', () => {
        cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 11', () => {
      it('Asserts data of Page 11', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', houseKeepingHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', houseKeepingDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'How did you hear about this cohort?'
        );
        //Assert options
        cy.get('[data-testid=option-1] > input').should('have.value', 'Google Search');
        cy.get('[data-testid=option-2] > input').should('have.value', 'Email Marketing');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Social Media');
        cy.get('[data-testid=option-4] > input').should(
          'have.value',
          'Recommended by a friend or colleague'
        );
        cy.get('[data-testid=option-5] > input').should(
          'have.value',
          'Personally invited by someone in the Scholarsite team'
        );
        cy.get('[data-testid=option-6] > input').should('have.value', 'Other');
      });

      it('Selects an option', () => {
        //Selects option 3 with text Social Media
        cy.get('[data-testid=option-3]').click();
      });

      it('Asserts the right option is selected', () => {
        cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('Displays Page 12', () => {
      it('Asserts data of Page 12', () => {
        // Assert title
        cy.get('[data-testid=onboard-title]').should('have.text', houseKeepingHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', houseKeepingDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Who is paying for this course?'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'I am');
        cy.get('[data-testid=option-2] > input').should('have.value', 'My employer');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Other');
      });

      it('Selects an option', () => {
        //Selects option 3 with text My employer
        cy.get('[data-testid=option-2]').click();
      });

      it('Asserts the right option is selected', () => {
        cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });

    context('Displays Page 13', () => {
      it('Asserts data of Page 13', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', houseKeepingHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', houseKeepingDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          'Would you like your participation in the Scholarsite cohort to count towards professional development accreditation (CPD, CPE or CE)?'
        );
        // Assert options text
        cy.get('[data-testid=option-1] > input').should('have.value', 'Yes');
        cy.get('[data-testid=option-2] > input').should('have.value', 'No');
        cy.get('[data-testid=option-3] > input').should('have.value', 'Maybe?');
      });

      it('Selects an option', () => {
        //Selects option 3 with text No
        cy.get('[data-testid=option-2]').click();
      });

      it('Asserts the right option is selected', () => {
        cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
      });
    });
    context('Submits the Onboarding form', () => {
      it('Asserts answers mapping to their respective question IDs', () => {
        cy.server();
        cy.fixture('onboarding/saveUserProfileRefactored.json').as('saveProfile');
        cy.route(
          'POST',
          `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/submit_onboarding_answers.json`,
          '@saveProfile'
        ).as('submit_onboarding_answers');
        cy.get('[data-testid=btn-next]').click();
        cy.wait('@submit_onboarding_answers').then(({ response, request }) => {
          const questionIDs = Object.keys(request.body.onboarding_answers);
          //Request
          expect(request.body.onboarding_answers[questionIDs[0]]).to.deep.eq(
            'Types the little background info'
          );
          expect(request.body.onboarding_answers[questionIDs[1]]).to.deep.eq(['Data', 'Design']);
          expect(request.body.onboarding_answers[questionIDs[2]]).to.deep.eq([
            'Agriculture',
            'Artificial Intelligence'
          ]);
          expect(request.body.onboarding_answers[questionIDs[3]]).to.deep.eq([
            'Economics',
            'Hiring'
          ]);
          expect(request.body.onboarding_answers[questionIDs[4]]).to.deep.eq([
            'Mentor others',
            'Grow my network'
          ]);
          expect(request.body.onboarding_answers[questionIDs[5]]).to.eq('Yes');
          expect(request.body.onboarding_answers[questionIDs[6]]).to.deep.eq([
            'Has the same years of experience',
            'Can mentor me'
          ]);
          expect(request.body.onboarding_answers[questionIDs[7]]).to.eq('Yes');
          expect(request.body.onboarding_answers[questionIDs[8]]).to.eq('Social Media');
          expect(request.body.onboarding_answers[questionIDs[9]]).to.eq('My employer');
          expect(request.body.onboarding_answers[questionIDs[10]]).to.eq('No');
          //Response
          expect(response.body.current_company).to.eq(userProfileFixture.current_company);
          expect(response.body.current_position).to.eq(userProfileFixture.current_position);
          expect(response.body.discord_url).to.eq(userProfileFixture.discord_url);
          expect(response.body.first_name).to.eq(userProfileFixture.first_name);
          expect(response.body.last_name).to.eq(userProfileFixture.last_name);
          expect(response.body.industries).to.deep.eq(userProfileFixture.industries);
          expect(response.body.interests).to.deep.eq(userProfileFixture.interests);
          expect(response.body.strengths).to.deep.eq(userProfileFixture.strengths);
          expect(response.body.introduction).to.eq(userProfileFixture.introduction);
          expect(response.body.linkedin_url).to.eq(userProfileFixture.linkedin_url);
          expect(response.body.preferred_pronoun).to.deep.eq(userProfileFixture.preferred_pronoun);
          expect(response.body.roles).to.deep.eq(userProfileFixture.roles);
          expect(response.body.profile_image_url).to.deep.eq(userProfileFixture.profile_image_url);
        });
      });
    });
  });
});
