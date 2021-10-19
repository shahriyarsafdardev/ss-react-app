// login

// check the session title
// check that resources are displayed
// check that summary notes are displayed
// check that slides are displayed
// check that video is displayed

// switch to the second session (which has no data in response)

// check the session title
// check that the correct message is displayed when resources are not present in the api response
// check that the correct message is displayed when resources are not present in the api summary notes
// check that the correct message is displayed when slides are not present in the api response

// We also need to assert that the VideoPlaceHolder component is working as expected
const serverUrl = Cypress.env('serverUrl');
import sessiondata from '../fixtures/session/sessions.json';

describe('Sessions Tab', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('shows a list of all sessions', () => {
    cy.login();
    console.log(sessiondata);
    // assert that the list is shown with the correct content
    cy.get('#sessions-list-container').children().should('have.length', 3);
    cy.get('[data-testid=session-list-number-0]').should('contain', 'Session 1');
    cy.get('[data-testid=session-list-title-0]').should('contain', 'Test Cohort 1');
    cy.get('[data-testid=session-list-time-container-0]').should(
      'contain',
      'Recorded on 27 September 2021'
    );
    cy.get('[data-testid=session-list-number-1]').should('contain', 'Session 2');
    cy.get('[data-testid=session-list-title-1]').should('contain', 'Test Cohort 2');
    cy.get('[data-testid=session-list-time-container-1]').should(
      'contain',
      'Recorded on 05 October 2021'
    );
  });

  it('it shows the details of the first session by default', () => {
    cy.get('[data-testid=session-number]').should('have.text', 'Session 1 | ');
    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 1');

    // Session recording
    cy.get('[data-testid=session-video]').should('be.visible');
    cy.get('[data-testid=session-video-url]')
      .should('have.attr', 'src')
      .and('equal', 'https://scholarsite-public.s3.eu-west-2.amazonaws.com/EODP_Session_1.mp4');

    // Session description
    cy.get('[data-testid=session-description]').should('be.visible');
    // Need to check inner html that it matches the api
    //Matches inner HTML of description with API response
    cy.get('[data-testid=session-description]').then((description) => {
      const html = description.html();
      expect(html).to.eq(sessiondata.sessions[0].description);
    });
    // Session Summary
    cy.get('[data-testid=session-notes]').click();
    cy.get('[data-testid=summary-notes]').should('be.visible');
    // Need to check inner html that it matches the api
    //Matches inner HTML of summary with API response
    cy.get('[data-testid=summary-notes]').then((summary) => {
      const html = summary.html();
      expect(html).to.eq(
        '<ul><li>Gain economic frameworks to understand and manage network d</li><li>Understand cost/benefit aspects of platform-based network businesses</li><li class="ql-indent-1">Identify strategic considerations for two-sided and multi-sided platform businesses</li><li class="ql-indent-1">This lecture covers some of the most fundamental principles behind what makes digital platforms powerful business models.</li></ul>'
      );
    });

    //session slides
    cy.get('[data-testid=session-slides]').click();
    cy.get('.react-pdf__Page__canvas', { timeout: 30000 }).should('be.visible');
  });

  it('it shows the details of the second session when it is clicked', () => {
    cy.get('#session-list-1').click({ force: true });
    //session number and name
    cy.get('[data-testid=session-number]').should('have.text', 'Session 2 | ');
    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 2');
    cy.get('[data-testid=close-modal]').click();

    //session description
    cy.get('[data-testid=session-resources]').click();
    //it should ensure description should not be displayed
    cy.get('[data-testid=session-description]').should('not.exist');
    //it should ensure the correct message is displayed if description is null
    cy.get('[data-testid=session-message]').should('be.visible');
    cy.get('[data-testid=session-message]').should(
      'have.text',
      'The session resources will be available 2 days before the session.'
    );

    //session summary
    cy.get('[data-testid=session-notes]').click();
    //it should ensure summary should not be displayed
    cy.get('[data-testid=summary-notes]').should('not.exist');
    //it should ensure the correct message is displayed if summary is null
    cy.get('[data-testid=session-message]').should(
      'have.text',
      'The session summary will be available shortly after this session.'
    );

    //session slides
    cy.get('[data-testid=session-slides]').click();
    //it should ensure pdf slides should not be displayed
    cy.get('[data-testid=session-pdf-slides]').should('not.exist');
    //it should ensure the correct message is displayed pdf url is null
    cy.get('[data-testid=session-message]').should(
      'have.text',
      'The presentation slides will be available shortly after this session.'
    );

    //session video placeholder
    cy.get('[data-testid=session-video]').should('not.exist');
    cy.get('[data-testid=video-place-holder]').should('be.visible');
    cy.get('[data-testid=session-ended]').should(
      'have.text',
      'This live session has finished, the recording will be available soon!'
    );
  });

  it('it shows the details of the third session when it is clicked', () => {
    cy.clock(1629140400000);
    cy.get('#session-list-2').click({ force: true });
    //session number and name
    cy.get('[data-testid=session-number]').should('have.text', 'Session 3 | ');
    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 3');

    //session video placeholder
    //Upcoming session video placeholder
    cy.get('[data-testid=session-video]').should('not.exist');
    cy.get('[data-testid=upcoming-session-placeholder]').should('be.visible');
    //should have correct message
    cy.get('[data-testid=upcoming-session-placeholder]').contains('This session starts on the');
    //should have correct date
    cy.get('[data-testid=upcoming-session-placeholder]').contains('17th October');
    //should have correct time
    // cy.get('[data-testid=upcoming-session-placeholder]').contains('at 17:00');
    cy.clock().invoke('restore');
  });
  it('it should test the video place holder when 0 days are remaining for session', () => {
    cy.clock(1633399200000);
    cy.get('#session-list-1').click({ force: true });

    cy.get('[data-testid=session-video]').should('not.exist');
    //should have correct message
    cy.get('[data-testid=video-place-holder]').contains('This session is starting soon!');
    //should have correct remaining time
    cy.get('[data-testid=video-place-holder]').contains('01');
    //should have button for zoom link
    cy.get('[data-testid=video-place-holder]').contains('Join Zoom');
    cy.clock().invoke('restore');
  });
  it('it should test the video place holder when session is in progress', () => {
    cy.clock(1634473800000);
    cy.get('#session-list-2').click({ force: true });

    cy.get('[data-testid=session-video]').should('not.exist');
    //should have correct message
    cy.get('[data-testid=video-place-holder]').contains(
      'The session has already started, access the link below to join!'
    );
    //should have button for zoom link
    cy.get('[data-testid=video-place-holder]').contains('Join Zoom');
    cy.clock().invoke('restore');
  });
});
