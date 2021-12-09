import moment from 'moment';
import sessionFixture from '../../../fixtures/session/sessions.json';
import { firstUpcomingDate, sortedTimes } from '../../../../src/components/cohorts/home/Common';

Cypress.Commands.add('setClockToBeforeSession', (times, hours) => {
  const sorted = sortedTimes(times);
  var dateTime = moment(sorted[0]).subtract(hours, 'hours');
  cy.clock(new Date(dateTime.format()));
});
Cypress.Commands.add('setClockToAfterSession', (times, hours) => {
  const sorted = sortedTimes(times);
  var dateTime = moment(sorted[sorted.length - 1]).add(hours, 'hours');
  cy.clock(new Date(dateTime.format()));
});

describe('Sessions > List', () => {
  before(() => {
    cy.server();
    cy.login();
    cy.get('#sessions-1').click({ multiple: true, force: true });
  });

  it('Displays a row for each session', () => {
    // assert test it for all row are present
  });
  it('Displays the session details', () => {
    // Assert title, number and length
  });

  it('Displays the correct number of sessions', () => {});
  it('Displays correct title of each session', () => {
    cy.get('[data-testid=session-list-number-0]').should(
      'contain',
      sessionFixture.sessions[0].number
    );
    cy.get('[data-testid=session-list-number-1]').should(
      'contain',
      sessionFixture.sessions[1].number
    );
  });

  it('Displays correct number of each session', () => {
    cy.get('[data-testid=session-list-title-0]').should('contain', sessionFixture.sessions[0].name);
    cy.get('[data-testid=session-list-title-1]').should('contain', sessionFixture.sessions[1].name);
  });

  context('Before the session starts', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[1].times, 12);
      cy.get('#session-list-1').click({ force: true });
    });
    it('Shows the correct time and message', () => {
      cy.get('[data-testid=session-list-time-container-1]').should('contain', 'Live in 12 hours');
    });
    it('Displays an `upcoming` message', () => {});
  });

  context('During the session', () => {
    it('Displays a `recorded` message', () => {});
  });

  context('After the session finishes', () => {
    it('Shows the correct time and message', () => {
      cy.get('[data-testid=session-list-time-container-0]').should(
        'contain',
        `Recorded on ${moment(firstUpcomingDate(sessionFixture.sessions[0].times)).format(
          'DD MMMM YYYY'
        )}`
      );
    });
  });
});
