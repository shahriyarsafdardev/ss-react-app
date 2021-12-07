import sessionFixture from '../../../fixtures/session/sessions.json';
import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';
import moment from 'moment';

Cypress.Commands.add('welcomeText', () => {
  return cy.contains('p', 'Welcome');
});

Cypress.Commands.add('leftArrowIconDisbaled', () => {
  return cy.get('.disabled , [alt="left arrow"]');
});

Cypress.Commands.add('leftArrowIconActive', () => {
  return cy.get('.active , [alt="left arrow"]');
});

Cypress.Commands.add('rightArrowIconDisbaled', () => {
  return cy.get('.disabled , [alt="right arrow"]');
});

Cypress.Commands.add('rightArrowIconActive', () => {
  return cy.get('.active , [alt="right arrow"]');
});

Cypress.Commands.add('cohortCompletionText', () => {
  return cy.contains('p', 'Cohort Completion');
});

Cypress.Commands.add('sessionOneText', () => {
  return cy.contains('p', 'Session 1');
});

Cypress.Commands.add('sessionCompleteText', () => {
  return cy.contains('p', 'Complete');
});

Cypress.Commands.add('reviewContent', () => {
  return cy.contains('a', 'Review Content');
});

Cypress.Commands.add('setClockToBeforeSession', (session, time) => {
  var dateTime = moment(session).subtract(time, 'hours');
  cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('setClockToAfterSession', (session, time) => {
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
    cy.leftArrowIconDisbaled().should('be.visible');
  });
  it('Displays a right arrow icon', () => {
    cy.rightArrowIconActive().should('be.visible');
  });

  it('Displays a cohort completion text', () => {
    cy.rightArrowIconActive().should('be.visible').click({ multiple: true, force: true });
    cy.cohortCompletionText().should('be.visible');
  });

  it('Timeline scrolls to the right when right arrow icon is clicked', () => {
    cy.rightArrowIconActive().should('be.visible').click({ multiple: true, force: true });
    cy.window().its('scrollX').should('equal', 0);
  });

  // it('Timeline scrolls to the left when left arrow icon is clicked', () => {});

  context('When any session is not Completed', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 2);
      cy.setClockToBeforeSession(sessionFixture.sessions[1].time, 2);
    });

    it('Displays a empty timeline between two sesions', () => {});
    it('Displays a empty circle on a session', () => {});
    it('Displays time under the session', () => {});
  });
  // context('When any session is upcoming', () => {
  //   it('Displays the upcoming session in active font', () => {});
  // });
  // context('When a session is Completed', () => {
  //   it('Displays a filled timeline between two sesions', () => {});
  //   it('Displays a filled circle on a session', () => {});
  //   it('Displays a completed text under the completed session', () => {});
  //   it('Displays review content text under the completed session', () => {});
  //   it('Displays the correct session details when clicked on review content', () => {});
  // });
  // context('When all sessions are completed', () => {
  //   it('Displays the completion text in active font', () => {});
  // });
});
