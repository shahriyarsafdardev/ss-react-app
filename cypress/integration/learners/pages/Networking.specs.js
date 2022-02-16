import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';
import peersFixture from '../../../fixtures/peer/peers.json';
const baseUrl = Cypress.env('baseUrl');

describe('Networking Tab', () => {
  before(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-networking"]`)
    .should('be.visible')
    .click()
  });

  it('Displays Network tab page', () => {
    //assert header Networking
    cy.get('[data-testid="dashboard-navbar-networking"]')
    .should('be.visible')
    //assert header peers
    //assert view dropdown
    cy.get('[data-testid="view-mode"]')
    .should('be.visible')
    //assert filter by company
    cy.get('[data-testid="company-select"]')
    .should('be.visible')
    //assert filter by strength
    // cy.get('[data-testid="strength-select"]')
    // .should('be.visible')
    //assert correct number of peer cards are visible
    cy.get('[data-testid="peers-grid"]')
    .should('be.visible')
    cy.fixture('../fixtures/peer/peers.json')
    .its('peers')
    .then((list) => {
      list.forEach((item) => {
        cy.log(item)
        cy.get(`[data-testid="peer-card-${item.id}"]`)
        .should('be.visible')
      });
    });
  });

  it('Displays Peer information on peer card', () => {
    //assert company logo
    cy.get(`[data-testid="peer-${peersFixture.peers[0].id}-company-logo"]`)
    .should('be.visible')
    //assert user profile picture
    cy.get(`[data-testid="peer-${peersFixture.peers[0].id}-profile-picture"]`)
    .should('be.visible')
    //assert user name
    cy.get(`[data-testid="peer-${peersFixture.peers[0].id}-name"]`)
    .should('be.visible')
    .and('contain', `${peersFixture.peers[0].first_name}`+` ${peersFixture.peers[0].last_name}`)
    //assert company name
    cy.get(`[data-testid="peer-${peersFixture.peers[0].id}-company"]`)
    .should('be.visible')
    .and('contain', `${peersFixture.peers[0].current_company.name}`)
    //assert current_position
    cy.get(`[data-testid="peer-${peersFixture.peers[0].id}-position"]`)
    .should('be.visible')
    .and('contain', `${peersFixture.peers[0].current_position}`)
  });

  context('When a peer card is clicked on', () => {
    before(() => {
      cy.get(`[data-testid="peer-card-${peersFixture.peers[0].id}"]`)
      .should('be.visible')
      .click()
    });

    it('Displays Peer Profile information on mondal', () => {
      //assert user name
      //assert bio_text
      cy.get('[data-testid="introduction"]')
      .should('be.visible')
      .and('contain', `${peersFixture.peers[0].bio_text}`)
      //assert preferred_pronoun
      cy.get('[data-testid="preferred-pronoun"]')
      .should('be.visible')
      .and('contain', `${peersFixture.peers[0].preferred_pronoun}`)
      //assert company name and current position
      cy.get('[data-testid="company-name"]')
      .should('be.visible')
      .and('contain', `${peersFixture.peers[0].current_position}`+` @ ${peersFixture.peers[0].current_company.name}`)
      //assert industry
      cy.get('[data-testid="industry-0"]').eq(0)
      .should('be.visible')
      .and('contain', `${peersFixture.peers[0].current_industry_category_selections[0]}`)
      //assert
      cy.get('[data-testid="strength-0"]').eq(0)
      .should('be.visible')
      .and('contain', `${peersFixture.peers[0].strengths[0]}`)
    });

    it('Displays Peer social information on mondal', () => {
      //assert linkedin
      cy.get('[data-testid="linkedin-url"]')
      .should('be.visible')
      //assert email
      cy.get('[data-testid="user-email"]')
      .should('be.visible')
      //assert message on scholar site
      cy.get('[data-testid="message-user"]')
      .should('be.visible')
    });

    context('When clicked on message on scholar site', () => {
      it('Redirects to direct message', () => {
        cy.get('[data-testid="message-user"]')
        .click()
        //assert url contains user id
        cy.url()
        .should('eq',`${baseUrl}`+`/cohorts/`+`${peersFixture.cohort_id}`+`/messaging?direct=true&receiver_id=`+`${peersFixture.peers[0].id}`)
      });
    });
  });
});
