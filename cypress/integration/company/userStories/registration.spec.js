import urlData from '../../../fixtures/registration/URL-data.json'
import enrollment from '../../../fixtures/Registration/registration-enrollment.json'
const baseUrl = Cypress.env('baseUrl');
const serverUrl = Cypress.env('serverUrl');
describe('Registration Flow', () => {
  context('When user is without credit account',()=>{
    beforeEach(() => {
      cy.server();
      cy.fixture('registration/registration-enrollment.json').as('enrollmentData');
      cy.route('POST',`${serverUrl}/cohorts/${urlData.cohort_id}/enrollments.json` ,'@enrollmentData').as('enrollments');
      cy.visit(`${baseUrl}/registration?cohort_id=${urlData.cohort_id}&email=${urlData.email}`)
      cy.wait('@enrollments')
    });
    it('Verify enter details page for enrollment is opened',()=>{
      //Assert text "👋 We just need a few more details to process your enrollment"
      cy.get('[data-testid=registration-header]')
      .should('be.visible')
      .and('contain', "👋 We just need a few more details to process your application")
      // Verify subtext
      cy.get('[data-testid=registration-subtext]')
      .should('be.visible')
      .and('contain', "We review each application in order to ensure a diverse and experienced cohort!")
      //Assert First name input
      cy.get('[data-testid=first-name]')
      .should('be.visible')
      //Assert Last name input
      cy.get('[data-testid=last-name]')
      .should('be.visible')
      //Assert LinkedIn URL input
      cy.get('[data-testid=linkedin_url]')
      .should('be.visible')
      //Assert complete enrollment button
      cy.get('[data-testid=submit-application]')
      .should('be.visible')
    });
    it('Verify complete enrollment button is clickable',()=>{
      //Type First name
      cy.get('[data-testid=first-name]')
      .should('be.visible')
      .clear()
      .type(enrollment.user.first_name)
      //Type Last name
      cy.get('[data-testid=last-name]')
      .should('be.visible')
      .clear()
      .type(enrollment.user.last_name)
      //Type LinkedIn URL
      cy.get('[data-testid=linkedin_url]')
      .should('be.visible')
      .clear()
      .type(enrollment.user.linkedin_url)
      //Assert complete enrollment button
      cy.get('[data-testid=submit-application]')
      .should('be.visible')
      .and('not.be.disabled')
    });
    context('When submit application button is clicked',()=>{
      beforeEach(() => {
        cy.fixture('registration/submit-response.json').as('submitResponse');
        cy.route('POST',`${serverUrl}/cohorts/${urlData.cohort_id}/enrollments/${enrollment.user.enrollment_id}/update_profile.json`,'@submitResponse').as('submitResponse');
        cy.get('[data-testid=submit-application]')
        .should('be.visible')
        .click()
        cy.wait('@submitResponse')
      });
      it('Verify enter payment details page is opened',()=>{
        //Assert text "💳 Thanks Test, just one last step!"
        cy.get('[data-testid=thankyou-message]')
        .should('be.visible')
        .and('contain', `💳 Thanks ${enrollment.user.first_name}, just one last step!`)
        //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
        //You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort.
        //Assert Full name input
        cy.get('[data-testid=card-name]')
        .should('be.visible')
        //Assert Card number input
        cy.get('[data-testid=card-number]')
        .should('be.visible')
        //Assert Exp date input
        cy.get('[data-testid=card-expiry]')
        .should('be.visible')
        //Assert CVV input
        cy.get('[data-testid=card-cvv]')
        .should('be.visible')
        //Terms and conditions message
        cy.get('[data-testid=terms-conditions]')
        .should('be.visible')
        //Assert submit button
        cy.get('[data-testid=submit-btn]')
        .should('be.visible')
        //Assert pay later button
        cy.get('[data-testid=pay-later-btn]')
        .should('be.visible')
      });
      context('when terms and conditions checkbox is checked',()=>{
        beforeEach(() => {
          //Terms and conditions checkbox
          cy.get('.PrivateSwitchBase-input')
          .click();
        });
        it('Verify submit button is not disabled',()=>{
          //input Card number
          cy.get('[data-testid=card-number]')
          .should('be.visible')
          .type(urlData.creditCard);
          //input Exp date
          cy.get('[data-testid=card-expiry]')
          .should('be.visible')
          .type(urlData.expiryDate);
          //input CVV
          cy.get('[data-testid=card-cvv]')
          .should('be.visible')
          .type(urlData.cvv);
          cy.get('[data-testid=submit-btn]')
          .should('be.visible')
          .and('not.be.disabled')
        });
        // context('When submit button is clicked',()=>{
        //   beforeEach(() => {
        //     //input Card number
        //     cy.get('[data-testid=card-number]')
        //     .should('be.visible')
        //     .type(urlData.creditCard);
        //     //input Exp date
        //     cy.get('[data-testid=card-expiry]')
        //     .should('be.visible')
        //     .type(urlData.expiryDate);
        //     //input CVV
        //     cy.get('[data-testid=card-cvv]')
        //     .should('be.visible')
        //     .type(urlData.cvv);
        //     cy.get('[data-testid=submit-btn]')
        //     .should('be.visible')
        //     .click();
        //     cy.wait(1000)
        //   });
        //   it('Verify complete application page is opened',()=>{
        //     //input Full
        //     //input Card number
        //     //input Exp date
        //     //input CVV
        //     //click submit button
        //     //Assert text "🎉 You’ve completed your application!"
        //     //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
        //     //Assert Explore more ScholarSite cohorts button is visible
        //   });
        // });
      });
      context('when terms and conditions checkbox is unchecked',()=>{
        it('Verify submit button is disabled',()=>{
          //input Card number
          cy.get('[data-testid=card-number]')
          .should('be.visible')
          .type(urlData.creditCard);
          //input Exp date
          cy.get('[data-testid=card-expiry]')
          .should('be.visible')
          .type(urlData.expiryDate);
          //input CVV
          cy.get('[data-testid=card-cvv]')
          .should('be.visible')
          .type(urlData.cvv);
          cy.get('[data-testid=submit-btn]')
          .should('be.visible')
          .and('be.disabled')
        });
      });
      context('When pay later button is clicked',()=>{
        beforeEach(() => {
          cy.get('[data-testid=pay-later-btn]')
          .should('be.visible')
          .click();
        });
        it('Verify pay later confirmation modal is opened',()=>{
          cy.get('[data-testid=modal-header]')
          .should('be.visible')
          cy.get('[data-testid=modal-subtext]')
          .should('be.visible')
          cy.get('[data-testid=guarantee-one]')
          .should('be.visible')
          cy.get('[data-testid=guarantee-two]')
          .should('be.visible')
          cy.get('[data-testid=pay-later]')
          .should('be.visible')
          cy.get('[data-testid=pay-now]')
          .should('be.visible')
        });
        context('When I would like to pay later button is clicked',()=>{
          beforeEach(() => {
            cy.get('[data-testid=pay-later]')
            .should('be.visible')
            .click();
          });
          it('Verify 🎉 You have 72 hours to lock in your price and seat! page is opened',()=>{
            //Assert text "🎉 You have 72 hours to lock in your price and seat!"
            cy.get('[data-testid=remainingTime]')
            .should('be.visible')
            cy.get('[data-testid=email-message]')
            .should('be.visible')
            //Assert button Any questions? Click here to contact ScholarSite
            cy.get('[data-testid=contact-btn]')
            .should('be.visible')
          });
        });
        context('When I would like to pay now button is clicked',()=>{
          beforeEach(() => {
            cy.get('[data-testid=pay-now]')
            .should('be.visible')
            .click();
            cy.wait(1000)
          });
          it('Verify enter payment details page is opened',()=>{
            //Assert text "💳 Thanks Test, just one last step!"
            cy.get('[data-testid=thankyou-message]')
            .should('be.visible')
            .and('contain', `💳 Thanks ${enrollment.user.first_name}, just one last step!`)
            //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
            //You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort.
            //Assert Full name input
            cy.get('[data-testid=card-name]')
            .should('be.visible')
            //Assert Card number input
            cy.get('[data-testid=card-number]')
            .should('be.visible')
            //Assert Exp date input
            cy.get('[data-testid=card-expiry]')
            .should('be.visible')
            //Assert CVV input
            cy.get('[data-testid=card-cvv]')
            .should('be.visible')
            //Terms and conditions message
            cy.get('[data-testid=terms-conditions]')
            .should('be.visible')
            //Assert submit button
            cy.get('[data-testid=submit-btn]')
            .should('be.visible')
            //Assert pay later button
            cy.get('[data-testid=pay-later-btn]')
            .should('be.visible')
          });
        });
      });
    });
  })
  context('When user registers with credit account and charge participants= true',()=>{
    beforeEach(() => {
      cy.server();
      cy.fixture('registration/registration-enrollment.json').as('enrollmentData');
      cy.visit(`${baseUrl}/registration?cohort_id=${urlData.cohort_id}&email=${urlData.email}&credit_account=${urlData.credit_account}`)
      cy.route('POST',`${serverUrl}/cohorts/${urlData.cohort_id}/enrollments.json` ,'@enrollmentData').as('enrollments');
      cy.wait('@enrollments')
    });
    it('Verify enter details page for enrollment is opened',()=>{
      //Assert text "👋 We just need a few more details to process your enrollment"
      cy.get('[data-testid=registration-header]')
      .should('be.visible')
      .and('contain', "👋 We just need a few more details to process your application")
      // Verify subtext
      cy.get('[data-testid=registration-subtext]')
      .should('be.visible')
      .and('contain', "We review each application in order to ensure a diverse and experienced cohort!")
      //Assert First name input
      cy.get('[data-testid=first-name]')
      .should('be.visible')
      //Assert Last name input
      cy.get('[data-testid=last-name]')
      .should('be.visible')
      //Assert LinkedIn URL input
      cy.get('[data-testid=linkedin_url]')
      .should('be.visible')
      //Assert complete enrollment button
      cy.get('[data-testid=submit-application]')
      .should('be.visible')
    });
    it('Verify complete enrollment button is clickable',()=>{
      //Type First name
      cy.get('[data-testid=first-name]')
      .should('be.visible')
      .clear()
      .type(enrollment.user.first_name)
      //Type Last name
      cy.get('[data-testid=last-name]')
      .should('be.visible')
      .clear()
      .type(enrollment.user.last_name)
      //Type LinkedIn URL
      cy.get('[data-testid=linkedin_url]')
      .should('be.visible')
      .clear()
      .type(enrollment.user.linkedin_url)
      //Assert complete enrollment button
      cy.get('[data-testid=submit-application]')
      .should('be.visible')
      .and('not.be.disabled')
    });
    context('When submit application button is clicked',()=>{
      it('Verify enter payment details page is opened',()=>{
        //Assert text "💳 Thanks Test, just one last step!"
        //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
        //Assert Full name input
        //Assert Card number input
        //Assert Exp date input
        //Assert CVV input
        //Assert submit button
        //Assert pay later button
      });
      context('when terms and conditions checkbox is checked',()=>{
        it('Verify submit button is not disabled',()=>{
          //input Full
          //input Card number
          //input Exp date
          //input CVV
          //click submit button
          //Assert text "🎉 You’ve completed your application!"
          //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
          //Assert Explore more ScholarSite cohorts button is visible
        });
        context('When submit button is clicked',()=>{
          it('Verify complete application page is opened',()=>{
            //input Full
            //input Card number
            //input Exp date
            //input CVV
            //click submit button
            //Assert text "🎉 You’ve completed your application!"
            //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
            //Assert Explore more ScholarSite cohorts button is visible
          });
        });
      });
      context('when terms and conditions checkbox is unchecked',()=>{
        it('Verify submit button is disabled',()=>{
          //input Full
          //input Card number
          //input Exp date
          //input CVV
          //click submit button
          //Assert text "🎉 You’ve completed your application!"
          //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
          //Assert Explore more ScholarSite cohorts button is visible
        });
      });
      context('When pay later button is clicked',()=>{
        it('Verify pay later confirmation modal is opened',()=>{
          //Assert text "Are you sure you want to pay later?"
          //Assert button No, I would like to pay now
          //Assert button Yes, I would like to pay later
        });
        it('Verify pay now and pay later confirmation buttons are displayed',()=>{

        });
        context('When I would like to pay later button is clicked',()=>{
          it('Verify 🎉 You have 72 hours to lock in your price and seat! page is opened',()=>{
            //Assert text "🎉 You have 72 hours to lock in your price and seat!"
            //Assert button Any questions? Click here to contact ScholarSite
          });
          //
        });
        context('When I would like to pay now button is clicked',()=>{
          it('Verify enter payment details page is opened',()=>{
            //Assert text "💳 Thanks Test, just one last step!"
            //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
            //Assert Full name input
            //Assert Card number input
            //Assert Exp date input
            //Assert CVV input
            //Assert submit button
            //Assert pay later button
          });
        });
      });
    });
  })
  context('When user is with credit account and charge participants= false',()=>{
    beforeEach(() => {
      cy.server();
      cy.fixture('registration/registration-enrollment-credit.json').as('enrollmentData');
      cy.visit(`${baseUrl}/registration?cohort_id=${urlData.cohort_id}&email=${urlData.email}&credit_account=${urlData.credit_account}`)
      cy.route('POST',`${serverUrl}/cohorts/${urlData.cohort_id}/enrollments.json` ,'@enrollmentData').as('enrollments');
      cy.wait('@enrollments')
    });
    it('Verify enter details page for enrollment is opened',()=>{
      //Assert text "👋 We just need a few more details to process your enrollment"
      //Assert First name input
      //Assert Last name input
      //Assert LinkedIn URL input
      //Assert complete enrollment button
    });
    it('Verify terms and conditions checkbox is displayed',()=>{
      //Type First name
      //Type Last name
      //Type LinkedIn URL
      //Assert complete enrollment button
    });
    context('when terms and conditions checkbox is checked',()=>{
      it('Verify submit button is not disabled',()=>{
        //input Full
        //input Card number
        //input Exp date
        //input CVV
        //click submit button
        //Assert text "🎉 You’ve completed your application!"
        //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
        //Assert Explore more ScholarSite cohorts button is visible
      });
      context('When submit button is clicked',()=>{
        it('Verify complete application page is opened',()=>{
          //input Full
          //input Card number
          //input Exp date
          //input CVV
          //click submit button
          //Assert text "🎉 You’ve completed your application!"
          //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
          //Assert Explore more ScholarSite cohorts button is visible
        });
      });
    });
    context('when terms and conditions checkbox is unchecked',()=>{
      it('Verify submit button is disabled',()=>{
        //input Full
        //input Card number
        //input Exp date
        //input CVV
        //click submit button
        //Assert text "🎉 You’ve completed your application!"
        //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
        //Assert Explore more ScholarSite cohorts button is visible
      });
    });
  })
})
