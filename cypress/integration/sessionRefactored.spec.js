import moment from 'moment';

const videoCameraIcon = '/static/icons/ic_recorder.svg';
const clockIcon = '/static/icons/ic_clock.svg';
const inviteLink = 'https://us06web.zoom.us/j/5239760058?pwd=N3dMakFreTl4SWhVcXowU0wwR0ZkQT09';

import sessionFixture from '../fixtures/session/sessions.json';

describe('Sessions Tab', () => {
  before(() => {
    cy.server();
    cy.login();
  });

  describe('Sessions List', () => {
    it('lists all sessions', () => {
      cy.get('#sessions-list-container')
        .children()
        .should('have.length', sessionFixture.sessions.length);
    });

    it('lists the session number of each session', () => {
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

    it('lists the title of each session', () => {
      cy.get('[data-testid=session-list-title-0]').should(
        'contain',
        sessionFixture.sessions[0].name
      );
      cy.get('[data-testid=session-list-title-1]').should(
        'contain',
        sessionFixture.sessions[1].name
      );
      cy.get('[data-testid=session-list-title-2]').should(
        'contain',
        sessionFixture.sessions[2].name
      );
    });

    context('Before the session starts', () => {
      before(() => {
        // We want to replace this random number with the session time from the fixture - 60 minutes or 1 hour
        // This will likely take some processing which I will leave to you
        // cy.clock(sessionFixture.sessions[0].time - 1 * hours);
        var returned_endate = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
        cy.clock(new Date(returned_endate.format()));
        cy.get('#session-list-1').click({ force: true });
      });

      it('Shows a clock icon', () => {
        cy.get('[data-testid=session-icon-0]').should('have.attr', 'src').and('equal', clockIcon);
      });

      it('Shows an info message', () => {
        cy.get('[data-testid=session-list-time-container-0]').should('contain', 'Live in an hour');
      });
    });

    context('After the session finishes', () => {
      before(() => {
        // We want to replace this random number with the session time from the fixture - 60 minutes or 1 hour
        // This will likely take some processing which I will leave to you
        // cy.clock(sessionFixture.sessions[0].time + 1 * hours);
        var returned_endate = moment(sessionFixture.sessions[0].time).add(1, 'hours');
        cy.clock(new Date(returned_endate.format()));
        cy.get('#session-list-0').click({ force: true });
      });

      it('Shows a video camera icon', () => {
        cy.get('[data-testid=session-icon-0]')
          .should('have.attr', 'src')
          .and('equal', videoCameraIcon);
      });

      it('Shows an info message', () => {
        cy.get('[data-testid=session-list-time-container-0]').should(
          'contain',
          'Recorded on 27 September 2021'
        );
      });
    });
  });

  describe('Session Content View', () => {
    describe('Session Main Display', () => {
      context('Before the session', () => {
        before(() => {
          var returnedTime = moment(sessionFixture.sessions[1].time).subtract(1, 'hours');
          cy.clock(new Date(returnedTime.format()));
          cy.get('#session-list-1').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=video-place-holder]').contains('This session is starting soon!');
        });

        it('Shows the session countdown', () => {
          cy.get('[data-testid=hours]').should('have.text', '01');
          cy.get('[data-testid=minutes]').should('have.text', '00');
          cy.get('[data-testid=seconds]').should('have.text', '00');
        });

        it('shows an invite link', () => {
          cy.get('[data-testid=session-invite]')
            .should('have.attr', 'href')
            .and('equal', inviteLink);
        });
      });

      context('One day before the session starts', () => {
        before(() => {
          var returnedTime = moment(sessionFixture.sessions[2].time).subtract(1, 'days');

          // console.log(returnedTime.format('Do MMMM'), returnedTime.format('HH:mm'));
          cy.clock(new Date(returnedTime.format()));
          cy.get('#session-list-2').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=upcoming-session-placeholder]').contains(
            'This session starts on the'
          );
        });

        it('Shows start date', () => {
          const currentDate = moment(sessionFixture.sessions[2].time);
          var sessionDate = currentDate.format('Do MMMM');
          var sessionTime = currentDate.format('HH:mm');

          cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionDate);
          cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionTime);
        });
      });

      context('During the session', () => {
        before(() => {
          var returnedTime = moment(sessionFixture.sessions[1].time).add(30, 'minutes');
          cy.clock(new Date(returnedTime.format()));
          cy.get('#session-list-1').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=video-place-holder]').contains(
            'The session has already started, access the link below to join!'
          );
        });

        it('shows an invite link', () => {
          cy.get('[data-testid=session-invite]')
            .should('have.attr', 'href')
            .and('equal', inviteLink);
        });
      });

      context('After the session', () => {
        before(() => {
          var returnedTime = moment(sessionFixture.sessions[2].time).add(5, 'hours');
          cy.clock(new Date(returnedTime.format()));
          cy.get('#session-list-2').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=session-ended]').should(
            'have.text',
            'This live session has finished, the recording will be available soon!'
          );
        });
      });

      context('After the recording has been uploaded', () => {
        // switch to session with video
        before(() => {
          cy.get('#session-list-0').click({ force: true });
        });

        it('Shows the session recording in a video player', () => {
          cy.get('[data-testid=session-video]').should('be.visible');
          cy.get('[data-testid=session-video-url]')
            .should('have.attr', 'src')
            .and(
              'equal',
              'https://scholarsite-public.s3.eu-west-2.amazonaws.com/EODP_Session_1.mp4'
            );
        });
      });
    });
  });
});
