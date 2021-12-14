import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';
import peer from '../../../fixtures/peer/peers.json'
Cypress.Commands.add('getNetworkSuggestionCard', () => {
  return cy.get('[data-testid=network-suggestion-card]')
});

Cypress.Commands.add('getGreetingText', () => {
  return cy.get('[data-testid=greeting-text]')
});

Cypress.Commands.add('getPeerCard', () => {
  return cy.get(`[data-testid=peer-card]`)
});

Cypress.Commands.add('leftArrowIcon', () => {
  return cy.get('[data-testid=left-arrow-icon-network]')
});

Cypress.Commands.add('rightArrowIcon', () => {
  return cy.get('[data-testid=right-arrow-icon-network]')
});

Cypress.Commands.add('seeAllPeers', () => {
  return cy.get('[data-testid=sell-all-peers]')
});

Cypress.Commands.add('startChat', () => {
  return cy.get('[data-testid=start-chat]')
});

Cypress.Commands.add('viewProfile', () => {
  return cy.get('[data-testid=view-profile]')
});

describe('Home > Networking', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });

  it('Displays a network sugguestion tab', () => {
    cy.getNetworkSuggestionCard()
    .should('be.visible')
  });

  it('Displays a greeting text', () => {
    cy.getGreetingText()
    .should('contain','👋 Say hi to some of your peers')
  });

  it('Displays a sugguestion text', () => {
    cy.getGreetingText()
    .should('contain','Here are a few who are interested in growing their network')
  });

  it('Displays a peer card', () => {
    cy.getPeerCard()
    .should('be.visible')
    cy.get('[data-testid=peer-name]')
    .should('contain', peer.peers[0].first_name+" "+peer.peers[0].last_name)
    cy.get('[data-testid=peer-position]')
    .should('contain', peer.peers[0].current_position+" @")
    cy.get('[data-testid=peer-company]')
    .should('contain', peer.peers[0].current_company.name)
  });

  it('Displays a left arrow icon', () => {
    cy.leftArrowIcon()
    .should('be.visible')
  });

  it('Displays a right arrow icon', () => {
    cy.rightArrowIcon()
    .should('be.visible')
  });

  // it('Displays a new peer card when left arrow icon is clicked', () => {
  //   cy.leftArrowIcon()
  //   .should('be.visible')
  //   .click()
  // });

  // it('Displays a new peer card when right arrow icon is clicked', () => {
  //   cy.rightArrowIcon()
  //   .should('be.visible')
  //   .click()
  // });

  it('Displays a view profile button on peer card', () => {
    cy.viewProfile()
    .should('be.visible')
  });

  it('Displays a view send message button on peer card', () => {
    cy.startChat()
    .should('be.visible')
  });

  it('Displays a see all peers text', () => {
    cy.seeAllPeers()
    .should('be.visible')
    .and("have.attr", "href", "/cohorts/"+ cohortsFixture.cohorts[0].id +"/peers")
  });
});
