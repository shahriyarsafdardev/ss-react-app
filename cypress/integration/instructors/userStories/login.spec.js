Describe (Sidebar)

  Context (when in instructor mode)

    It (Displays the instructor sidebar) (match by id)  

    It (Displays a CourseSection for each course the user is a host of)
    
    Describe (CourseSection)

      It (Displays a header with the course name)
      
      It (Displays a CohortTab for each cohort within that course)
      
      Describe (InstructorCohortTab)
      
          It (Is labelled by its code)
          
          It (Opens a InstructorCohortPageList when clicked)

          Describe (InstructorCohortPageList)
          
            It (Allows the Instructor Home page to be opened) 

            It (Allows the Networking page to be opened) 

            It (Allows the Sessions page to be opened) 

            It (Allows the Q&A page to be opened) 

  Context (when in learner mode)

    It (Displays the learner sidebar) (match by id)  

    It (Displays a LearnerCohortTab for each cohort the instructor hosts or is enrolled in)

    Describe (LearnerCohortTab)

      It (Is labelled by its name and code)
          
      It (Opens a LearnerCohortPageList when clicked)

      Describe (LearnerCohortPageList)
      
        It (Allows the Learner Home page to be opened without the onboarding flow appearing) 

        It (Allows the Networking page to be opened) 

        It (Allows the Sessions page to be opened) 

        It (Allows the Q&A page to be opened) 


  Describe (ModeToggle)

    It (Displays info text)

    It (Alows toggle between instructor and student mode) (press, match by id and assert that page is reloaded to first on the menu bar)


