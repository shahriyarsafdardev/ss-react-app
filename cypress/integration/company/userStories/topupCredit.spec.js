import cardInformationFixture from '../../../fixtures/credit/card_information.json';
import creditFixture from '../../../fixtures/credit/credits.json';
const serverUrl = Cypress.env('serverUrl');

describe('Top up credits flow', () => {
  beforeEach(() => {
    cy.server();
    cy.loginascompany({ creditpath: 'credit/empty_credits.json' });
    cy.get('[data-testid=accept-btn]').should('be.visible').click();
  });

  it('Verify Top up credit button is clickable', () => {
    //Assert Button is visible
    cy.get('[data-testid=top-up-button]').should('be.visible').click();
    //Assert Add Credits to Keep Saving heading is visible
    cy.get('[data-testid=add-credits-header]').should('be.visible');
  });
  context('when Top up credit button is clicked', () => {
    beforeEach(() => {
      cy.wait(500);
      cy.get('[data-testid=top-up-button]').should('be.visible').click();
    });
    it('Verify Add Credits to Keep Saving mondal is opened', () => {
      //Assert Add Credits to Keep Saving heading is visible
      cy.get('[data-testid=add-credits-header]').should('be.visible');
      //Assert Your Credits are used to label is visible
      cy.get('[data-testid=top-up-label]').should('be.visible');
      //Assert Add credits button is visible
      cy.get('[data-testid=add-credits-button]').should('be.visible');
    });
    it('Verify add credit button is clickable', () => {
      //Assert Button is visible
      cy.get('[data-testid=add-credits-button]').should('be.visible').click({ force: true });
      //Assert redeem credits mondal is opened
      cy.get('[data-testid=charge-header]').should('be.visible');
    });
    context('when add credit button is clicked', () => {
      beforeEach(() => {
        cy.wait(1000);
        cy.get('[data-testid=add-credits-button]').should('be.visible').click();
      });
      it('Verify redeem credits mondal is opened', () => {
        //Assert header for You will be charged USD for Credits
        cy.get('[data-testid=charge-header]').should('be.visible');
        //Assert first name field is visible
        cy.get('[data-testid=card-name]').should('be.visible');
        //Assert card number field is visible
        cy.get('[data-testid=card-number]').should('be.visible');
        //Assert Exp date field is visible
        cy.get('[data-testid=card-expiry]').should('be.visible');
        //Assert CVV field is visible
        cy.get('[data-testid=card-cvv]').should('be.visible');
        //Assert Back button is visible
        cy.get('[data-testid=back-button]').should('be.visible');
        //Assert Redeem Credits is visible
        cy.get('[data-testid=purchase-button]').should('be.visible');
      });
      context('when redeem credits button is clicked without information', () => {
        beforeEach(() => {
          cy.get('[data-testid=purchase-button]').should('be.visible').click({ force: true });
        });
        it('Verify error messages are visible', () => {
          cy.contains('p', 'Credit Card number is invalid').should('be.visible');
          cy.contains('p', 'Card Expiry date is required').should('be.visible');
          cy.contains('p', 'Card CVV is required').should('be.visible');
        });
      });
      context('when redeem credits button is clicked with information', () => {
        it('Verify credits are add on my wallet section', () => {
          cy.get('[data-testid=card-number]').type(cardInformationFixture.cardNumber);
          cy.get('[data-testid=card-expiry]').type(cardInformationFixture.cardExpiry);
          cy.get('[data-testid=card-cvv]').type(cardInformationFixture.cardCvv);
          cy.fixture('../fixtures/credit/after_topup.json').as('addCredit');
          cy.route(
            'POST',
            `${serverUrl}/credit_accounts/${creditFixture.id}/add_credit.json`,
            '@addCredit'
          ).as('topup');
          cy.get('[data-testid=purchase-button]').should('be.visible').click({ force: true });
          cy.wait('@topup');
          cy.fixture('../fixtures/credit/after_topup.json')
            .its('history')
            .then((list) => {
              list.forEach((item) => {
                cy.log(item.id);
                cy.get(`[data-testid="credit-time-${item.time}"]`).should('be.visible');
                cy.get(`[data-testid="credit-${item.id}-top-up"]`).should('be.visible');
                cy.get(`[data-testid="credit-${item.credit_amount}"]`).should('be.visible');
              });
            });
        });
      });
      context('when back button is clicked', () => {
        beforeEach(() => {
          cy.get('[data-testid=back-button]').should('be.visible').click({ force: true });
        });
        it('Verify Add Credits to Keep Saving mondal is opened', () => {
          cy.get('[data-testid=add-credits-header]').should('be.visible');
          //Assert Add credits button is visible
          cy.get('[data-testid=add-credits-button]').should('be.visible');
        });
      });
    });
  });
});
