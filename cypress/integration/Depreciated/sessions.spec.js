// import moment from 'moment';

// const videoCameraIcon = '/static/icons/ic_recorder.svg';
// const clockIcon = '/static/icons/ic_clock.svg';

// const populatedSession = 1; // The resources, summary notes, slides and recording are set to null in this fixture
// const emptySession = 0; // The resources, summary notes, slides and recording are present in this fixture

// import sessionFixture from '../../fixtures/session/sessions.json';

// describe('Sessions Tab', () => {
//   before(() => {
//     cy.server();
//     cy.login();
//   });

//   describe('Sessions List', () => {
//     it('Lists the session number of each session', () => {
//       cy.get('[data-testid=session-list-number-0]').should(
//         'contain',
//         sessionFixture.sessions[0].number
//       );
//       cy.get('[data-testid=session-list-number-1]').should(
//         'contain',
//         sessionFixture.sessions[1].number
//       );
//     });

//     it('Lists the title of each session', () => {
//       cy.get('[data-testid=session-list-title-0]').should(
//         'contain',
//         sessionFixture.sessions[0].name
//       );
//       cy.get('[data-testid=session-list-title-1]').should(
//         'contain',
//         sessionFixture.sessions[1].name
//       );
//     });

//     context('Before the session starts', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//         cy.get('#session-list-1').click({ force: true });
//       });

//       it('Shows a clock icon', () => {
//         cy.get('[data-testid=session-icon-0]').should('have.attr', 'src').and('equal', clockIcon);
//       });

//       it('Shows the correct info message', () => {
//         cy.get('[data-testid=session-list-time-container-0]').should('contain', 'Live in an hour');
//       });
//     });

//     context('After the session finishes', () => {
//       before(() => {
//         var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
//         cy.clock(new Date(dateTime.format()));
//         cy.get('#session-list-0').click({ force: true });
//       });

//       it('Shows a video camera icon', () => {
//         cy.get('[data-testid=session-icon-0]')
//           .should('have.attr', 'src')
//           .and('equal', videoCameraIcon);
//       });

//       it('Shows the correct info message', () => {
//         cy.get('[data-testid=session-list-time-container-0]').should(
//           'contain',
//           'Recorded on 27 September 2021'
//         );
//       });
//     });
//   });

//   describe('Session Content View', () => {
//     describe('Session Main Display', () => {
//       context('Multiple days before the session', () => {
//         before(() => {
//           cy.get('#session-list-1').click({ force: true });
//           var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
//           cy.clock(new Date(dateTime.format()));
//           cy.get('#session-list-0').click({ force: true });
//         });

//         it('Shows the correct info message', () => {
//           cy.get('[data-testid=video-place-holder]').contains('This session is starting soon!');
//         });

//         it('Shows the session countdown', () => {
//           cy.get('[data-testid=hours]').should('have.text', '01');
//           cy.get('[data-testid=minutes]').should('have.text', '00');
//           cy.get('[data-testid=seconds]').should('have.text', '00');
//         });

//         it('Shows the invite link', () => {
//           cy.get('[data-testid=session-invite]')
//             .should('have.attr', 'href')
//             .and('equal', sessionFixture.sessions[0].zoom_url);
//         });
//       });

//       context('One day before the session starts', () => {
//         before(() => {
//           cy.get('#session-list-1').click({ force: true });
//           var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'days');
//           cy.clock(new Date(dateTime.format()));
//           cy.get('#session-list-0').click({ force: true });
//         });

//         it('Shows the correct info message', () => {
//           cy.get('[data-testid=upcoming-session-placeholder]').contains(
//             'This session starts on the'
//           );
//         });

//         it('Shows the start date', () => {
//           const currentSessionDate = moment(sessionFixture.sessions[0].time);
//           var sessionDate = currentSessionDate.format('Do MMMM');
//           var sessionTime = currentSessionDate.format('HH:mm');

//           cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionDate);
//           cy.get('[data-testid=upcoming-session-placeholder]').contains(sessionTime);
//         });
//       });

//       context('During the session', () => {
//         before(() => {
//           cy.get('#session-list-1').click({ force: true });

//           var dateTime = moment(sessionFixture.sessions[0].time).add(30, 'minutes');
//           cy.clock(new Date(dateTime.format()));
//           cy.get('#session-list-0').click({ force: true });
//         });

//         it('Shows the correct info message', () => {
//           cy.get('[data-testid=video-place-holder]').contains(
//             'The session has already started, access the link below to join!'
//           );
//         });

//         it('Shows the invite link', () => {
//           cy.get('[data-testid=session-invite]')
//             .should('have.attr', 'href')
//             .and('equal', sessionFixture.sessions[0].zoom_url);
//         });
//       });

