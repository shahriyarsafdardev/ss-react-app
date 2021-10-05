import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import VideoPreview from 'components/cohorts/VideoPreview';
import { LoadingButton } from '@material-ui/lab';
import Step4 from 'pages/dashboard/cohorts/Home/ProfileForm';
import { useDispatch } from 'redux/store';
import { updateOnboardingStatus } from 'redux/slices/cohort';
import HomeTabHeader from './HomeTabHeader';
import SurveyRow from '../sessions/SurveyRow';

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  enrollment_id: string | any;
  intro_video_url: string;
  discord_invitation_link: string;
  last_recorded_step: number;
  participant_profile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: string;
    current_position: string;
    current_company: string;
    strengths: string[];
    interests: string[];
  };
};

type UserProfileProps = {
  email: string;
  firstName: string;
  lastName: string;
  currentComapny: string;
  photoURL: string;
  interests: [];
  strengths: [];
};

const OnboardingStepsContainer = styled('div')(() => ({
  display: 'flex',
  borderRadius: '25px',
  maxHeight: '70vh'
}));

const CohortAuthorPreview = styled('div')(() => ({
  height: '100%',
  backgroundImage: `url("/static/cohorts-home/author-preview.png")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderTopLeftRadius: '25px',
  borderBottomLeftRadius: '25px'
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'white',
  height: '80vh',
  padding: '50px',
  borderTopRightRadius: '25px',
  position: 'relative',
  borderBottomRightRadius: '25px'
}));

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  width: 250,
  '&:hover': {
    backgroundColor: '#4D4DCD',
    opacity: 0.8
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const Step1Container = styled(Box)(() => ({
  textAlign: 'center'
}));

const Step2Container = styled(Box)(() => ({
  textAlign: 'center',
  margin: '2rem 0',
  padding: '2rem 0',
  backgroundColor: '#F4F6F8'
}));

const StyledVideoPreview = styled('video')(({ theme }) => ({
  width: '75%',
  margin: '3rem auto 1.5rem',
  borderRadius: '25px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const DiscordDescription = styled(Typography)(() => ({
  marginBottom: '1.5rem'
}));

const questions = [
  {
    question_type: 'multiple-choice',
    title: '1. How did you hear about this cohort?',
    options: [
      'Google Search',
      'Email Marketing',
      'Social Media',
      'Recommended by a friend or colleague',
      'Personally invited by someone in the Scholarsite team',
      'Other'
    ],
    submitted_answer: null
  },
  {
    question_type: 'multiple-choice',
    title: '2. Who is paying for this course?',
    options: ['I am', 'My employer is', 'Other'],
    submitted_answer: null
  },
  {
    question_type: 'multiple-choice',
    title:
      '3. Would you like your participation in the Scholarsite cohort to count towards professional development accreditation (CPD, CPE or CE)?',
    options: ['Yes', 'No', 'Maybe?'],
    submitted_answer: null
  },
  {
    question_type: 'multi-select',
    title: '4. What are you looking to find within the Scholarsite community?',
    options: [
      'Find a mentor',
      'Mentor others',
      'Grow my network',
      'Discuss materials',
      'Not interested'
    ],
    submitted_answer: null
  },
  {
    question_type: 'create-multi-select',
    title: '5. What topics can fellow cohort members ask you question on?*',
    options: ['Economics', 'Crypto', 'Digital Economics'],
    submitted_answer: null
  }
];

export default function OnboardingModal() {
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(0);
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const totalSteps = questions.length + 3;

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/home.json`, { params: { cohort_id, participant_id: user?.id } })
      .then((res) => res.data)
      .then((payload) => {
        payload.last_recorded_step && setActiveStep(payload.last_recorded_step + 1);
        setHomeConfig(payload);
      });
  }, [cohort_id, user?.id]);

  const sendStepCompletionRequest = (stepNumber: number, answer?: string) =>
    axios.post(`/cohorts/${cohort_id}/step_completed.json`, {
      cohort_id,
      step_number: stepNumber,
      enrollment_id: homeConfig?.enrollment_id,
      answer
    });

  const onStepChange = (stepNumber: number) => {
    // if (stepNumber === 3) {
    //   window.open(homeConfig?.discord_invitation_link, '_blank');
    // }

    if (stepNumber > 0 && stepNumber < totalSteps - 2) {
      sendStepCompletionRequest(activeStep, currentAnswer || '');
      setCurrentAnswer(null);
    } else {
      sendStepCompletionRequest(activeStep);
    }

    setActiveStep(stepNumber + 1);
  };

  const onFormSubmitHandler = async (values: UserProfileProps) => {
    await axios
      .post(`/cohorts/${cohort_id}/save_user_profile`, {
        ...values,
        enrollment_id: homeConfig?.enrollment_id,
        step_number: activeStep
      })
      .then((res) => {
        setModal(false);
        enqueueSnackbar('Profile has been updated', { variant: 'success' });
        dispatch(updateOnboardingStatus(cohort_id));
      });
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview src={homeConfig?.intro_video_url} />
    </Step1Container>
  );

  const Step3 = () => (
    <Step2Container>
      <img
        src="/static/cohorts-home/workplace.svg"
        alt="workplace.svg"
        width={150}
        style={{ margin: '0 auto 1.5rem' }}
      />
      <DiscordDescription>
        Discord is a nice plataform to chat to the Cohort. Try to use now!
      </DiscordDescription>
      <StyledButton
        variant="contained"
        style={{ backgroundColor: '#5B0F8D' }}
        onClick={() => {
          window.open(homeConfig?.discord_invitation_link, '_blank');
        }}
      >
        Join Discord Server
      </StyledButton>
    </Step2Container>
  );

  const handleNext = () => {
    sendStepCompletionRequest(activeStep, currentAnswer || '');
    setActiveStep(activeStep + 1);
    setCurrentAnswer(null);
  };

  const OnBoardingQuestions = () => (
    <div style={{ height: '50vh', paddingTop: '50px' }}>
      <SurveyRow
        item={questions[activeStep - 1]}
        submitted_answer={currentAnswer || ''}
        onChange={setCurrentAnswer}
      />
    </div>
  );

  const selectStep = () => {
    if (activeStep === 0) {
      return <Step1 />;
    }

    if (activeStep === totalSteps - 1) {
      return (
        <div>
          <Step4 userProfile={homeConfig?.participant_profile} onSubmit={onFormSubmitHandler} />;
        </div>
      );
    }

    if (activeStep === totalSteps - 2) {
      return <Step3 />;
    }

    if (activeStep >= 1 && activeStep < totalSteps) {
      return OnBoardingQuestions();
    }

    return <div>All steps are completed!</div>;
  };

  const headContent = () => {
    if (activeStep === 0) {
      return `Welcome to ${homeConfig?.cohort_title}`;
    }

    if (activeStep === totalSteps - 1) {
      return 'Finally, fill out your profile for the directory.';
    }

    if (activeStep === totalSteps - 2) {
      return 'Next, make sure you join the Discord server so you can interact with the cohort!';
    }

    if (activeStep >= 1 && activeStep <= totalSteps - 3) {
      return ' Now we just want to ask you a few questions so we can get to know you better';
    }
    return '';
  };

  const OnBoardingSteps = () => (
    <OnboardingStepsContainer>
      <Grid container>
        <Grid item md={5}>
          <CohortAuthorPreview />
        </Grid>
        <Grid item md={7}>
          <StyledContainer>
            <HomeTabHeader
              cohortTitle={headContent()}
              activeStep={activeStep}
              totalSteps={totalSteps}
              showProgressBar={true}
            />
            {selectStep()}
            {activeStep !== totalSteps - 1 && (
              <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                <StyledButton
                  variant="contained"
                  style={{ marginLeft: '30px' }}
                  onClick={() => onStepChange(activeStep)}
                >
                  Next
                </StyledButton>
              </div>
            )}
          </StyledContainer>
        </Grid>
      </Grid>
    </OnboardingStepsContainer>
  );

  return (
    <Modal open={modal} zIndex={1400}>
      <OnBoardingSteps />
    </Modal>
  );
}
