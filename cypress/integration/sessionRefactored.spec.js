import moment from 'moment';

const videoCameraIcon = '/static/icons/ic_recorder.svg';
const clockIcon = '/static/icons/ic_clock.svg';
const inviteLink = 'https://us06web.zoom.us/j/5239760058?pwd=N3dMakFreTl4SWhVcXowU0wwR0ZkQT09';

const emptySession = 0; // The resources, summary notes, slides and recording are set to null in this fixture
const populatedSession = 1; // The resources, summary notes, slides and recording are present in this fixture

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
        var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
        cy.clock(new Date(dateTime.format()));
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
        var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
        cy.clock(new Date(dateTime.format()));
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
      context('Multiple days before the session', () => {
        before(() => {
          cy.get('#session-list-1').click({ force: true });
          var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
          cy.clock(new Date(dateTime.format()));
          cy.get('#session-list-0').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=video-place-holder]').contains('This session is starting soon!');
        });

        it('Shows the session countdown', () => {
          cy.get('[data-testid=hours]').should('have.text', '01');
          cy.get('[data-testid=minutes]').should('have.text', '00');
          cy.get('[data-testid=seconds]').should('have.text', '00');
        });

        it('Shows the invite link', () => {
          cy.get('[data-testid=session-invite]')
            .should('have.attr', 'href')
            .and('equal', inviteLink);
        });
      });

      context('One day before the session starts', () => {
        before(() => {
          cy.get('#session-list-1').click({ force: true });
          var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'days');
          cy.clock(new Date(dateTime.format()));
          cy.get('#session-list-0').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=upcoming-session-placeholder]').contains(
            'This session starts on the'
          );
        });

        it('Shows the start date', () => {
          const currentSessionDate = moment(sessionFixture.sessions[0].time);
          var sessionDate = currentSessionDate.format('Do MMMM');
          var sessionTime = currentSessionDate.format('HH:mm');

          cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionDate);
          cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionTime);
        });
      });

      context('During the session', () => {
        before(() => {
          cy.get('#session-list-1').click({ force: true });

          var dateTime = moment(sessionFixture.sessions[0].time).add(30, 'minutes');
          cy.clock(new Date(dateTime.format()));
          cy.get('#session-list-0').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=video-place-holder]').contains(
            'The session has already started, access the link below to join!'
          );
        });

        it('Shows the invite link', () => {
          cy.get('[data-testid=session-invite]')
            .should('have.attr', 'href')
            .and('equal', inviteLink);
        });
      });

      context('After the session', () => {
        before(() => {
          cy.get('#session-list-1').click({ force: true });
          var dateTime = moment(sessionFixture.sessions[0].time).add(5, 'hours');
          cy.clock(new Date(dateTime.format()));
          cy.get('#session-list-0').click({ force: true });
        });

        it('Shows the correct info message', () => {
          cy.get('[data-testid=session-ended]').should(
            'have.text',
            'This live session has finished, the recording will be available soon!'
          );
        });
      });

      context('After the recording has been uploaded', () => {
        before(() => {
          cy.clock().invoke('restore');
          cy.get('#session-list-2').click({ force: true });
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

  describe('Resources Tab', () => {
    before(() => {
      cy.get('#session-list-0').click({ force: true });
    });

    context('When the resources are present', () => {
      it('Renders the provided html', () => {
        cy.get('[data-testid=session-description]').then((description) => {
          const html = description.html();
          expect(html).to.eq(sessionFixture.sessions[0].description);
        });
      });
    });

    context('When the resources are not present', () => {
      it('Renders the correct info message', () => {
        cy.get('#session-list-2').click({ force: true });
        cy.get('[data-testid=session-message]').should(
          'have.text',
          'The session resources will be available 2 days before the session.'
        );
      });
    });
  });

  describe('Summary Tab', () => {
    context('When a summary are present', () => {
      before(() => {
        cy.get('#session-list-0').click({ force: true });
        cy.get('[data-testid=session-notes]').click();
      });

      it('Renders the provided html', () => {
        cy.get('[data-testid=summary-notes]').then((summary) => {
          const html = summary.html();
          expect(html).to.eq(sessionFixture.sessions[0].summary);
        });
      });
    });

    context('When a summary is not present', () => {
      before(() => {
        cy.get('#session-list-2').click({ force: true });
        cy.get('[data-testid=session-notes]').click();
      });

      it('Renders the correct info message', () => {
        cy.get('[data-testid=session-message]').should(
          'have.text',
          'The session summary will be available shortly after this session.'
        );
      });
    });
  });

  describe('Session Slides Tab', () => {
    context('When the session slides are present', () => {
      before(() => {
        cy.get('#session-list-0').click({ force: true });
        cy.get('[data-testid=session-slides]').click();
      });

      it('Renders the pdf viewer component', () => {
        cy.get('.react-pdf__Page__canvas', { timeout: 30000 }).should('be.visible');
      });

      it('Allows users to navigate left and right', () => {
        cy.get('[data-testid=slides-right]').click();
        cy.get('[data-testid=slides-page-number]').should('have.text', 'Page 2 of 46');
        cy.get('[data-testid=slides-left]').click();
        cy.get('[data-testid=slides-page-number]').should('have.text', 'Page 1 of 46');
      });

      it('Allows users to enter full screen');
      it('Allows users to download');
    });

    context('When the session slides are not present', () => {
      before(() => {
        cy.get('#session-list-2').click({ force: true });
        cy.get('[data-testid=session-slides]').click();
      });

      it('Renders the correct info message', () => {
        cy.get('[data-testid=session-message]').should(
          'have.text',
          'The presentation slides will be available shortly after this session.'
        );
      });
    });
  });
});
