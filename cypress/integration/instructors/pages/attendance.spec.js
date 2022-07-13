import sessionFixture from '../../../fixtures/session/sessions.json';
import cohorts_fixture from '../../../fixtures/cohorts/cohorts.json';
import user_fixture from '../../../fixtures/login/admin-login.json';
import attendance_fixture from '../../../fixtures/session/cohort_session_attendance.json';

const serverUrl = Cypress.env('serverUrl');

describe('Attendance Tab', () => {
  before(() => {
    cy.server();
    cy.loginasadmin({});
    cy.fixture('../fixtures/Popup/popup-viewed.json').as('popupViewed');
    cy.route('POST', `${serverUrl}/api/v1/users/popup_viewed.json`, '@popupViewed').as(
      'popupViewed'
    );
    cy.get('[data-testid=explore-btn]').should('be.visible').click();
    cy.get(
      `[data-testid="navbar-admin-cohort-the economics of digital platforms-Testing Intake Name"]`
    )
      .should('be.visible')
      .click({ force: true });
    cy.fixture('../fixtures/session/cohort_session_attendance.json').as('attendanceData');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/cohort_session_attendance.json`,
      '@attendanceData'
    ).as('attendance');
    cy.get(
      `[data-testid="navbar-cohort-${user_fixture.user.type}-page-list-${cohorts_fixture.cohorts[0].name}-${cohorts_fixture.cohorts[0].intake_name}-attendance"]`
    )
      .should('be.visible')
      .click({ force: true });
    cy.wait('@attendance');
  });

  describe('Cohort Overview', () => {
    it('Displays graph in cohort overview attendance graph', () => {
      cy.get('[data-testid="cohort_overview_header"]').should('be.visible');
      // Assert graph id
      cy.get('[data-testid="cohort_overview_graph"]').should('be.visible');
      // Assert live attendance label
      cy.contains('span', 'Live Attendance').should('be.visible');
      // Assert async attendance label
      cy.contains('span', 'Live or Async Attendance').should('be.visible');
      // assert session numbers in x axis
      cy.get('[data-testid="cohort_overview_graph"]')
        .should('be.visible')
        .find('text.apexcharts-xaxis-label')
        .should('have.length', `${attendance_fixture.totalSessions}`);
      // Assert percentage in y axis
      cy.get('[data-testid="cohort_overview_graph"]')
        .should('be.visible')
        .find('g.apexcharts-yaxis-texts-g')
        .should('be.visible');
    });
  });

  describe('Participant Overview', () => {
    it('Displays all name of participant with position in participant overview section', () => {
      cy.fixture('../fixtures/session/cohort_session_attendance.json')
        .its('sessionAttendanceRecords')
        .then((list) => {
          list.forEach((item) => {
            cy.log(item);
            cy.get(`[data-testid="user-name-${item.name}"]`)
              .should('be.visible')
              .and('contain', `${item.name} ` + `${item.position}`);
          });
        });
    });

    it('Displays all session number in participant overview section', () => {
      cy.fixture('../fixtures/session/sessions.json')
        .its('sessions')
        .then((list) => {
          list.forEach((item) => {
            cy.log(item.number);
            cy.get(`[data-testid="Session-${item.number}"]`).should('be.visible');
          });
        });
    });

    it('Displays a green tick if user has attended that specific session live', () => {
      cy.get(`[data-testid="Session-${sessionFixture.sessions[0].number}-attendance"]`)
        .should('be.visible')
        .children()
        .and('have.attr', 'aria-label', 'Attended Live');
    });

    it('Displays a yellow dot if user has viewed that specific session recording', () => {
      cy.get(`[data-testid="Session-${sessionFixture.sessions[1].number}-attendance"]`)
        .should('be.visible')
        .children()
        .and('have.attr', 'aria-label', 'Watched Recording');
    });

    it('Displays a red cross if user has not attended that specific session live or not viewed that specific session recording', () => {
      cy.get(`[data-testid="Session-${sessionFixture.sessions[2].number}-attendance"]`)
        .should('be.visible')
        .children()
        .and('have.attr', 'aria-label', 'Not Attended');
    });
  });
});
