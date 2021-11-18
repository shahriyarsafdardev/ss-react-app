const serverUrl = Cypress.env('serverUrl');

import homeFixture from '../fixtures/onboarding/home.json';
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
    cy.fixture('onboarding/home.json').as('home');
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
    cy.visit('/');
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
        cy.get('[data-testid=first-name]').should('have.value', 'Waqas');
        cy.get('[data-testid=last-name]').should('have.value', 'Nazir');
        cy.get('[data-testid=preferred-pronouns]').contains('He/Him').should('have.text', 'He/Him');
        cy.get('[data-testid=current-company]').contains('Adobe').should('have.text', 'Adobe');
        cy.get('[data-testid=current-position]').should('have.value', 'Economist');
        cy.get('[data-testid=linkedin-url]').should(
          'have.value',
          'https://linkedin.com/waqas_react_dev'
        );
        cy.get(['data-testid=profile-url'])
          .find('img')
          .should('have.attr', 'src')
          .and('equal', 'profile/url');
      });
      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
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
        cy.get('[data-testid=intro-text]').type('Types the little background info');
      });
      it('Asserts the right text is typed', () => {
        cy.get('[data-testid=intro-text]').should('have.text', 'Types the little background info');
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
        cy.get('[data-testid=check-2').click();
        cy.get('[data-testid=check-3').click();
      });
      it('Asserts the right fields are selected', () => {
        cy.get('#create-select').contains('Data');
        cy.get('#create-select').contains('Design');
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
          'How many years of experience do you have in this type of role?'
        );
        //Assert options
        cy.get('[data-testid=option-1] > input').should('have.value', '0-2');
        cy.get('[data-testid=option-2] > input').should('have.value', '2-5');
        cy.get('[data-testid=option-3] > input').should('have.value', '5-10');
        cy.get('[data-testid=option-4] > input').should('have.value', '10-15');
        cy.get('[data-testid=option-5] > input').should('have.value', '15+');
      });

      it('Selects an option', () => {
        //Selects option 3 with text 5-10
        cy.get('[data-testid=option-3]').click();
      });

      it('Asserts the right option is selected', () => {
        cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 6', () => {
      it('Asserts data of Page 6', () => {
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
        cy.get('[data-testid=check-2').click();
        cy.get('[data-testid=check-3').click();
      });

      it('Asserts the right fields are selected', () => {
        cy.get('#create-select').contains('Agriculture');
        cy.get('#create-select').contains('Artificial Intelligence');
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
    context('Displays Page 8', () => {
      it('Asserts data of Page 8', () => {
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
        cy.get('[data-testid=check-5] > input').should('have.value', 'Interested');
      });
      it('Selects 2 options', () => {
        cy.get('[data-testid=check-2').click();
        cy.get('[data-testid=check-3').click();
      });
      it('Asserts that right options are selected', () => {
        cy.get('[data-testid=check-2').find('input[type="checkbox"]').should('be.checked');
        cy.get('[data-testid=check-3').find('input[type="checkbox"]').should('be.checked');
      });
    });
    context('Displays Page 9', () => {
      it('Asserts data of Page 9', () => {
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
    });

    context('Displays Page 10 if user selects yes on page 9', () => {
      it('Asserts data of Page 4', () => {
        cy.get('[data-testid=onboard-title]').should('have.text', networkHeader);
        cy.get('[data-testid=onboard-description]').should('have.text', networkDescription);
        // Assert question
        cy.get('[data-testid=onboard-question]').should(
          'have.text',
          "I'm most interested in matching with someone who: (Make between 1 and 3 choices)"
        );
      });
      it('Selects 2 fields in dropdown', () => {
        cy.get('[data-testid=check-2').click();
        cy.get('[data-testid=check-3').click();
      });
      it('Asserts the right fields are selected', () => {
        cy.get('#create-select').contains('Has the same years of experience');
        cy.get('#create-select').contains('Can mentor me');
      });

      it('Clicks on next button', () => {
        cy.get('[data-testid=btn-next]').click();
      });
    });
    context('Displays Page 11', () => {
      it('Asserts data of Page 11', () => {
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
    context('Displays Page 12', () => {
      it('Asserts data of Page 12', () => {
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

    context('Displays Page 13', () => {
      it('Asserts data of Page 13', () => {
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
        // Select option
        // Assert selected
        cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
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

    context('Displays Page 14', () => {
      it('Asserts data of Page 14', () => {
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
        cy.fixture('onboarding/saveUserProfile.json').as('saveProfile');
        cy.route(
          'POST',
          `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/onboarding/save_user_profile.json`,
          '@saveProfile'
        ).as('save_user_profile');
        cy.get('[data-testid=btn-submit]').click();
        cy.wait('@save_user_profile').then(({ response, request }) => {
          const questionIDs = Object.keys(request.body.response);

          expect(request.body.response[questionIDs[0]]).to.eq('Strongly Agree');
          expect(request.body.response[questionIDs[1]]).to.eq('');
          expect(request.body.response[questionIDs[2]]).to.deep.eq(
            'Types the little background info'
          );
          expect(request.body.response[questionIDs[3]]).to.deep.eq(['Data', 'Design']);
          expect(request.body.response[questionIDs[4]]).to.eq('5-10');
          expect(request.body.response[questionIDs[5]]).to.eq([
            'Agriculture',
            'Artificial Intelligence'
          ]);
          expect(request.body.response[questionIDs[6]]).to.deep.eq(['Hiring', 'Economics']);
          expect(request.body.response[questionIDs[7]]).to.deep.eq([
            'Mentor Others',
            'Grow my network'
          ]);
          expect(request.body.response[questionIDs[8]]).to.eq('Yes');
          expect(request.body.response[questionIDs[9]]).to.eq([
            'Has the same years of experience',
            'Can mentor me'
          ]);
          expect(request.body.response[questionIDs[10]]).to.eq('Yes');
          expect(request.body.response[questionIDs[11]]).to.eq('Social Media');
          expect(request.body.response[questionIDs[12]]).to.eq('My employer');
          expect(request.body.response[questionIDs[13]]).to.eq('No');
        });
      });
    });
  });
});
