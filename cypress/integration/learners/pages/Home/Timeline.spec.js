import sessionFixture from '../../../../fixtures/session/sessions.json';
import {
  displayMultipleDates,
  formatMultipleTimes,
  sortedTimes
} from '../../../../../src/components/cohorts/home/Common';
import moment from 'moment';

const getTimes = (sessionNumber) => {
  return sessionFixture.sessions[sessionNumber].times;
};

Cypress.Commands.add('sessionText', (sessionNumber) => {
  return cy.get(`[data-testid=session-name-${sessionNumber + 1}]`);
});

Cypress.Commands.add('sessionCompleteText', (sessionNumber) => {
  return cy.get(`[data-testid=session-time-${sessionNumber + 1}]`).should('contain', 'Complete');
});

Cypress.Commands.add('reviewContent', (sessionNumber) => {
  cy.get(`[data-testid=session-review-content-${sessionNumber + 1}]`);
});

Cypress.Commands.add('setClockToBeforeSession', (times) => {
  const sorted = sortedTimes(times);
  var dateTime = moment(sorted[0]).subtract(2, 'hours');
  cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('setClockToAfterSession', (times) => {
  const sorted = sortedTimes(times);
  var dateTime = moment(sorted[sorted.length - 1]).add(2, 'hours');
  cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('connectorLineBetweenTwoSessions', () => {
  return cy.get('[data-testid=cohort-timeline-connector]').children();
});

Cypress.Commands.add('circleIndicatingSession', (sessionNumber) => {
  cy.get(`[data-testid=timeline-step-icon-${sessionNumber + 1}]`);
});

Cypress.Commands.add('circleIndicatingIncompleteSession', (sessionNumber) => {
  cy.circleIndicatingSession(sessionNumber).should('have.class', 'QontoStepIcon-circle');
});

Cypress.Commands.add('circleIndicatingCompleteSession', (sessionNumber) => {
  cy.circleIndicatingSession(sessionNumber).should('have.class', 'QontoStepIcon-completedIcon');
});

Cypress.Commands.add('timeBelowIncompleteSession', (sessionNumber) => {
  cy.get(`[data-testid=session-time-${sessionNumber + 1}]`);
});

Cypress.Commands.add('dateBelowIncompleteSession', (sessionNumber) => {
  cy.get(`[data-testid=session-multiple-dates-${sessionNumber + 1}]`);
});

describe('Home > Timeline', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
  });

  it('Displays a welcome text in timeline', () => {
    cy.get('[data-testid=timeline-welcome]').should('be.visible');
  });

  it('Displays a left arrow icon', () => {
    cy.get('[data-testid=left-arrow-icon]').should('have.class', 'disabled').and('be.visible');
  });

  it('Displays a right arrow icon', () => {
    cy.get('[data-testid=right-arrow-icon]').should('have.class', 'active').and('be.visible');
  });

  it('Displays a cohort completion text', () => {
    cy.get('[data-testid=right-arrow-icon]')
      .should('have.class', 'active')
      .and('be.visible')
      .click({ multiple: true, force: true });
    cy.get('[data-testid=cohort-completion]').should('be.visible');
  });

  it('Timeline scrolls to the right when right arrow icon is clicked', () => {
    cy.get('[data-testid=right-arrow-icon]')
      .should('have.class', 'active')
      .and('be.visible')
      .click({ multiple: true, force: true });
    cy.wait(1000);
    cy.get('#timeline-div').then((elem) => {
      const leftOffset = elem.scrollLeft();
      expect(leftOffset).to.not.equal(0);
    });
  });

  it('Timeline scrolls to the left when left arrow icon is clicked', () => {
    cy.get('[data-testid=right-arrow-icon]')
      .should('have.class', 'active')
      .and('be.visible')
      .click({ multiple: true, force: true });
    cy.get('[data-testid=left-arrow-icon]')
      .should('have.class', 'active')
      .and('be.visible')
      .click({ multiple: true, force: true });
    cy.wait(1000);
    cy.get('#timeline-div').then((elem) => {
      const leftOffset = elem.scrollLeft();
      expect(leftOffset).to.equal(0);
    });
  });

  context('When any session is not Completed', () => {
    const sessionNumber = 0;
    beforeEach(() => {
      cy.setClockToBeforeSession(getTimes(sessionNumber));
    });

    it('Displays a empty timeline between two sessions', () => {
      cy.connectorLineBetweenTwoSessions()
        .should('have.css', 'background-color')
        .and('eq', 'rgb(241, 245, 249)');
    });

    it('Displays a empty circle on a session', () => {
      cy.circleIndicatingIncompleteSession(sessionNumber).should('be.visible');
    });

    it('Displays time under the session', () => {
      cy.timeBelowIncompleteSession(sessionNumber).should('be.visible') &&
        cy.dateBelowIncompleteSession(sessionNumber).should('be.visible');
    });
  });

  context('When any session is upcoming', () => {
    const upcomingSessionNumber = 0;
    before(() => {
      cy.setClockToBeforeSession(getTimes(upcomingSessionNumber));
    });

    it('Displays the upcoming session in active font', () => {
      cy
        .timeBelowIncompleteSession(upcomingSessionNumber)
        .should('have.css', 'color')
        .and('eq', 'rgb(100, 116, 139)') &&
        cy.timeBelowIncompleteSession(upcomingSessionNumber).should('be.visible') &&
        cy
          .dateBelowIncompleteSession(upcomingSessionNumber)
          .should('have.css', 'color')
          .and('eq', 'rgb(100, 116, 139)') &&
        cy.dateBelowIncompleteSession(upcomingSessionNumber).should('be.visible') &&
        cy.sessionText(upcomingSessionNumber).should('be.visible') &&
        cy
          .sessionText(upcomingSessionNumber)
          .should('have.css', 'color')
          .and('eq', 'rgb(71, 85, 105)');
    });
  });

  context('When a session is Completed', () => {
    const completedSessionNumber = 0;
    before(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });

    it('Displays a completed text under the completed session', () => {
      cy.sessionCompleteText(completedSessionNumber).should('be.visible');
    });
  });

  context('When a session is Completed', () => {
    const completedSessionNumber = 0;
    before(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });

    it('Displays review content text under the completed session', () => {
      cy.reviewContent(completedSessionNumber).should('be.visible');
    });
  });

  context('When a session is Completed', () => {
    const completedSessionNumber = 0;
    before(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });

    it('Displays the correct session details when clicked on review content', () => {
      cy.reviewContent(completedSessionNumber).click({ multiple: true, force: true });
      cy.url().should('contain', `session=${completedSessionNumber + 1}`);
    });
  });

  context('When a session is Completed and timeline is filled', () => {
    const completedSessionNumber = 1;
    before(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });
    it('Displays a filled timeline between two sessions', () => {
      cy.connectorLineBetweenTwoSessions()
        .should('have.css', 'background-image')
        .and('eq', 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(18, 18, 92) 119.74%)');
    });
  });

  context('When a session is Completed and circle is filled', () => {
    const completedSessionNumber = 1;
    before(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });

    it('Displays a filled circle on a session', () => {
      cy.circleIndicatingCompleteSession(completedSessionNumber).should('be.visible');
    });
  });

  context('When all sessions are completed', () => {
    before(() => {
      cy.setClockToAfterSession(getTimes(3));
    });

    it('Displays the completion text in active font', () => {
      cy.get('[data-testid=cohort-completion]')
        .should('have.css', 'color')
        .and('eq', 'rgb(71, 85, 105)');
    });
  });

  context('When a session have multiple time streams on same day', () => {
    const completedSessionNumber = 0;
    const sameDayMultipleTimesSession = 0;
    beforeEach(() => {
      cy.setClockToBeforeSession(getTimes(completedSessionNumber));
    });

    it('Display MultipleTimes', () => {
      const times = formatMultipleTimes(getTimes(sameDayMultipleTimesSession));
      cy.timeBelowIncompleteSession(sameDayMultipleTimesSession).should('contain', times);
    });

    it('Display MultipleDates', () => {
      const dates = displayMultipleDates(getTimes(sameDayMultipleTimesSession));
      cy.dateBelowIncompleteSession(sameDayMultipleTimesSession).should('contain', dates);
    });
  });

  context('When a session have multiple time streams on different days', () => {
    const completedSessionNumber = 0;
    const differentDayMultipleTimesSession = 1;
    beforeEach(() => {
      cy.setClockToBeforeSession(getTimes(completedSessionNumber));
    });

    it('Display MultipleTimes', () => {
      const times = formatMultipleTimes(getTimes(differentDayMultipleTimesSession));
      cy.timeBelowIncompleteSession(differentDayMultipleTimesSession).should('contain', times);
    });

    it('Display MultipleDates', () => {
      const dates = displayMultipleDates(getTimes(differentDayMultipleTimesSession));
      cy.dateBelowIncompleteSession(differentDayMultipleTimesSession).should('contain', dates);
    });
  });
});
