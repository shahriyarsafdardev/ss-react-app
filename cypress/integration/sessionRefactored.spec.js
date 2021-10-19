const videoCameraIcon = '/static/icons/ic_recorder.svg';
const clockIcon = '/static/icons/ic_clock.svg';

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
        cy.clock(1633399200000);
        cy.get('#session-list-1').click({ force: true });
        cy.get('#session-list-0').click({ force: true });
      });

      xit('Shows a clock icon', () => {
        cy.get('[data-testid=session-icon-0]').should('have.attr', 'src').and('equal', clockIcon);
      });

      xit('Shows an info message', () => {
        cy.get('[data-testid=session-list-time-container-0]').should('contain', 'Live in an hour');
      });
    });

    context('After the session finishes', () => {
      before(() => {
        // We want to replace this random number with the session time from the fixture - 60 minutes or 1 hour
        // This will likely take some processing which I will leave to you
        // cy.clock(sessionFixture.sessions[0].time + 1 * hours);
        cy.clock(1633399200000);
        cy.get('#session-list-1').click({ force: true });
        cy.get('#session-list-0').click({ force: true });
      });

      xit('Shows a video camera icon', () => {
        cy.get('[data-testid=session-icon-0]')
          .should('have.attr', 'src')
          .and('equal', videoCameraIcon);
      });

      xit('Shows an info message', () => {
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
        before(() => {});

        it('Shows the correct info message', () => {});

        it('Shows the session start date and time', () => {});
      });

      context('One day before the session starts', () => {
        before(() => {});

        it('Shows the correct info message', () => {});

        it('Shows a countdown', () => {});

        it('Shows an invite link', () => {});
      });

      context('During the session', () => {
        before(() => {});

        it('Shows the correct info message', () => {});

        it('shows an invite link', () => {});
      });

      context('After the session', () => {
        before(() => {});

        it('Shows the correct info message', () => {});
      });

      context('After the recording has been uploaded', () => {
        // switch to session with video
        before(() => {});

        it('Shows the session recording in a video player', () => {});
      });
    });
  });
});
