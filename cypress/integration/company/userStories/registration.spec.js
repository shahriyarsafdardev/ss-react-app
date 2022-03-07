describe('Registration Flow', () => {
  context('When user is without credit account',()=>{
    it('Verify enter details page for enrollment is opened',()=>{
      //Assert text "👋 We just need a few more details to process your enrollment"
      //Assert First name input
      //Assert Last name input
      //Assert LinkedIn URL input
      //Assert complete enrollment button
    });
    it('Verify complete enrollment button is clickable',()=>{
      //Type First name
      //Type Last name
      //Type LinkedIn URL
      //Assert complete enrollment button
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
            //Assert text "You will shortly recieve an email documenting your application outcome and next steps!"
            //Assert Explore more ScholarSite cohorts button is visible
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
        it('Verify pay later mondal is opened',()=>{
          //Assert text "Are you sure you want to pay later?"
          //Assert button No, I would like to pay now
          //Assert button Yes, I would like to pay later
        });
        it('Verify enter payment details page is opened when Pay now button is clicked',()=>{
          //Assert text "💳 Thanks Test, just one last step!"
          //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
          //Assert Full name input
          //Assert Card number input
          //Assert Exp date input
          //Assert CVV input
          //Assert submit button
          //Assert pay later button
        });
        it('Verify 🎉 You have 72 hours to lock in your price and seat! page is opened when Yes button is clicked',()=>{
          //Assert text "🎉 You have 72 hours to lock in your price and seat!"
          //Assert button Any questions? Click here to contact ScholarSite
        });
      });
    });
  })
  context('When user is with credit account and charge participants= true',()=>{
    it('Verify enter details page for enrollment is opened',()=>{
      //Assert text "👋 We just need a few more details to process your enrollment"
      //Assert First name input
      //Assert Last name input
      //Assert LinkedIn URL input
      //Assert complete enrollment button
      //Assert term and conditions check box
    });
    context('when terms and conditions checkbox is checked',()=>{
      it('Verify complete enrollment button is clickable',()=>{

      });
      context('When submit application button is clicked',()=>{
        it('Verify enrollment sent for approval page is opened',()=>{

        });
    });
    context('when terms and conditions checkbox is unchecked',()=>{
      it('Verify complete enrollment button is not clickable',()=>{
      });
    });
  })
  context('When user is credit account and charge participants= false',()=>{})
})
  // context('credit_account included && credit_account.charge_participants == false',()=>{
  //   it('Verify web-flow page is opened',()=>{
  //     //Assert cohort title
  //     //Assert cohort information
  //     //Assert Email input
  //     //Assert Enroll button
  //   });
  //   it('Verify Enroll button is clickable',()=>{
  //     //Type Email
  //     //CLick Enroll button
  //   });
  //   context('When enroll button is clicked',()=>{
  //     it('Verify enter details page for enrollment is opened',()=>{
  //       //Assert text "👋 We just need a few more details to process your enrollment"
  //       //Assert First name input
  //       //Assert Last name input
  //       //Assert LinkedIn URL input
  //       //Assert complete enrollment button
  //     });
  //     it('Verify complete enrollment button is clickable',()=>{
  //       //Type First name
  //       //Type Last name
  //       //Type LinkedIn URL
  //       //Assert complete enrollment button
  //     });
  //   });
  //   context('When complete enrollment button is clicked',()=>{
  //     it('Verify enrollment sent for approval page open',()=>{
  //       //Assert text "🎉 Thanks ..., your enrollment has been sent to Upwork approval!"
  //       //Assert Explore more button is visible
  //     });
  //     it('Verify Explore more button is clickable',()=>{
  //       //Assert explore more button is clickable
  //     });
  //   });
  // });
  // context('credit_account included && credit_account.charge_participants == true',()=>{
  //   it('Verify web-flow page is opened',()=>{
  //     //Assert cohort title
  //     //Assert cohort information
  //     //Assert Email input
  //     //Assert Register button
  //   });
  //   it('Verify Register button is clickable',()=>{
  //     //Type Email
  //     //CLick Register button
  //   });
  //   context('When Register button is clicked',()=>{
  //     it('Verify enter details page for enrollment is opened',()=>{
  //       //Assert text "👋 We just need a few more details to process your enrollment"
  //       //Assert First name input
  //       //Assert Last name input
  //       //Assert LinkedIn URL input
  //       //Assert submit application button
  //     });
  //     it('Verify submit application button is clickable',()=>{
  //       //Type First name
  //       //Type Last name
  //       //Type LinkedIn URL
  //       //Assert submit application button
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
  //       context('When pay later button is clicked',()=>{
  //         it('Verify pay later mondal is opened',()=>{
  //           //Assert text "Are you sure you want to pay later?"
  //           //Assert button No, I would like to pay now
  //           //Assert button Yes, I would like to pay later
  //         });
  //         it('Verify enter payment details page is opened when No button is clicked',()=>{
  //           //Assert text "💳 Thanks Test, just one last step!"
  //         //Assert text "You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort."
  //         //Assert Full name input
  //         //Assert Card number input
  //         //Assert Exp date input
  //         //Assert CVV input
  //         //Assert submit button
  //         //Assert pay later button
  //         });
  //         it('Verify 🎉 You have 72 hours to lock in your price and seat! page is opened when Yes button is clicked',()=>{
  //           //Assert text "🎉 You have 72 hours to lock in your price and seat!"
  //           //Assert button Any questions? Click here to contact ScholarSite
  //         });
  //       });
  //     });
  //   });
  // });
