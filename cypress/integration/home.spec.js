import Heading from './pages/Home/Heading'
import Peerlist from './pages/Home/Peerlist'
import Timeline from './pages/Home/Timeline'
import Todolist from './pages/Home/Todolist'
import sessionFixture from '../fixtures/session/sessions.json';
import moment from 'moment';

describe('Home page specs', () => {
  const heading = new Heading()
  const peerList = new Peerlist()
  const timeLine = new Timeline()
  const toDoList= new Todolist()

  describe('Home header specs', () => {
    beforeEach(() => {
      cy.server();
      cy.login();
    })

    context('Welcome header 2 hours before session', () => {
      before(() => {
        var dateTime = moment(sessionFixture.sessions[0].time).subtract(2, 'hours');
        cy.clock(new Date(dateTime.format()));
      });

      it('Welcome Header', () => {
        heading.welcomeCohort().should('be.visible')
      });
    })

    context('Starting soon header less then 1 hour before session', () => {
      before(() => {
        var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
        cy.clock(new Date(dateTime.format()));
      });

      it('Starting Soon Header', () => {
        heading.sessionAbouttoStart().should('be.visible')
      });
    })

    context('After Any Session', () => {
      before(() => {
        var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
        cy.clock(new Date(dateTime.format()));
        var dateTime = moment(sessionFixture.sessions[1].time).subtract(1, 'hours');
        cy.clock(new Date(dateTime.format()));
      });

      it('Welcome Back Header', () => {
        heading.welcomeBack().should('be.visible')
      });
    })

    context('After All Sessions', () => {
      before(() => {
        var dateTime = moment(sessionFixture.sessions[1].time).add(1, 'hours');
        cy.clock(new Date(dateTime.format()));
      });

      it('C5: Completed header', () => {
        heading.completedCohort().should('be.visible')
      });
    })
  })

  describe('Home timeline specs', () => {
    beforeEach(() => {
      cy.server();
      cy.login();
    })
    context('2 hours before session', () => {
      before(() => {
        var dateTime = moment(sessionFixture.sessions[0].time).subtract(2, 'hours');
        cy.clock(new Date(dateTime.format()));
      });
      it('C7: Left arrow icon disabled', () => {
        timeLine.welcomeText().should('be.visible')
        timeLine.leftArrowIconDisbaled().should('be.visible')
      });
    })

    context('After All Sessions', () => {
      before(() => {
        var dateTime = moment(sessionFixture.sessions[1].time).add(1, 'hours');
        cy.clock(new Date(dateTime.format()));
      });
      it('C8: Right arrow icon disabled', () => {
        timeLine.rightArrowIconActive().should('be.visible').click({ multiple: true, force: true })
        timeLine.cohortCompletionText().should('be.visible')
        timeLine.rightArrowIconDisbaled().eq(1).should('be.visible')
      });
    })

    context('Session 1 Completed', () => {
      beforeEach(() => {
        var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
        cy.clock(new Date(dateTime.format()));
      });

      it('Session Completed Text', () => {
        timeLine.sessionOneText().should('be.visible')
        timeLine.sessionCompleteText().should('be.visible')
      });

      it('Review Content Text', () => {
        timeLine.reviewContent().should('be.visible')
      });

      it('Review Content Redirection', () => {
        timeLine.reviewContent().should('be.visible').click()
        cy.url().should('contain', 'session=1')
      });
    })

  })

  describe('Home page todo list specs', () => {

  })

  describe('Home page peer list specs', () => {

  })
})
