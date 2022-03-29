import sessionFixture from '../../../../fixtures/session/sessions.json';
import userFixture from '../../../../fixtures/login/login.json';
import cohortsFixture from '../../../../fixtures/cohorts/cohorts.json';
import moment from 'moment';

Cypress.Commands.add('setClockToBeforeSession', (session, time) => {
  var dateTime = moment(session).subtract(time, 'hours');
  cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('setClockToAfterSession', (session, time) => {
  var dateTime = moment(session).add(time, 'hours');
  cy.clock(new Date(dateTime.format()));
});

describe('Home > Heading', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
  });

  context('When the current time is more than two hours before any session starts', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 2);
    });

    it('Displays a personalized welcome message', () => {
      cy.get('[data-testid=cohort-header]').should(
        'contain',
        '👋 Hi ' + userFixture.user.first_name + ', welcome to your cohort!'
      );
    });
  });

  context('When the current time is less than one hour before any session starts', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 1);
    });

    it('Displays a get ready message for that session', () => {
      cy.get('[data-testid=cohort-header]').should(
        'contain',
        '🔴 Get ready, Session ' + sessionFixture.sessions[0].number + ' is starting soon!'
      );
    });
  });

  context(
    'When a session is completed and current time is more than one hour before the next session starts',
    () => {
      before(() => {
        cy.setClockToAfterSession(sessionFixture.sessions[0].time, 1);
        cy.setClockToBeforeSession(sessionFixture.sessions[1].time, 1);
      });

      it('Displays a personalized Welcome back message', () => {
        cy.get('[data-testid=cohort-header]').should(
          'contain',
          '👋 Welcome back ' +
            userFixture.user.first_name +
            ', we hope you enjoyed Session ' +
            sessionFixture.sessions[0].number
        );
      });
    }
  );

  context('When all Sessions are completed', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[3].times[0], 3);
    });

    it('Displays a personalized Completed message', () => {
      cy.get('[data-testid=cohort-header]').should(
        'contain',
        '🎉 Congratulations, you’ve completed your cohort!'
      );
    });
  });
});
