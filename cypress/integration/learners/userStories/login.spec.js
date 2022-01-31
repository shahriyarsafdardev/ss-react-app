import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';

describe('When a learner logs in', () => {
  context('When cohort.released_for_learners == false', () => {
    beforeEach(() => {
      cy.server();
      cy.login({cohortspath :'cohorts/cohortforemptystate.json' });
    });

    it('Opens the Home#Empty page by default', () => {
      cy.url()
      .should('include', 'home')
      cy.get('[data-testid="dashboard-navbar-home"]')
      .should('be.visible')
      cy.get('[data-testid="empty-home-welcome-text"]')
      .should('be.visible')
      .and('contain','👋 Hi '+ userFixture.user.first_name + ', welcome to the '+ cohortsFixture.cohorts[0].code +' Cohort!')
      cy.get('[data-testid="empty-home-cohort-information-text"]')
      .should('be.visible')
      .and('contain', cohortsFixture.cohorts[0].host_names)
      cy.get('[data-testid="empty-home-cohort-information-text-1"]')
      .should('be.visible')
      cy.get('[data-testid="empty-home-add-to-calendar-btn"]')
      .should('be.visible')
      .and('contain', 'Add sessions to my calendar')
      cy.get('[data-testid="empty-home-ask-question-btn"]')
      .should('be.visible')
      .and('contain', 'Ask '+ cohortsFixture.cohorts[0].host_names +' a question through Q&A')
    });

    describe('When the Sessions is selected from the Sidebar', () => {
      it('Opens Sessions#Empty page' , () => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-sessions"]`)
        .should('be.visible')
        .click()
        cy.url().should('include', 'sessions')
        cy.get('[data-testid="dashboard-navbar-sessions"]')
        .should('be.visible')
        cy.get('[data-testid="empty-session-img"]')
        .should('be.visible')
        cy.get('[data-testid="empty-session-information-text"]')
        .should('be.visible')
        .and('contain', cohortsFixture.cohorts[0].host_names)
      });
    });

    describe('When the Messaging is selected from the Sidebar', () => {
      it('Opens Messaging#Empty page', () => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-messaging"]`)
        .should('be.visible')
        .click()
        cy.url().should('include', 'messaging')
        cy.get('[data-testid="dashboard-navbar-messaging"]')
        .should('be.visible')
        cy.get('[data-testid="empty-messaging-img"]')
        .should('be.visible')
        cy.get('[data-testid="empty-messaging-information-text"]')
        .should('be.visible')
        .and('contain', cohortsFixture.cohorts[0].host_names)
      });
    });

    describe('When the Networking is selected from the Sidebar', () => {
      it('Opens Networking#Empty page', () => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-networking"]`)
        .should('be.visible').click()
        cy.url()
        .should('include', 'peers')
        cy.get('[data-testid="dashboard-navbar-networking"]').
        should('be.visible')
        cy.get('[data-testid="empty-networking-img"]')
        .should('be.visible')
        cy.get('[data-testid="empty-networking-information-text"]')
        .should('be.visible')
        .and('contain', cohortsFixture.cohorts[0].host_names)
      });
    });

    describe('When the Q&A is selected from the Sidebar', () => {
      it('Opens Q&A#Empty page', () => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-Q&A"]`)
        .should('be.visible')
        .click()
        cy.url().
        should('include', 'Q&A')
        cy.get('[data-testid="dashboard-navbar-Q&A"]')
        .should('be.visible')
      });
    });
  });

  context('When cohort.released_for_learners == true', () => {
    beforeEach(() => {
      cy.server();
      cy.login({});
    });

    it('Opens the Home page by default', () => {
      cy.url()
      .should('include', 'home')
      cy.get('[data-testid="dashboard-navbar-home"]')
      .should('be.visible')
    });

    describe('When the Sessions is selected from the Sidebar', () => {
      it('Opens Sessions page',() => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-sessions"]`)
        .should('be.visible')
        .click()
        cy.url().should('include', 'sessions')
        cy.get('[data-testid="dashboard-navbar-sessions"]')
        .should('be.visible')
      });
    });

    describe('When the Messaging is selected from the Sidebar', () => {
      it('Opens Messaging page',() => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-messaging"]`)
        .should('be.visible')
        .click()
        cy.url().should('include', 'messaging')
        cy.get('[data-testid="dashboard-navbar-messaging"]')
        .should('be.visible')
      });
    });

    describe('When the Networking is selected from the Sidebar', () => {
      it('Opens Networking page',() => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-networking"]`)
        .should('be.visible').click()
        cy.url()
        .should('include', 'peers')
        cy.get('[data-testid="dashboard-navbar-networking"]').
        should('be.visible')
      });
    });

    describe('When the Q&A is selected from the Sidebar', () => {
      it('Opens Q&A page',() => {
        cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-Q&A"]`)
        .should('be.visible')
        .click()
        cy.url().
        should('include', 'Q&A')
        cy.get('[data-testid="dashboard-navbar-Q&A"]')
        .should('be.visible')
      });
    });
  });
});
