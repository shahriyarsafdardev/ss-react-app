import cohorts_fixture from '../../../fixtures/cohorts/cohorts.json'

describe('Sidebar', () => {
  beforeEach(() => {
    cy.server();
    cy.loginasadmin({});
  });
  context('when in instructor mode', () => {
    beforeEach(() => {
      cy.get('[data-testid="dashboard-switch"]')
      .should('be.visible')
      .click()
    });
    it('Displays the instructor sidebar', () => {
      cy.get('[data-testid="instructor-sidebar"]')
      .should('be.visible')
    });
    it('Displays a CourseSection for each course the user is a host of', () => {
      // cy.get(`[data-testid="navbar-chort-${cohorts_fixture.cohorts[0].intake_name}"]`)
      // .should('be.visible')
    });
    describe('CourseSection', () => {
      it('Displays a header with the course name', () => {
        // cy.get(`[data-testid="navbar-chort-${cohorts_fixture.cohorts[0].intake_name}"]`)
        // .should('be.visible')
        // .and('contain', cohorts_fixture.cohorts[0].intake_name)
      });

      it('Displays a CohortTab for each cohort within that course', () => {
        cy.get(`[data-testid="navbar-chort-${cohorts_fixture.cohorts[0].intake_name}"]`)
        .should('be.visible')
      });
      describe('InstructorCohortTab', () => {
        it('Is labelled by its code', () => {
          cy.get(`[data-testid="navbar-chort-${cohorts_fixture.cohorts[0].intake_name}"]`)
          .should('be.visible')
          .and('contain', cohorts_fixture.cohorts[0].intake_name)
        });
        it('Opens a InstructorCohortPageList when clicked', () => {
          cy.get('[data-testid="navbar-registrations"]')
          .should('be.visible')
          cy.get('[data-testid="navbar-students"]')
          .should('be.visible')
          cy.get('[data-testid="navbar-sessions"]')
          .should('be.visible')
          cy.get('[data-testid="navbar-Q&A"]')
          .should('be.visible')
          cy.get('[data-testid="navbar-messaging"]')
          .should('be.visible')
        });

        describe('InstructorCohortPageList', () => {
          it('Allows the Instructor registrations page to be opened', () => {
            cy.get('[data-testid="navbar-registrations"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="dashboard-navbar-registrations"]')
            .should('be.visible')
          });
          it('Allows the Student page to be opened', () => {
            cy.get('[data-testid="navbar-students"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="dashboard-navbar-networking"]')
            .should('be.visible')
          });
          it('Allows the Sessions page to be opened', () => {
            cy.get('[data-testid="navbar-sessions"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="dashboard-navbar-sessions"]')
            .should('be.visible')
          });
          it('Allows the Q&A page to be opened', () => {
            cy.get('[data-testid="navbar-Q&A"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="dashboard-navbar-Q&A"]')
            .should('be.visible')
          });
          it('Allows the Messaging page to be opened', () => {
            cy.get('[data-testid="navbar-messaging"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="dashboard-navbar-messaging"]')
            .should('be.visible')
          });
        });
     });
    });
  });
  context('when in learner mode', () => {
    it('Displays the learner sidebar', () => {
      cy.get('[data-testid="member-sidebar"]')
      .should('be.visible')
    });
    it('Displays a LearnerCohortTab for each cohort the instructor hosts or is enrolled in', () => {
      cy.get(`[data-testid="navbar-chort-${cohorts_fixture.cohorts[0].name}"]`)
      .should('be.visible')
    });
    describe('LearnerCohortTab', () => {
      it('Is labelled by its name and code', () => {
        cy.get(`[data-testid="navbar-chort-${cohorts_fixture.cohorts[0].name}"]`)
        .should('be.visible')
        .and('contain', cohorts_fixture.cohorts[0].name)
      });
      it('Opens a LearnerCohortPageList when clicked' ,() => {
        cy.get('[data-testid="navbar-home"]')
        .should('be.visible')
        cy.get('[data-testid="navbar-networking"]')
        .should('be.visible')
        cy.get('[data-testid="navbar-sessions"]')
        .should('be.visible')
        cy.get('[data-testid="navbar-Q&A"]')
        .should('be.visible')
        cy.get('[data-testid="navbar-messaging"]')
        .should('be.visible')
      });
      describe('LearnerCohortPageList', () => {
        it('Allows the Learner Home page to be opened without the onboarding flow appearing', () => {
          cy.get('[data-testid="navbar-home"]')
          .should('be.visible')
          .click()
          cy.get('[data-testid="dashboard-navbar-home"]')
          .should('be.visible')
        });
        it('Allows the Networking page to be opened', () => {
          cy.get('[data-testid="navbar-networking"]')
          .should('be.visible')
          .click()
          cy.get('[data-testid="dashboard-navbar-networking"]')
          .should('be.visible')
        });
        it('Allows the Sessions page to be opened', () => {
          cy.get('[data-testid="navbar-sessions"]')
          .should('be.visible')
          .click()
          cy.get('[data-testid="dashboard-navbar-sessions"]')
          .should('be.visible')
        });
        it('Allows the Q&A page to be opened', () => {
          cy.get('[data-testid="navbar-Q&A"]')
          .should('be.visible')
          .click()
          cy.get('[data-testid="dashboard-navbar-Q&A"]')
          .should('be.visible')
        });
        it('Allows the Messaging page to be opened', () => {
          cy.get('[data-testid="navbar-messaging"]')
          .should('be.visible')
          .click()
          cy.get('[data-testid="dashboard-navbar-messaging"]')
          .should('be.visible')
        });
      });
    });
  });
  describe('ModeToggle',() => {
    it('Displays info text',() => {
      cy.get('[data-testid="dashboard-infotext"]')
      .should('be.visible')
    });
    it('Alows toggle between instructor and student mode', () => {
      cy.get('[data-testid="dashboard-switch"]')
      .should('be.visible')
      .click()
      //assertation for instructor mode is on
      cy.get('[data-testid="instructor-sidebar"]')
      .should('be.visible')
      cy.get('[data-testid="dashboard-switch"]')
      .click()
      //assertation for member mode is on
      cy.get('[data-testid="member-sidebar"]')
      .should('be.visible')
    });
  });
});
