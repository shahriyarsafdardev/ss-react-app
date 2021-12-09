import moment from 'moment';
import sessionFixture from '../fixtures/session/sessions.json';
import { sortedTimes } from '../../../../src/components/cohorts/home/Common';

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
  });

  it('Displays a row for each session', () => {
    // assert test it for all row are present
  });

  describe('Sessions > List', () => {
    it('Displays the session details', () => {
      // Assert title, number and length
    });

    context('Before the session starts', () => {
      before(() => {
        cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 12);
        cy.get('#session-list-1').click({ force: true });
      });
      it('Displays an `upcoming` message', () => {});
    });

    context('During the session', () => {
      it('Displays a `recorded` message', () => {});
    });

    context('After the session finishes', () => {
      it('Displays a `recorded` message', () => {});
    });
  });
});
