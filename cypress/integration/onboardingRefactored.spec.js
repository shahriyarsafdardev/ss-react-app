const serverUrl = Cypress.env('serverUrl');

describe('Onboarding Flow', () => {
  before(() => {
    cy.server();

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onBoardingNotCompleted.json').as('onboardingData');
    cy.fixture('onboarding/home.json').as('home');
    cy.fixture('onboarding/saveUserProfile.json').as('saveProfile');
    cy.fixture('onboarding/homeOnComplete.json').as('homeOnComplete');
    cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');

    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
      '@sessionData'
    ).as('sessions');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.route('GET', `${serverUrl}/cohorts/onboarding_complete.json`, '@onboardingData').as(
      'onboarding_complete'
    );
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0&participant_id=8864c717-587d-472a-929a-8e5f298024da-1`,
      '@home'
    ).as('homeData');
    cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
      'select_fields_data'
    );
    cy.route(
      'POST',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/save_user_profile.json`,
      '@saveProfile'
    ).as('save_user_profile');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0`,
      '@homeOnComplete'
    ).as('home.json?cohort_id=9550cc85-305a-438c-a115-e791a16c91f0');

    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onBoardingNotCompleted.json').as('onboardingData');
    cy.fixture('onboarding/home.json').as('home');

    // cy.intercept(
    //   'POST',
    //   `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/step_completed.json`,
    //   (req) => {
    //     expect(req.body).to.have.property('step_number', stepNumber);
    //     if (stepNumber) {
    //       switch (stepNumber) {
    //         case 1:
    //           expect(req.body).to.have.property('answer', 'Google Search');
    //           break;
    //         case 2:
    //           expect(req.body).to.have.property('answer', 'My employer is');
    //       }
    //     }
    //     stepNumber++;
    //   }
    // );
  });

  it('should log user into app', () => {
    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=loginBtn]').click({ multiple: true, force: true });
    cy.wait(['@login', '@homeData']);
  });

  it('Displays the onboarding modal', () => {
    // Assert that the modal has appeared
    cy.get('.ReactModal__Overlay', { timeout: 3000 }).should('be.visible');
    // Assert that the side image has the correct src
    cy.get('[data-testid=onboarding-image]')
      .should('have.css', 'background-image')
      .and(
        'include',
        'https://scholarsite-public.s3.eu-west-2.amazonaws.com/author-preview-min.png'
      );
  });

  it('Displays Page 1', () => {
    // Assert title
    cy.get('[data-testid=onboard-title]').should(
      'have.text',
      'Welcome to BINFX F21! Here is a message from your instructors!'
    );
    // Assert src of video
    cy.get('[data-testid=onboard-video]')
      .should('have.attr', 'src')
      .and(
        'equal',
        'https://scholarsite-public.s3-accelerate.amazonaws.com/Welcome+Video+-+BINFX+F21.mp4'
      );
  });

  it('Sends message to backend when next is clicked', () => {
    // if you see in network tab cypress is ingtercepting it but not the others steps completed calls
    cy.server();
    cy.fixture('onboarding/stepCompleted.json').as('stepCompleted');
    cy.route(
      'POST',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/step_completed.json`,
      '@stepCompleted'
    ).as('step_completed');
    // Click next button
    cy.get('[data-testid=btn-next]').click();
    // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
    // cy.wait('@step_completed').then(({ request, response }) => {
    //   debugger;
    //   expect(response.statusCode).to.eq(200);
    //   expect(request.body.step_number).to.eq(0);
    //   // expect(response.body.name).to.eq('Jane');
    // });
  });

  it('Displays Page 2', () => {
    // Assert title
    cy.get('[data-testid=onboard-title]').should(
      'have.text',
      "First off, we'd like to ask you a few questions so we can get to know you better"
    );
    // Assert question
    cy.get('[data-testid=onboard-question]').should(
      'have.text',
      'How did you hear about this cohort?'
    );
    // Assert options text
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
    // Select option
    cy.get('[data-testid=option-1]').click();
    // Assert selected
    cy.get('[data-testid=option-1]').should('have.attr', 'data-checked').and('equal', 'true');
    // Click next
    cy.get('[data-testid=btn-next]').click();
  });

  it('Sends message to backend when next is clicked', () => {
    // Click next button
    // Here we need to assert that the `/cohorts/${cohort_id}/step_completed.json` endpoint is actually being hit
  });

  it('Displays Page 3', () => {
    // Assert title
    cy.get('[data-testid=onboard-title]').should(
      'have.text',
      "First off, we'd like to ask you a few questions so we can get to know you better"
    );
    // Assert question
    cy.get('[data-testid=onboard-question]').should('have.text', 'Who is paying for this course?');
    // Assert options text
    cy.get('[data-testid=option-1] > input').should('have.value', 'I am');
    cy.get('[data-testid=option-2] > input').should('have.value', 'My employer is');
    cy.get('[data-testid=option-3] > input').should('have.value', 'Other');
    // Select option
    cy.get('[data-testid=option-2]').click();
    // Assert selected
    cy.get('[data-testid=option-2]').should('have.attr', 'data-checked').and('equal', 'true');
    // Click next
    cy.get('[data-testid=btn-next]').click();
  });

  it('Displays Page 4', () => {
    // Assert question
    cy.get('[data-testid=onboard-question]').should(
      'have.text',
      'Would you like your participation in the Scholarsite cohort to count towards professional development accreditation (CPD, CPE or CE)?'
    );
    // Assert options text
    cy.get('[data-testid=option-1] > input').should('have.value', 'Yes');
    cy.get('[data-testid=option-2] > input').should('have.value', 'No');
    cy.get('[data-testid=option-3] > input').should('have.value', 'Maybe?');
    // Select option
    cy.get('[data-testid=option-3]').click();
    // Assert selected
    cy.get('[data-testid=option-3]').should('have.attr', 'data-checked').and('equal', 'true');
    // Click next
    cy.get('[data-testid=btn-next]').click();
  });

  it('Displays Page 5', () => {
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

    // Select option
    cy.get('[data-testid=check-2').click();
    cy.get('[data-testid=check-2').find('input[type="checkbox"]').should('be.checked');
    // Click next
    cy.get('[data-testid=btn-next]').click();
  });

  it('Displays Page 6', () => {
    // Assert question
    cy.get('[data-testid=onboard-question]').should(
      'have.text',
      'What topics can fellow cohort members ask you question on?'
    );
    //type Economics and press enter
    cy.get('#create-select').find('input[type="text"]').type('Economics {enter} ');
    //type hiring and press enter
    cy.get('#create-select').find('input[type="text"]').type('Hiring {enter} ');
    //asert
    cy.get('#create-select').contains('Hiring');
    cy.get('#create-select').contains('Economics');
    // Click next
    cy.get('[data-testid=btn-next]').click();
  });
});
