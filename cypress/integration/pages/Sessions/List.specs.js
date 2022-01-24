import moment from 'moment';
import sessionFixture from '../../../fixtures/session/sessions.json';
import { firstUpcomingDate, sortedTimes } from '../../../../src/components/cohorts/home/Common';
import cohorts_fixture from '../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../fixtures/login/login.json';
import { waitForDebugger } from 'inspector';

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
  beforeEach(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].intake_name}-${cohorts_fixture.cohorts[0].name}-sessions"]`)
    .should('be.visible')
    .click();
    //cy.visit(`/cohorts/${sessionFixture.cohort_id}/sessions`);
  });

  it('Displays all sessions that are allowed to display in Session Tab', () => {
    const sessions = sessionFixture.sessions.filter((session) => {
      return session.display_in_sessions_tab === true;
    });
    cy.get('#sessions-list-container')
    .children()
    .should('have.length', sessions?.length);
  });

  it('Displays the correct length of sessions', () => {
    const session = sessionFixture.sessions[0];
    cy.get('[data-testid=session-list-number-0]')
    .should('contain',`Session ${session.number} | ${session.length}`);
  });

  it('Displays correct number of each session', () => {
    cy.get('[data-testid=session-list-number-0]')
    .should('contain',sessionFixture.sessions[0].number);
    cy.get('[data-testid=session-list-number-1]')
    .should('contain',sessionFixture.sessions[1].number);
    cy.get('[data-testid=session-list-number-2]')
    .should('contain',sessionFixture.sessions[2].number);
  });

  it('Displays correct title of each session', () => {
    cy.get('[data-testid=session-list-title-0]')
    .should('contain', sessionFixture.sessions[0].name);
    cy.get('[data-testid=session-list-title-1]')
    .should('contain', sessionFixture.sessions[1].name);
    cy.get('[data-testid=session-list-title-2]')
    .should('contain', sessionFixture.sessions[2].name);
  });

  context('Before the session starts', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[1].times, 12);
      cy.get('#session-list-1')
      .click({ force: true });
    });
    it('Shows the correct time and message', () => {
      cy.get('[data-testid=session-list-time-container-1]')
      .should('contain', 'Live in 12 hours');
    });
  });

  context('During the session', () => {
    const time = sessionFixture.sessions[0].time;
    before(() => {
      var dateTime = moment(time).add(30, 'minutes');
      cy.clock(new Date(dateTime.format()));
      cy.get('#session-list-0').click({ force: true });
    });

    it('Displays a correct time and message', () => {
      const msg = `Live 30 minutes ago | ${moment(time).format('DD MMMM YYYY')}`;
      cy.get('[data-testid=session-list-time-container-0]')
      .contains(msg);
    });
  });

  context('After the session finishes', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[0].times, 12);
      cy.get('#session-list-2')
      .click({ force: true });
    });
    it('Shows the correct time and message', () => {
      cy.get('[data-testid=session-list-time-container-0]')
      .should('contain',`Recorded on ${moment(firstUpcomingDate(sessionFixture.sessions[0].times)).format('DD MMMM YYYY')}`);
    });
  });
});
