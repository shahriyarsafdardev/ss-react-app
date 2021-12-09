import sessionFixture from '../../../fixtures/session/sessions.json';
import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';
import sessionMaterials from '../../../fixtures/session/session_materials.json';
import submitChecklist from '../../../fixtures/session/submit_checklist.json';
import moment from 'moment';
const serverUrl = Cypress.env('serverUrl');

Cypress.Commands.add('setClockToBeforeSession', (session, time)=> {
  var dateTime = moment(session).subtract(time, 'hours');
      cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('setClockToAfterSession', (session, time)=> {
  var dateTime = moment(session).add(time, 'hours');
      cy.clock(new Date(dateTime.format()));
});

Cypress.Commands.add('getSessionDescription', () => {
  return cy.get('[data-testid=session-description]')
});

Cypress.Commands.add('getToDoTab', () => {
  return cy.get('[data-testid=to-do-card]')
});

Cypress.Commands.add('getHeaderText', () => {
  return cy.get('[data-testid=to-do-header]')
});

Cypress.Commands.add('getProgressBar', () => {
  return cy.get('[data-testid=progress-bar]')
});

Cypress.Commands.add('getPreReadingMaterial', () => {
  return cy.get('[data-testid=prereading-name-0]')
});

Cypress.Commands.add('openPreReadingMaterial', () => {
  return cy.get('[data-testid=prereading-link-0]')
});

Cypress.Commands.add('checkedBox', () => {
  cy.get('[data-testid=check-box-0]')
});

Cypress.Commands.add('unCheckedBox', () => {
  cy.get('[data-testid=check-box-1]')
});

Cypress.Commands.add('getSessionTime', () => {
  return cy.get('[data-testid=session-start-time-text]')
});

Cypress.Commands.add('getTimeMinutes', () => {
  return cy.get('[data-testid=minutes]')
});

Cypress.Commands.add('getTimeSeconds', () => {
  return cy.get('[data-testid=seconds]')
});

Cypress.Commands.add('joinZoom', () => {
  return cy.get('[data-testid=session-invite]')
});

Cypress.Commands.add('getSummaryNotes', () => {
  return cy.get('[data-testid=summary-notes]')
});

describe('Home > To do', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });

  it('Displays a to do tab', () => {
    cy.getToDoTab()
    .should('be.visible')
  });

  context('When there is an upcoming session', () => {
    it('Displays a get ready text for the next session', () => {
      cy.getHeaderText()
      .should('contain','Get Ready for Session '+ sessionFixture.sessions[0].number)
    });

    it('Displays a circular progress bar for that session', () => {
      cy.getProgressBar()
      .should('be.visible')
    });

    it('Displays a session description', () => {
      cy.getSessionDescription()
      .should('be.visible')
    });

    context('When a session has pre-reading materials', () => {
      it('Displays a pre-reading row for each material', () => {
        // In this one assertion we want to assert that the following are shown:
        // The name
        cy.getPreReadingMaterial()
        .should('contain', sessionMaterials[0].name)
        // The publisher
        // Open link
        cy.openPreReadingMaterial()
        .should("have.attr", "href", sessionMaterials[0].action_url);
        // The checkbox (both one that is checked and one that is not checked)
        cy.checkedBox()
        .find('input').
        should('have.attr', 'checked')
        cy.unCheckedBox()
        .find('input').
        should('not.have.attr', 'checked')
      });


    /*it('Allows a user to mark and unmark materials as complete', () => {
      // click and item
      cy.intercept
      ('POST',
      `${serverUrl}/cohort_sessions/${sessionFixture.sessions[0].id}/session_materials/${sessionMaterials[1].id}/submit_checklist.json`,
      (req) => {
        req.reply({
          statusCode: 200, // default
          fixture: 'session/submit_checklist.json'
        })
      }).as('checklist');
      cy.unCheckedBox().click()
      cy.get('@checklist').then((response) => {
        expect(response.statusCode).to.equal(200)
      })*/
      // assert that progress bar has changed
      // assert that backend call was made
      // uncheck an item
      // assert that progress bar has changed
      // assert that backend call was made
    });
      /*context('When all the pre-reading materials are completed', () => {
        it('Displays a text all ready for session', () => {
          cy.unCheckedBox().click()
        });
      });
    });*/
  });

  context('When current time is less than one hour before any session', () => {
    beforeEach(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time,0.30)
    });

    it('Displays starting time of the session', () => {
      cy.getSessionTime()
      .should('be.visible')
    });

    it('Displays time remaining in session to start', () => {
      cy.getTimeMinutes()
      .should('be.visible')
      cy.getTimeSeconds()
      .should('be.visible')
    });

    it('Displays a join zoom button', () => {
      cy.joinZoom()
      .should("have.attr", "href", sessionFixture.sessions[0].zoom_url);
    });
  });

  context('When there are no more upcoming sessions', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[1].time,2)
    });

    it('Displays a Summary notes',()=>{
      cy.getSummaryNotes().then((summary) => {
        const html = summary.html();
        expect(html).to.eq(cohortsFixture.cohorts[0].goodbye_message);
      })
    });
  });
});
