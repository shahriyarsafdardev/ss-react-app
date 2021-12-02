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

  describe('Home page timeline specs', () => {
    it('C7: The left arrow icon in the progress bar should be disabled if welcome text is visible in progress bar', () => {
    });

    it('C8: The right arrow icon in the progress bar should be disabled if Cohort Completion text is visible in progress bar', () => {
    });

    it('C9: The left arrow icon in the progress bar should be enabled if welcome text is not visible in progress bar', () => {
    });

    it('C10: The right arrow icon in the progress bar should be enabled if Cohort Completion is not visible in progress bar', () => {
    });

  })

  describe('Home page todo list specs', () => {

  })

  describe('Home page peer list specs', () => {

  })
})
