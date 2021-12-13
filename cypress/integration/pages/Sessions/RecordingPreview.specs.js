// import moment from 'moment';
// import sessionFixture from '../../../fixtures/session/sessions.json';
// import {
//   sortedTimes,
//   firstUpcomingDate,
//   zoomTimesPreview
// } from '../../../../src/components/cohorts/home/Common';

// Cypress.Commands.add('setClockToBeforeSession', (times, hours, type) => {
//   const sorted = sortedTimes(times);
//   var dateTime = moment(sorted[0]).subtract(hours, type);
//   cy.clock(new Date(dateTime.format()));
// });
// Cypress.Commands.add('setClockToAfterSession', (times, hours, type) => {
//   const sorted = sortedTimes(times);
//   var dateTime = moment(sorted[sorted.length - 1]).add(hours, type);
//   cy.clock(new Date(dateTime.format()));
// });

// describe('Sessions > RecordingsPreview', () => {
//   before(() => {
//     cy.server();
//     cy.login();
//     cy.get('#sessions-1').click({ multiple: true, force: true });
//   });

//   context('When remaining session time is more than 1 day', () => {
//     before(() => {
//       cy.get('#session-list-1').click({ force: true });
//       cy.setClockToBeforeSession(sessionFixture.sessions[1].time, 3, 'days');
//     });

//     it('Displays correct text in message', () => {
//       cy.get('[data-testid=upcoming-session-placeholder]').contains('session starts on the');
//     });
//     it('Displays correct dates in message', () => {
//       var sessionDate = moment(firstUpcomingDate(sessionFixture.sessions[1].times)).format(
//         'Do MMMM'
//       );
//       cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionDate);
//     });
//     it('Displays correct times in message', () => {
//       var sessionTime = zoomTimesPreview(sessionFixture.sessions[1  ].times);
//       cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionTime);
//     });
//   });

//   // context('When remaining session time is less than 1 day', () => {
//   //   before(() => {
//   //     cy.setClockToBeforeSession(sessionFixture.sessions[0].time, 12, 'hours');
//   //   });

//   //   it('Displays correct time in message', () => {});
//   //   it('Displays correct text in message', () => {});
//   //   it('Displays a countdown for remaining time', () => {});
//   //   it('Displays a zoom link button', () => {});
//   // });

//   // context('When session live', () => {
//   //   before(() => {
//   //     cy.setClockToAfterSession(sessionFixture.sessions[0].time, 20, 'minutes');
//   //   });

//   //   it('Displays correct time in message', () => {});
//   //   it('Displays correct text in message', () => {});
//   //   it('Displays a zoom link button', () => {});
//   // });

//   // context('When session has ended and recording is not uploaded', () => {
//   //   before(() => {
//   //     cy.setClockToAfterSession(sessionFixture.sessions[0].time, 2, 'hours');
//   //   });

//   //   it('Displays correct message', () => {});
//   // });

//   // context('When session has passed and recording is uploaded', () => {
//   //   before(() => {
//   //     cy.setClockToAfterSession(sessionFixture.sessions[0].time, 3, 'hours');
//   //   });

//   //   it('Displays a video component message', () => {});
//   //   it('Video component has correct recording url', () => {});
//   // });
// });
