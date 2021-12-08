import moment from 'moment';
import sessionFixture from '../fixtures/session/sessions.json';
import { sortedTimes } from '../../../../src/components/cohorts/home/Common';

Cypress.Commands.add('setClockToBeforeSession', (times, hours, type) => {
  const sorted = sortedTimes(times);
  var dateTime = moment(sorted[0]).subtract(hours, type);
  cy.clock(new Date(dateTime.format()));
});
Cypress.Commands.add('setClockToAfterSession', (times, hours, type) => {
  const sorted = sortedTimes(times);
  var dateTime = moment(sorted[sorted.length - 1]).add(hours, type);
  cy.clock(new Date(dateTime.format()));
});

describe('Sessions > RecordingsPreview', () => {
  before(() => {
    cy.server();
    cy.login();
  });

  context('When remaining session time is more than 1 day', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 3, 'days');
      cy.get('#session-list-1').click({ force: true });
    });

    it('Displays correct text in message', () => {});
    it('Displays correct dates in message', () => {});
    it('Displays correct times in message', () => {});
  });

  context('When remaining session time is less than 1 day', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 12, 'hours');
    });

    it('Displays correct time in message', () => {});
    it('Displays correct text in message', () => {});
    it('Displays a countdown for remaining time', () => {});
    it('Displays a zoom link button', () => {});
  });

  context('When session live', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[0].time, 20, 'minutes');
    });

    it('Displays correct time in message', () => {});
    it('Displays correct text in message', () => {});
    it('Displays a zoom link button', () => {});
  });

  context('When session has ended and recording is not uploaded', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[0].time, 2, 'hours');
    });

    it('Displays correct message', () => {});
  });

  context('When session has passed and recording is uploaded', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[0].time, 3, 'hours');
    });

    it('Displays a video component message', () => {});
    it('Video component has correct recording url', () => {});
  });
});
