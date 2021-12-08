import sessionFixture from '../../../fixtures/session/sessions.json';
import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';
import sessionMaterials from '../../../fixtures/session/session_materials.json';
import moment from 'moment';

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
  return cy.get('[style="font-size: 18px;"]')
});

Cypress.Commands.add('getProgressBar', () => {
  return cy.get('.CircularProgressbar-path')
});

Cypress.Commands.add('getPreReadingMaterial', () => {
  return cy.get(':nth-child(2) > .inner > p')
});

Cypress.Commands.add('openPreReadingMaterial', () => {
  return cy.get(':nth-child(2) > .inner > .secondary > .css-1306old')
});

Cypress.Commands.add('checkedBox', () => {
  cy.get(':nth-child(2) > .check-box > .MuiBox-root > .MuiButtonBase-root > .PrivateSwitchBase-input')
});

Cypress.Commands.add('unCheckedBox', () => {
  cy.get(':nth-child(3) > .check-box > .MuiBox-root > .MuiButtonBase-root > .PrivateSwitchBase-input')
});

Cypress.Commands.add('getSessionTime', () => {
  return cy.get('.MuiTypography-subtitle1')
});

Cypress.Commands.add('getTimeMinutes', () => {
  return cy.get('[data-testid=minutes]')
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
        .should('contain', 'href='+sessionMaterials[0].action_url)
        // The checkbox (both one that is checked and one that is not checked)
        cy.checkedBox()
        .should('be.visible')
        cy.unCheckedBox()
        .should('be.visible')
      });


    it('Allows a user to mark and unmark materials as complete', () => {});
      // click and item
      // assert that progress bar has changed
      // assert that backend call was made
      // uncheck an item
      // assert that progress bar has changed
      // assert that backend call was made

      context('When all the pre-reading materials are completed', () => {
        it('Displays a text all ready for session', () => {});
      });
    });
  });

  context('When current time is less than one hour before any session', () => {
    beforeEach(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time,0.30)
    })

    it('Displays starting time of the session', () => {
      cy.getSessionTime()
      .should('be.visible')
    });

    it('Displays time remaining in session to start', () => {
      cy.getTimeMinutes()
      .should('be.visible')
    });

    it('Displays a join zoom button', () => {}); //also verify the link to zoom meeting in this spec
  });

  context('When there are no more upcoming sessions', () => {});
});