//       context('After the session', () => {
//         before(() => {
//           cy.get('#session-list-1').click({ force: true });
//           var dateTime = moment(sessionFixture.sessions[0].time).add(5, 'hours');
//           cy.clock(new Date(dateTime.format()));
//           cy.get('#session-list-0').click({ force: true });
//         });

//         it('Shows the correct info message', () => {
//           cy.get('[data-testid=session-ended]').should(
//             'have.text',
//             'This live session has finished, the recording will be available soon!'
//           );
//         });
//       });

//       context('After the recording has been uploaded', () => {
//         before(() => {
//           cy.clock().invoke('restore');
//           cy.get('#session-list-1').click({ force: true });
//         });

//         it('Shows the session recording in a video player', () => {
//           // cy.get('[data-testid=session-video]').should('be.visible');
//           cy.get('[data-testid=session-video-url]')
//             .should('have.attr', 'src')
//             .and('equal', sessionFixture.sessions[1].recording_url);
//           cy.get('[data-testid=session-video-url]')
//             .should('have.attr', 'poster')
//             .and('equal', sessionFixture.sessions[1].recording_thumbnail_url);
//         });
//       });
//     });
//   });

//   describe('Resources Tab', () => {
//     before(() => {
//       cy.get(`#session-list-${populatedSession}`).click({ force: true });
//     });

//     context('When the resources are present', () => {
//       it('Renders the provided html', () => {
//         cy.get('[data-testid=session-description]').then((description) => {
//           const html = description.html();
//           expect(html).to.eq(sessionFixture.sessions[1].description);
//         });
//       });
//     });

//     context('When the resources are not present', () => {
//       it('Renders the correct info message', () => {
//         cy.get(`#session-list-${emptySession}`).click({ force: true });
//         cy.get('[data-testid=session-message]').should(
//           'have.text',
//           'The session resources will be available 2 days before the session.'
//         );
//       });
//     });
//   });

//   describe('Summary Tab', () => {
//     context('When a summary are present', () => {
//       before(() => {
//         cy.get(`#session-list-${populatedSession}`).click({ force: true });
//         cy.get('[data-testid=session-notes]').click();
//       });

//       it('Renders the provided html', () => {
//         cy.get('[data-testid=summary-notes]').then((summary) => {
//           const html = summary.html();
//           expect(html).to.eq(sessionFixture.sessions[1].summary);
//         });
//       });
//     });

//     context('When a summary is not present', () => {
//       before(() => {
//         cy.get(`#session-list-${emptySession}`).click({ force: true });
//         cy.get('[data-testid=session-notes]').click();
//       });

//       it('Renders the correct info message', () => {
//         cy.get('[data-testid=session-message]').should(
//           'have.text',
//           'The session summary will be available shortly after this session.'
//         );
//       });
//     });
//   });

//   describe('Session Slides Tab', () => {
//     context('When the session slides are present', () => {
//       before(() => {
//         cy.get(`#session-list-${populatedSession}`).click({ force: true });
//         cy.get('[data-testid=session-slides]').click();
//       });

//       it('Renders the pdf viewer component', () => {
//         cy.get('.react-pdf__Page__canvas', { timeout: 40000 }).should('be.visible');
//       });

//       it('Allows users to navigate left and right', () => {
//         cy.get('[data-testid=slides-right]').click();
//         cy.get('[data-testid=slides-page-number]').should('have.value', '2');
//         cy.get('[data-testid=slides-left]').click();
//         cy.get('[data-testid=slides-page-number]').should('have.value', '1');
//       });

//       it('Allows users to enter full screen', () => {
//         cy.get('[data-testid=slides-full-screen]').should('be.visible');
//       });
//       it('Shows the download button', () => {
//         cy.get('[data-testid=pdf-download-button]')
//           .should('have.attr', 'href')
//           .and('equal', sessionFixture.sessions[1].presentation_pdf_url);
//       });

//       context('When session.presentation_pdf_downloadable == false', () => {
//         before(() => {
//           cy.get(`#session-list-${2}`).click({ force: true });
//           cy.get('[data-testid=session-slides]').click();
//         });
//         it('Hides the download button', () => {
//           cy.get('[data-testid=pdf-download-button]').should('not.exist');
//         });
//       });
//     });

//     context('When the session slides are not present', () => {
//       before(() => {
//         cy.get(`#session-list-${emptySession}`).click({ force: true });
//         cy.get('[data-testid=session-slides]').click();
//       });

//       it('Renders the correct info message', () => {
//         cy.get('[data-testid=session-message]').should(
//           'have.text',
//           'The presentation slides will be available shortly after this session.'
//         );
//       });
//     });
//   });
// });
