import sessionFixture from '../../../fixtures/session/sessions.json';
import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json'
import moment from 'moment';

Cypress.Commands.add('welcomeText', () => {
  return cy.contains('p', 'Welcome')
});

Cypress.Commands.add('leftArrowIconDisbaled', () => {
  return cy.get('.disabled , [alt="left arrow"]')
});

Cypress.Commands.add('rightArrowIconDisbaled', () => {
  return cy.get('.disabled , [alt="right arrow"]')
});

Cypress.Commands.add('rightArrowIconActive', () => {
  return cy.get('.active , [alt="right arrow"]')
});

Cypress.Commands.add('cohortCompletionText', () => {
  return cy.contains('p', 'Cohort Completion')
});

Cypress.Commands.add('sessionOneText', () => {
  return cy.contains('p', 'Session 1')
});

Cypress.Commands.add('sessionCompleteText', () => {
  return cy.contains('p', 'Complete')
});

Cypress.Commands.add('reviewContent', () => {
  return cy.contains('a', 'Review Content')
});

Cypress.Commands.add('setClockToBeforeSession', (session, time)=> {
  var dateTime = moment(session).subtract(time, 'hours');
      cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('setClockToAfterSession', (session, time)=> {
  var dateTime = moment(session).add(time, 'hours');
      cy.clock(new Date(dateTime.format()));
});

describe('Home > Timeline', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });
  it('Displays a welcome text in timeline', () => {
    cy.welcomeText().should('be.visible');
  });
  it('Displays a left arrow icon', () => {
    cy.leftArrowIcon().should('have.class', 'disabled').and('be.visible');
  });
  it('Displays a right arrow icon', () => {
    cy.rightArrowIcon().should('have.class', 'active').and('be.visible');
  });
  it('Displays a cohort completion text', () => {
    cy.rightArrowIcon()
      .should('have.class', 'active')
      .and('be.visible')
      .click({ multiple: true, force: true });
    cy.cohortCompletionText().should('be.visible');
  });
  it('Timeline scrolls to the right when right arrow icon is clicked', () => {
    cy.rightArrowIcon()
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
    cy.rightArrowIcon()
      .should('have.class', 'active')
      .and('be.visible')
      .click({ multiple: true, force: true });
    cy.leftArrowIcon()
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
        .and('eq', 'rgb(234, 234, 240)');
    });
    // it('Displays a empty circle on a session', () => {
    //   cy.circleIndicatingIncompleteSession(sessionNumber).should('be.visible');
    // });
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
        .and('eq', 'rgb(7, 26, 51)') &&
        cy.timeBelowIncompleteSession(upcomingSessionNumber).should('be.visible') &&
        cy
          .dateBelowIncompleteSession(upcomingSessionNumber)
          .should('have.css', 'color')
          .and('eq', 'rgb(7, 26, 51)') &&
        cy.dateBelowIncompleteSession(upcomingSessionNumber).should('be.visible') &&
        cy.sessionText(upcomingSessionNumber).should('be.visible') &&
        cy
          .sessionText(upcomingSessionNumber)
          .should('have.css', 'color')
          .and('eq', 'rgb(7, 26, 51)');
    });
  });
  context('When a session is Completed', () => {
    const completedSessionNumber = 0;
    beforeEach(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });
    it('Displays a completed text under the completed session', () => {
      cy.sessionCompleteText(completedSessionNumber).should('be.visible');
    });
    it('Displays review content text under the completed session', () => {
      cy.reviewContent(completedSessionNumber).should('be.visible');
    });
    it('Displays the correct session details when clicked on review content', () => {
      cy.reviewContent(completedSessionNumber).click();
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
        .and('eq', 'linear-gradient(90deg, rgba(0, 171, 85, 0.2) 0%, rgb(0, 171, 85) 119.74%)');
    });
  });
  context('When a session is Completed and circle is filled', () => {
    const completedSessionNumber = 1;
    before(() => {
      cy.setClockToAfterSession(getTimes(completedSessionNumber));
    });
    // it('Displays a filled circle on a session', () => {
    //   cy.circleIndicatingCompleteSession(completedSessionNumber).should('be.visible');
    // });
  });
  context('When all sessions are completed', () => {
    before(() => {
      cy.setClockToAfterSession(getTimes(2));
    });
    it('Displays the completion text in active font', () => {
      cy.cohortCompletionText().should('have.css', 'color').and('eq', 'rgb(7, 26, 51)');
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
