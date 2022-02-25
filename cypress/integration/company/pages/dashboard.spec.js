import creditFixture from '../../../fixtures/credit/credits.json'
import companyFixture from '../../../fixtures/login/company-login.json'
import emptycreditFixture from '../../../fixtures/credit/empty_credits.json'

describe('Company User Type Login', () => {
  describe('Company dashboard headers', () => {
    before(() => {
      cy.server();
      cy.loginascompany({});
    });

    it('Displays ScholarSite header', () => {
      //Assert ScholarSite header
      //Assert Business Dashboard header
      cy.get('[data-testid=company-logo]')
      .should('be.visible')
    });

    it('Displays Dashboard header', () => {
      //Assert Dashboard header
      cy.get('[data-testid=welcome-header]')
      .should('be.visible')
      .should('contain',"👋 Hi "+companyFixture.user.first_name+", welcome to the "+creditFixture.accountName+"'s ScholarSite Dashboard")
    });

    it('Displays My Wallet, New Enrollments and History section', () => {
      //Assert My Wallet section header
      cy.get('[data-testid=wallet-header]')
      .should('be.visible')
      .should('contain',creditFixture.accountName+"'s ScholarSite Wallet")
      //Assert New Enrollments section header
      cy.get('[data-testid=new-enrollments-header]')
      .should('be.visible')
      //Assert History section header
      cy.get('[data-testid=history-header]')
      .should('be.visible')
    });
  });

  context('when there is no data on dashboard', () => {
    before(() => {
      cy.server();
      cy.loginascompany({creditpath: 'credit/empty_credits.json'});
    });

    it('Displays empty My Wallet section', () => {
      //Assert empty section placeholder for my wallet section
      cy.get('[data-testid=credit-amount]')
      .should('be.visible')
      .and('contain', emptycreditFixture.credit_balance)
    });

    it('Displays empty New Enrollments section', () => {
      //Assert empty section placeholder for New Enrollments section
      cy.get('[data-testid=Empty-enrollments]')
      .should('be.visible')
    });

    it('Displays empty History section', () => {
      //Assert empty section placeholder for History section
      cy.get('[data-testid=Empty-history]')
      .should('be.visible')
    });

  });
  context('when there is data on dashboard', () => {
    before(() => {
      cy.server();
      cy.loginascompany({});
    });

    it('Displays data My Wallet section', () => {
      //Assert credits in My Wallet
      cy.get('[data-testid=credit-amount]')
      .should('be.visible')
      .and('contain', creditFixture.credit_balance)
      //Assert Credits label
      cy.get('[data-testid=credit-label]')
      .should('be.visible')
      //Assert Top Up Credits button
      cy.get('[data-testid=top-up-button]')
      .should('be.visible')
    });

    describe('New Enrollments section', () => {
      it('Displays data in New Enrollments section', () => {
        //Assert correct count to new enrollments
        //Assert Display of all new enrollments
        cy.fixture('../fixtures/credit/credits.json')
        .its('unapproved')
        .then((list) => {
          list.forEach((item) => {
            cy.log(item.id)
            cy.get(`[data-testid="enrollment-${item.id}"]`).
            should('be.visible')
          });
        });
      });

      it('Displays information on a new enrollment', () => {
        cy.fixture('../fixtures/credit/credits.json')
        .its('unapproved')
        .then((list) => {
          list.forEach((item) => {
            cy.log(item.id)
            //Assert enrollment date
            cy.get(`[data-testid="enrollment-time-${item.time}"]`).
            should('be.visible')
            //Assert user name with text "want to attend"
            cy.get(`[data-testid="enrollment-attendee-name-${item.attendee_name}"]`).
            should('be.visible')
            //Assert cohort title
            cy.get(`[data-testid="enrollment-cohort-name-${item.cohort_name}"]`).
            should('be.visible')
            //Assert credits amount
            cy.get(`[data-testid="enrollment-credits-${item.credit_amount}"]`).
            should('be.visible')
            //Assert Approve button
            cy.get(`[data-testid="enrollment-approve-btn-${item.id}"]`).
            should('be.visible')
            //Assert Reject button
            cy.get(`[data-testid="enrollment-reject-btn-${item.id}"]`).
            should('be.visible')
          });
        });
      });
    });

    describe('History section', () => {
      it('Displays data in History section', () => {
        //Assert Display of all History records
        cy.fixture('../fixtures/credit/credits.json')
        .its('history')
        .then((list) => {
          list.forEach((item) => {
            cy.log(item.id)
            cy.get(`[data-testid="history-${item.id}"]`).
            should('be.visible')
          });
        });
      });
      it('Displays information on history', () => {
        cy.fixture('../fixtures/credit/credits.json')
        .its('history')
        .then((list) => {
          list.forEach((item) => {
            cy.log(item.id)
            //Assert date
            cy.get(`[data-testid="enrollment-time-${item.time}"]`).
            should('be.visible')
            //Assert user name with text "attended"
            cy.get(`[data-testid="enrollment-attendee-name-${item.attendee_name}"]`).
            should('be.visible')
            //Assert cohort title
            cy.get(`[data-testid="enrollment-cohort-name-${item.cohort_name}"]`).
            should('be.visible')
            //Assert credits amount
            cy.get(`[data-testid="enrollment-credits-${item.credit_amount}"]`).
            should('be.visible')
          });
        });
      });
    });
  });
});
