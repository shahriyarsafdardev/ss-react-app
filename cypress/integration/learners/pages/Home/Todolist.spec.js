import sessionFixture from '../../../../fixtures/session/sessions.json';
import userFixture from '../../../../fixtures/login/login.json';
import cohortsFixture from '../../../../fixtures/cohorts/cohorts.json';
import sessionMaterials from '../../../../fixtures/session/session_materials.json';
import submit_checklist_true from '../../../../fixtures/session/submit_checklist_true.json';
import submit_checklist_false from '../../../../fixtures/session/submit_checklist_false.json'
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

Cypress.Commands.add('markedCheck', () => {
  cy.fixture('../fixtures/session/session_materials.json').as('sessionMaterial');
  cy.route('POST',`${serverUrl}/cohort_sessions/${sessionFixture.sessions[0].id}/session_materials/${sessionMaterials[1].id}/submit_checklist.json` ,'@sessionMaterial')
  .as('checklist');
  cy.get('[data-testid=check-box-1]')
  .click({ multiple: true, force: true });
  cy.wait('@checklist')
  cy.get('@checklist').then((xhr) => {
    expect(xhr.request.body.complete).to.eq(submit_checklist_true.complete);
  })
});

Cypress.Commands.add('markedUncheck', () => {
  cy.fixture('../fixtures/session/session_materials.json').as('sessionMaterial');
  cy.route('POST',`${serverUrl}/cohort_sessions/${sessionFixture.sessions[0].id}/session_materials/${sessionMaterials[1].id}/submit_checklist.json` ,'@sessionMaterial')
  .as('checklist');
  cy.get('[data-testid=check-box-1]')
  .click({ multiple: true, force: true });
  cy.wait('@checklist')
  cy.get('@checklist').then((xhr) => {
    expect(xhr.request.body.complete).to.eq(submit_checklist_false.complete);
  })
});

describe('Home > To do', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
  });

  it('Displays a to do tab', () => {
    cy.get('[data-testid=to-do-card]')
    .should('be.visible')
  });

  context('When there is an upcoming session', () => {
    it('Displays a get ready text for the next session', () => {
      cy.get('[data-testid=to-do-header]')
      .should('contain','Get Ready for our Session '+ sessionFixture.sessions[0].number)
    });

    it('Displays a circular progress bar for that session', () => {
      cy.get('[data-testid=progress-bar]')
      .should('be.visible')
    });

    it('Displays a session description', () => {
      cy.get('[data-testid=session-description]')
      .should('be.visible')
    });

    context('When a session has pre-reading materials', () => {
      it('Displays a pre-reading row for each material', () => {
        cy.get('[data-testid=prereading-name-0]')
        .should('contain', sessionMaterials[0].name)
        cy.get('[data-testid=prereading-link-0]')
        .should("have.attr", "href", sessionMaterials[0].action_url);
        cy.get('[data-testid=check-box-0]')
        .find('input').
        should('have.attr', 'checked')
        cy.get('[data-testid=check-box-1]')
        .find('input').
        should('not.have.attr', 'checked')
      });

      it('Allows a user to mark and unmark materials as complete', () => {
        cy.markedCheck()
        cy.markedUncheck()
      });

      context('When all the pre-reading materials are completed', () => {
        it('Displays a text all ready for session', () => {
          cy.markedCheck()
          cy.get('[data-testid=to-do-header]')
          .should('contain','🎉 You’re all ready to go for our Session '+ sessionFixture.sessions[0].number)
        });
      });
    });
  });

  context('When current time is less than one hour before any session', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time,0.30)
    });

    it('Displays starting time of the session', () => {
      cy.get('[data-testid=session-start-time-text]')
      .should('be.visible')
    });
  });

  context('When current time is less than one hour before any session', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time,0.30)
    });
    it('Displays time remaining in session to start', () => {
      cy.get('[data-testid=minutes]')
      .should('be.visible')
      cy.get('[data-testid=seconds]')
      .should('be.visible')
    });
  });

  context('When current time is less than one hour before any session', () => {
    before(() => {
      cy.setClockToBeforeSession(sessionFixture.sessions[0].time,0.30)
    });
    it('Displays a join zoom button', () => {
      cy.get('[data-testid=session-invite]')
      .should("have.attr", "href", sessionFixture.sessions[0].zoom_url);
    });
  });

  context('When there are no more upcoming sessions', () => {
    before(() => {
      cy.setClockToAfterSession(sessionFixture.sessions[3].times[0],3)
    });

    it('Displays a Summary notes',()=>{
      cy.get('[data-testid=summary-notes]').then((summary) => {
        const html = summary.html();
        expect(html).to.eq(cohortsFixture.cohorts[0].goodbye_message);
      })
    });
  });
});
