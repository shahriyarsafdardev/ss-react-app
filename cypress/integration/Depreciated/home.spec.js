// import Heading from './Heading';
// import Peerlist from './Peerlist';
// import Timeline from '../pages/Home/Timeline';
// import Todolist from './Todolist';
// import sessionFixture from '../../fixtures/session/sessions.json';
// import moment from 'moment';

// describe('Home page specs', () => {
//   const heading = new Heading();
//   const peerList = new Peerlist();
//   const timeLine = new Timeline();
//   const toDoList = new Todolist();

//   // The text within a describe block should answer the following question: What do the tests within this block relate to?
//   // Examples of good describe blocks include:
//   // It should always be:
//   //      - The name of a specific page or component
//   //      - Or a specific user flow
//   describe('Home Header', () => {
//     beforeEach(() => {
//       cy.server();
//       cy.login();
//     });

//     // The text within a context block should answer the following question: What conditions need to be true for the uocoming assertions to be true
//     // In other words, what conditions need to be true for the upcoming test cases to be relevant
//     // It should always begin with "When"
//     context('When the current time is more than two hours before the first session starts', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).subtract(2, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });

//       // The text within a it block should answer the following question: Without going into specifics, what are we asserting in this block?
//       // It should always begin with a verb
//       it('Displays a welcome messager', () => {
//         heading.text().should.eq('Welcome to the cohort');
//       });
//     });

//     context('Welcome header 2 hours before session', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).subtract(2, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });

//       // What are we actually asserting
//       it('Welcome Header', () => {
//         heading.welcomeCohort().should('be.visible');
//       });
//     });

//     context('Starting soon header less then 1 hour before session', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });

//       it('Starting Soon Header', () => {
//         heading.sessionAbouttoStart().should('be.visible');
//       });
//     });

//     context('After Any Session', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//         var dateTime = moment(sessionFixture.sessions[1].time).subtract(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });

//       it('Welcome Back Header', () => {
//         heading.welcomeBack().should('be.visible');
//       });
//     });

//     context('After All Sessions', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[1].time).add(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });

//       it('C5: Completed header', () => {
//         heading.completedCohort().should('be.visible');
//       });
//     });
//   });

//   describe('Home timeline specs', () => {
//     beforeEach(() => {
//       cy.server();
//       cy.login();
//     });
//     context('2 hours before session', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).subtract(2, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });
//       it('C7: Left arrow icon disabled', () => {
//         timeLine.welcomeText().should('be.visible');
//         timeLine.leftArrowIconDisbaled().should('be.visible');
//       });
//     });

//     context('After All Sessions', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[1].time).add(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });
//       it('C8: Right arrow icon disabled', () => {
//         timeLine.rightArrowIconActive().should('be.visible').click({ multiple: true, force: true });
//         timeLine.cohortCompletionText().should('be.visible');
//         timeLine.rightArrowIconDisbaled().eq(1).should('be.visible');
//       });
//     });

//     context('Session 1 Completed', () => {
//       beforeEach(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//       });

//       it('Session Completed Text', () => {
//         timeLine.sessionOneText().should('be.visible');
//         timeLine.sessionCompleteText().should('be.visible');
//       });

//       it('Review Content Text', () => {
//         timeLine.reviewContent().should('be.visible');
//       });

//       it('Review Content Redirection', () => {
//         timeLine.reviewContent().should('be.visible').click();
//         cy.url().should('contain', 'session=1');
//       });
//     });
//   });

//   describe('Home page todo list specs', () => {});

//   describe('Home page peer list specs', () => {});
// });
