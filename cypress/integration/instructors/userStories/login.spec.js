describe('Sidebar', () => {
  beforeEach(() => {
    cy.server();
    cy.loginasadmin({});
  });
  // context('when in instructor mode', () => {
  //   it('Displays the instructor sidebar', () => {
  //     //(match by id)
  //   });
  //   it('Displays a CourseSection for each course the user is a host of', () => {

  //   });
    // describe('CourseSection', () => {
    //   it('Displays a header with the course name', () => {

    //   });

    //   it('Displays a CohortTab for each cohort within that course', () => {

    //   });
    //   describe('InstructorCohortTab', () => {
    //     it('Is labelled by its code', () => {

    //     });
    //     it('Opens a InstructorCohortPageList when clicked', () => {

    //     });

    //     describe('InstructorCohortPageList', () => {
    //       it('Allows the Instructor Home page to be opened', () => {

    //       });
    //       it('Allows the Networking page to be opened', () => {

    //       });
    //       it('Allows the Sessions page to be opened', () => {

    //       });
    //       it('Allows the Q&A page to be opened', ()=>{

    //       });
        // });
    //  });
    // });
  //});
  // context('when in learner mode', () => {
  //   it('Displays the learner sidebar', () => {
  //     //(match by id)
  //   });
  //   it('Displays a LearnerCohortTab for each cohort the instructor hosts or is enrolled in', () => {

  //   });

  //   describe('LearnerCohortTab', () => {
  //     it('Is labelled by its name and code', () => {

  //     });
  //     it('Opens a LearnerCohortPageList when clicked' ,() => {

  //     });
  //     describe('LearnerCohortPageList', () => {
  //       it('Allows the Learner Home page to be opened without the onboarding flow appearing', () => {

  //       });
  //       it('Allows the Networking page to be opened', () => {

  //       });
  //       it('Allows the Sessions page to be opened', () => {

  //       });
  //       it('Allows the Q&A page to be opened', () => {

  //       });
  //     });
  //   });
  // });
  describe('ModeToggle',() => {
    it('Displays info text',() => {

    });
    it('Alows toggle between instructor and student mode',()=>{
      //(press, match by id and assert that page is reloaded to first on the menu bar)
    });
  });
});
