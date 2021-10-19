const videoCameraIcon = '/static/icons/ic_recorder.svg';
const clockIcon = '/static/icons/ic_clock.svg';
const sessionRecorded = 'Recorded on 27 September 2021';
const sessionLive = 'Live in an hour';
import sessionFixture from '../fixtures/session/sessions.json';
// import json from fixtures

describe('Sessions Tab', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });
  // assert that the list is shown with the correct content
  it('list the correct number of sessions', () => {
    cy.login();
    // expect(length).to.eq(json.sessions.length);
    cy.get('#sessions-list-container')
      .children()
      .should('have.length', sessionFixture.sessions.length);
  });

  it('list the session number of each session', () => {
    cy.get('[data-testid=session-list-number-0]').should(
      'contain',
      sessionFixture.sessions[0].number
    );
    cy.get('[data-testid=session-list-number-1]').should(
      'contain',
      sessionFixture.sessions[1].number
    );
    cy.get('[data-testid=session-list-number-2]').should(
      'contain',
      sessionFixture.sessions[2].number
    );
  });

  it('list the title of each session', () => {
    cy.get('[data-testid=session-list-title-0]').should('contain', sessionFixture.sessions[0].name);
    cy.get('[data-testid=session-list-title-1]').should('contain', sessionFixture.sessions[1].name);
    cy.get('[data-testid=session-list-title-2]').should('contain', sessionFixture.sessions[2].name);
  });

  context('When the current time is after the session start time', () => {
    it('show a video camera icon', () => {
      cy.get('[data-testid=session-icon-0]')
        .should('have.attr', 'src')
        .and('equal', videoCameraIcon);
    });

    it('include a message showing the session has been recorded', () => {
      cy.get('[data-testid=session-list-time-container-0]').should('contain', sessionRecorded);
    });
  });

  context('When the current time is before the session start time', () => {
    it('show a clock icon', () => {
      cy.clock(1633399200000);
      cy.get('#session-list-1').click({ force: true });

      cy.get('[data-testid=session-icon-1]').should('have.attr', 'src').and('equal', clockIcon);
    });

    it('include a message showing the session will be live', () => {
      cy.get('[data-testid=session-list-time-container-1]').should('contain', sessionLive);
    });
  });

  // context('When the current time is before the session start time', () => {
  //   it('show a clock icon', () => {
  //     expect(icon3).to.eq(clockIcon);
  //   });

  //   it('include a message showing the session is upcoming', () => {
  //     expect(message3).to.eq('Live in 1 day');
  //   });
  // });
});
