import urlData from '../../../fixtures/registration/URL-data.json'
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
      //Assert First name input
      //Assert Last name input
      //Assert LinkedIn URL input
      //Assert complete enrollment button
    });
    // it('Verify complete enrollment button is clickable',()=>{
    //   //Type First name
    //   //Type Last name
    //   //Type LinkedIn URL
    //   //Assert complete enrollment button
    // });
    // context('When submit application button is clicked',()=>{
    //   it('Verify enter payment details page is opened',()=>{
    //     //Assert text "💳 Thanks Test, just one last step!"
    //     //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
    //     //Assert Full name input
    //     //Assert Card number input
    //     //Assert Exp date input
    //     //Assert CVV input
    //     //Assert submit button
    //     //Assert pay later button
    //   });
    //   context('when terms and conditions checkbox is checked',()=>{
    //     it('Verify submit button is not disabled',()=>{
    //       //input Full
    //       //input Card number
    //       //input Exp date
    //       //input CVV
    //       //click submit button
    //       //Assert text "🎉 You’ve completed your application!"
    //       //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
    //       //Assert Explore more ScholarSite cohorts button is visible
    //     });
    //     context('When submit button is clicked',()=>{
    //       it('Verify complete application page is opened',()=>{
    //         //input Full
    //         //input Card number
    //         //input Exp date
    //         //input CVV
    //         //click submit button
    //         //Assert text "🎉 You’ve completed your application!"
    //         //Assert text "You will shortly recieve an email documenting your application outcome and next steps!"
    //         //Assert Explore more ScholarSite cohorts button is visible
    //       });
    //     });
    //   });
    //   context('when terms and conditions checkbox is unchecked',()=>{
    //     it('Verify submit button is disabled',()=>{
    //       //input Full
    //       //input Card number
    //       //input Exp date
    //       //input CVV
    //       //click submit button
    //       //Assert text "🎉 You’ve completed your application!"
    //       //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
    //       //Assert Explore more ScholarSite cohorts button is visible
    //     });
    //   });
    //   context('When pay later button is clicked',()=>{
    //     it('Verify pay later confirmation modal is opened',()=>{
    //       //Assert text "Are you sure you want to pay later?"
    //       //Assert button No, I would like to pay now
    //       //Assert button Yes, I would like to pay later
    //     });
    //     it('Verify pay now and pay later confirmation buttons are displayed',()=>{

    //     });
    //     context('When I would like to pay later button is clicked',()=>{
    //       it('Verify 🎉 You have 72 hours to lock in your price and seat! page is opened',()=>{
    //         //Assert text "🎉 You have 72 hours to lock in your price and seat!"
    //         //Assert button Any questions? Click here to contact ScholarSite
    //       });
    //       //
    //     });
    //     context('When I would like to pay now button is clicked',()=>{
    //       it('Verify enter payment details page is opened',()=>{
    //         //Assert text "💳 Thanks Test, just one last step!"
    //         //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
    //         //Assert Full name input
    //         //Assert Card number input
    //         //Assert Exp date input
    //         //Assert CVV input
    //         //Assert submit button
    //         //Assert pay later button
    //       });
    //     });
    //   });
    // });
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
      //Assert First name input
      //Assert Last name input
      //Assert LinkedIn URL input
      //Assert complete enrollment button
    });
//     it('Verify complete enrollment button is clickable',()=>{
//       //Type First name
//       //Type Last name
//       //Type LinkedIn URL
//       //Assert complete enrollment button
//     });
//     context('When submit application button is clicked',()=>{
//       it('Verify enter payment details page is opened',()=>{
//         //Assert text "💳 Thanks Test, just one last step!"
//         //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
//         //Assert Full name input
//         //Assert Card number input
//         //Assert Exp date input
//         //Assert CVV input
//         //Assert submit button
//         //Assert pay later button
//       });
//       context('when terms and conditions checkbox is checked',()=>{
//         it('Verify submit button is not disabled',()=>{
//           //input Full
//           //input Card number
//           //input Exp date
//           //input CVV
//           //click submit button
//           //Assert text "🎉 You’ve completed your application!"
//           //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
//           //Assert Explore more ScholarSite cohorts button is visible
//         });
//         context('When submit button is clicked',()=>{
//           it('Verify complete application page is opened',()=>{
//             //input Full
//             //input Card number
//             //input Exp date
//             //input CVV
//             //click submit button
//             //Assert text "🎉 You’ve completed your application!"
//             //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
//             //Assert Explore more ScholarSite cohorts button is visible
//           });
//         });
//       });
//       context('when terms and conditions checkbox is unchecked',()=>{
//         it('Verify submit button is disabled',()=>{
//           //input Full
//           //input Card number
//           //input Exp date
//           //input CVV
//           //click submit button
//           //Assert text "🎉 You’ve completed your application!"
//           //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
//           //Assert Explore more ScholarSite cohorts button is visible
//         });
//       });
//       context('When pay later button is clicked',()=>{
//         it('Verify pay later confirmation modal is opened',()=>{
//           //Assert text "Are you sure you want to pay later?"
//           //Assert button No, I would like to pay now
//           //Assert button Yes, I would like to pay later
//         });
//         it('Verify pay now and pay later confirmation buttons are displayed',()=>{

//         });
//         context('When I would like to pay later button is clicked',()=>{
//           it('Verify 🎉 You have 72 hours to lock in your price and seat! page is opened',()=>{
//             //Assert text "🎉 You have 72 hours to lock in your price and seat!"
//             //Assert button Any questions? Click here to contact ScholarSite
//           });
//           //
//         });
//         context('When I would like to pay now button is clicked',()=>{
//           it('Verify enter payment details page is opened',()=>{
//             //Assert text "💳 Thanks Test, just one last step!"
//             //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
//             //Assert Full name input
//             //Assert Card number input
//             //Assert Exp date input
//             //Assert CVV input
//             //Assert submit button
//             //Assert pay later button
//           });
//         });
//       });
//     });
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
//     it('Verify terms and conditions checkbox is displayed',()=>{
//       //Type First name
//       //Type Last name
//       //Type LinkedIn URL
//       //Assert complete enrollment button
//     });
//     context('when terms and conditions checkbox is checked',()=>{
//       it('Verify submit button is not disabled',()=>{
//         //input Full
//         //input Card number
//         //input Exp date
//         //input CVV
//         //click submit button
//         //Assert text "🎉 You’ve completed your application!"
//         //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
//         //Assert Explore more ScholarSite cohorts button is visible
//       });
//       context('When submit button is clicked',()=>{
//         it('Verify complete application page is opened',()=>{
//           //input Full
//           //input Card number
//           //input Exp date
//           //input CVV
//           //click submit button
//           //Assert text "🎉 You’ve completed your application!"
//           //Assert text "You will shortly recieve an email documenting your application outcome and next steps!"
//           //Assert Explore more ScholarSite cohorts button is visible
//         });
//       });
//     });
//     context('when terms and conditions checkbox is unchecked',()=>{
//       it('Verify submit button is disabled',()=>{
//         //input Full
//         //input Card number
//         //input Exp date
//         //input CVV
//         //click submit button
//         //Assert text "🎉 You’ve completed your application!"
//         //Assert text "You will shortly receive an email documenting your application outcome and next steps!"
//         //Assert Explore more ScholarSite cohorts button is visible
//       });
//     });
  })
})
