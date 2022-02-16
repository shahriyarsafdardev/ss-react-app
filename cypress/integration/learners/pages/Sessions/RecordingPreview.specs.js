import moment from 'moment';
import sessionFixture from '../../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../../fixtures/login/login.json';
import {
  sortedTimes,
  firstUpcomingDate,
  zoomTimesPreview
} from '../../../../../src/components/cohorts/home/Common';
import { time } from 'console';

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
  beforeEach(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`)
    .should('be.visible')
    .click({ force: true });
  });

  context('When remaining session time is more than 1 day', () => {
    beforeEach(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[1].times, 3, 'days');
      cy.get('[data-testid=session-list-title-1]').first()
      .click({ force: true });
    });

    it('Displays correct text in message', () => {
      cy.get('[data-testid=upcoming-session-placeholder]')
      .contains('session starts on the');
    });
    it('Displays correct dates in message', () => {
      var sessionDate = moment(firstUpcomingDate(sessionFixture.sessions[1].times))
      .format('Do MMMM');
      cy.get('[data-testid=upcoming-session-placeholder]')
      .contains(sessionDate);
    });
    it('Displays correct times in message', () => {
      var sessionTime = zoomTimesPreview(sessionFixture.sessions[1].times);
      cy.get('[data-testid=upcoming-session-placeholder]')
      .contains(sessionTime);
    });
  });

  context('When remaining session time is less than 1 day', () => {
    beforeEach(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[2].times, 20, 'hours');
      cy.get('[data-testid=session-list-title-2]').first()
      .click({ force: true });
    });

    it('Displays correct time in message', () => {
      var sessionTime= moment(new Date(sessionFixture.sessions[2].times))
      .format('h:mm a')
      cy.get('[data-testid=session-start-time-text]')
      .contains(sessionTime);
    });
    it('Displays correct text in message', () => {
      var sessionTime= moment(new Date(sessionFixture.sessions[2].times))
      .format('h:mm a')
      cy.get('[data-testid=session-start-time-text]')
      .should('contain','The '+ sessionTime +' session is opening soon, come join us!');
    });
    it('Displays a countdown for remaining time', () => {
      cy.get('[data-testid=hours]')
      .should('be.visible')
      cy.get('[data-testid=minutes]')
      .should('be.visible')
      cy.get('[data-testid=seconds]')
      .should('be.visible')
    });
    it('Displays a zoom link button', () => {
      cy.get('[data-testid=session-invite]')
      .should('be.visible')
      .and("have.attr", "href", sessionFixture.sessions[2].zoom_url);
    });
  });

  context('When session live', () => {
    beforeEach(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[2].times, 10, 'minutes');
      cy.get('[data-testid=session-list-title-2]').first()
      .click({ force: true });
    });

    it('Displays correct time in message', () => {
      var sessionTime= moment(new Date(sessionFixture.sessions[2].times)).format('h:mm a')
      cy.get('[data-testid="session-time-text"]').contains(sessionTime);
    });
    it('Displays correct text in message', () => {
      var sessionTime= moment(new Date(sessionFixture.sessions[2].times)).format('h:mm a')
      cy.get('[data-testid="session-time-text"]').should('contain','The '+sessionTime+' Session is live now!');
    });
    it('Displays a zoom link button', () => {
      cy.get('[data-testid=session-invite]')
      .should('be.visible')
      .and("have.attr", "href", sessionFixture.sessions[2].zoom_url);
    });
  });

  context('When session has ended and recording is not uploaded', () => {
    beforeEach(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[2].times, 2, 'hours');
      cy.get('[data-testid=session-list-title-2]').first()
      .click({ force: true });
    });

    it('Displays correct message', () => {
      cy.get('[data-testid=session-ended]')
      .contains('This live session has finished, the recording will be available soon!');
    });
  });

  context('When session has passed and recording is uploaded', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[0].times, 3, 'hours');
    });

    it('Displays a video component', () => {
      cy.get('[data-testid=session-video-url]')
      .should('be.visible')
    });
    it('Video component has correct recording url', () => {
      cy.get('[data-testid=session-video-url]')
      .should("have.attr", "src", sessionFixture.sessions[0].recording_urls[0].recording_url);
    });
  });
});
