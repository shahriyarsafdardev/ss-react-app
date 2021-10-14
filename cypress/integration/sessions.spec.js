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

describe('Sessions Tab', () => {
  beforeEach(() => {
    // network stub
    cy.server();
    cy.login();
  });

  it('shows a list of all sessions', () => {
    // assert that the list is shown with the correct content
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

    // Session Summary
    cy.get('[data-testid=session-notes]').click();
    cy.get('[data-testid=summary-notes]').should('be.visible');
    // Need to check inner html that it matches the api

    cy.get('[data-testid=session-slides]').click();
    cy.get('.react-pdf__Page__canvas', { timeout: 20000 }).should('be.visible');
  });

  it('it shows the details of the second session when it is clicked', () => {});

  it('should have correct session name for session 2', () => {
    cy.get('#session-list-1').click({ force: true });

    cy.get('[data-testid=session-number]').should('have.text', 'Session 2 | ');

    cy.get('[data-testid=session-title]').should('have.text', 'Test Cohort 2');
    cy.get('[data-testid=close-modal]').click();
  });

  it('should check the resources are not visible and correct message is displayed for session 2', () => {
    cy.get('[data-testid=session-resources]').click();
    //it should ensure description should not be displayed
    cy.get('[data-testid=session-description]').should('not.exist');
    //it should ensure the correct message is displayed if description is null
    cy.get('[data-testid=session-message]').should('be.visible');
    cy.get('[data-testid=session-message]').should(
      'have.text',
      'The session resources will be available 2 days before the session.'
    );
  });
  it('should check the summary notes are not visible and correct message is displayed for session 2', () => {
    cy.get('[data-testid=session-notes]').click();
    //it should ensure summary should not be displayed
    cy.get('[data-testid=summary-notes]').should('not.exist');
    //it should ensure the correct message is displayed if summary is null
    cy.get('[data-testid=session-message]').should(
      'have.text',
      'The session summary will be available shortly after this session.'
    );
  });
  it('should check the slides are not visible and correct message is displayed for session 2', () => {
    cy.get('[data-testid=session-slides]').click();
    //it should ensure pdf slides should not be displayed
    cy.get('[data-testid=session-pdf-slides]').should('not.exist');
    //it should ensure the correct message is displayed pdf url is null
    cy.get('[data-testid=session-message]').should(
      'have.text',
      'The presentation slides will be available shortly after this session.'
    );
  });
  it('should check the video is not visible and place holder is displayed for session 2', () => {
    cy.get('[data-testid=session-video]').should('not.exist');
    cy.get('[data-testid=video-place-holder]').should('be.visible');
    cy.get('[data-testid=session-ended]').should(
      'have.text',
      'This live session has finished, the recording will be available soon!'
    );
  });
});
