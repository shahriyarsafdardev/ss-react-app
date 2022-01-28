import cohortsFixture from '../../../../fixtures/cohorts/cohorts.json';
import peer from '../../../../fixtures/peer/peers.json'

describe('Home > Networking', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
  });

  it('Displays a network sugguestion tab', () => {
    cy.get('[data-testid=network-suggestion-card]')
    .should('be.visible')
  });

  it('Displays a greeting text', () => {
    cy.get('[data-testid=greeting-text]')
    .should('contain','👋 Say hi to some of your peers')
  });

  it('Displays a sugguestion text', () => {
    cy.get('[data-testid=greeting-text]')
    .should('contain','Here are a few who are interested in growing their network')
  });

  it('Displays a peer card', () => {
    cy.get(`[data-testid=peer-card]`)
    .should('be.visible')
    cy.get('[data-testid=peer-name]')
    .should('contain', peer.peers[0].first_name+" "+peer.peers[0].last_name)
    cy.get('[data-testid=peer-position]')
    .should('contain', peer.peers[0].current_position+" @")
    cy.get('[data-testid=peer-company]')
    .should('contain', peer.peers[0].current_company.name)
  });

  it('Displays a left arrow icon', () => {
    cy.get('[data-testid=left-arrow-icon-network]')
    .should('be.visible')
  });

  it('Displays a right arrow icon', () => {
    cy.get('[data-testid=right-arrow-icon-network]')
    .should('be.visible')
  });

  it('Displays a new peer card when left arrow icon is clicked', () => {
    cy.get('[data-testid=left-arrow-icon-network]')
    .should('be.visible')
    .click({ multiple: true, force: true });
  });

  it('Displays a new peer card when right arrow icon is clicked', () => {
    cy.get('[data-testid=right-arrow-icon-network]')
    .should('be.visible')
    .click({ multiple: true, force: true });
  });

  it('Displays a view profile button on peer card', () => {
    cy.get('[data-testid=view-profile]')
    .should('be.visible')
  });

  it('Displays a view send message button on peer card', () => {
    cy.get('[data-testid=start-chat]')
    .should('be.visible')
  });

  it('Displays a see all peers text', () => {
    cy.get('[data-testid=sell-all-peers]')
    .should('be.visible')
    .and("have.attr", "href", "/cohorts/"+ cohortsFixture.cohorts[0].id +"/peers")
  });
});
