import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json';

describe('Networking Tab', () => {
  beforeEach(() => {
    cy.server();
    cy.login({});
    cy.get(`[data-testid="navbar-cohort-${userFixture.user.type}-page-list-${cohortsFixture.cohorts[0].intake_name}-${cohortsFixture.cohorts[0].name}-networking"]`)
    .should('be.visible')
    .click()
  });

    it('Displays Network tab page', () => {
      //assert header Networking
      //assert header peers
      //assert view dropdown
      //assert filter by company
      //assert filter by strength
      //assert correct number of peer cards are visible
    });

    it('Displays Peer information on peer card', () => {
      //assert company logo
      //assert user profile picture
      //assert company name
      //assert current_position
    });

    context('When a peer card is clicked on', () => {
      it('Displays Peer Profile information on mondal', () => {
        //assert user name
        //assert bio_text
        //assert preferred_pronoun
        //assert company name and current position
        //assert industry
        //assert strengths
      });

      it('Displays Peer social information on mondal', () => {
        //assert linkedin
        //assert email
        //assert message on scholar site
      });
    });
    context('When clicked on message on scholar site', () => {
      it('Redirects to direct message', () => {
        //assert url contains user id 
      });
    });
});
