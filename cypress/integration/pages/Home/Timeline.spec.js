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

  context('When the current time is more than two hours before the first session starts', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time,2)
    });

    it('Displays a welcome text in timeline and left arrow icon is disabled', () => {
      cy.welcomeText()
      .should('be.visible');
      cy.leftArrowIconDisbaled()
      .should('be.visible');
    });
  });

  context('When all Sessions are completed', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[1].time,1)
    });

    it('Displays cohort completion text and right arrow icon is disabled', () => {
      cy.rightArrowIconActive()
      .should('be.visible')
      .click({ multiple: true, force: true });
      cy.cohortCompletionText().
      should('be.visible');
      cy.rightArrowIconDisbaled().
      eq(1).
      should('be.visible');
    });
  });

  context('When a session is Completed', () => {
    beforeEach(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[0].time,1)
    });

    it('Displays completed text under the completed session', () => {
      cy.sessionOneText().
      should('be.visible');
      cy.sessionCompleteText().
      should('be.visible');
    });

    it('Displays review content text under the completed session', () => {
      cy.reviewContent().
      should('be.visible');
    });

    it('Displays the correct session details when clicked on review content', () => {
      cy.reviewContent()
      .should('be.visible')
      .click();
      cy.url()
      .should('contain', 'session=1');
    });
  });
});
