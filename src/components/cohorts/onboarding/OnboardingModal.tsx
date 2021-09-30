import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { Box, Container, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import VideoPreview from 'components/cohorts/VideoPreview';
import { LoadingButton } from '@material-ui/lab';
import Step4 from 'pages/dashboard/cohorts/Home/ProfileForm';
import { useDispatch } from 'redux/store';
import { updateOnboardingStatus } from 'redux/slices/cohort';
import HomeTabHeader from './HomeTabHeader';
import SurveyQuestionForm from './SurveyQuestionForm';

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  enrollment_id: string | any;
  intro_video_url: string;
  discord_invitation_link: string;
  last_recorded_step: number;
  last_recorded_question: number;
  participant_profile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: string;
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

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'white',
  padding: '50px',
  borderRadius: '25px'
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
  marginTop: '3rem'
}));

const StyledVideoPreview = styled(VideoPreview)(({ theme }) => ({
  width: '75%',
  margin: '3rem auto 1.5rem',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const DiscordDescription = styled(Typography)(() => ({
  marginBottom: '1.5rem'
}));

export default function OnboardingModal() {
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user } = useAuth();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(1);
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();

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
      question_type: 'multiple-choice',
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
      question_type: 'text-input',
      title: '5. What topics can fellow cohort members ask you question on?*',
      submitted_answer: null
    }
  ];

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/home.json`, { params: { cohort_id, participant_id: user?.id } })
      .then((res) => res.data)
      .then((payload) => {
        payload.last_recorded_step && setActiveStep(payload.last_recorded_step + 1);
        setHomeConfig(payload);
      });
  }, [cohort_id, user?.id]);

  const sendStepCompletionRequest = (stepNumber: number) =>
    axios.post(`/cohorts/${cohort_id}/step_completed`, {
      cohort_id,
      step_number: stepNumber,
      enrollment_id: homeConfig?.enrollment_id
    });

  const onStepComplete = (stepNumber: number) => {
    if (stepNumber === 3) {
      window.open(homeConfig?.discord_invitation_link, '_blank');
    }
    setActiveStep(stepNumber + 1);
    sendStepCompletionRequest(stepNumber);
  };

  const onFormSubmitHandler = async (values: UserProfileProps) => {
    await axios
      .post(`/cohorts/${cohort_id}/save_user_profile`, {
        ...values,
        enrollment_id: homeConfig?.enrollment_id
      })
      .then((res) => {
        setModal(false);
        dispatch(updateOnboardingStatus(cohort_id));
      });
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview video_url={homeConfig?.intro_video_url} />
      <StyledButton variant="contained" onClick={() => onStepComplete(1)}>
        Next Step
      </StyledButton>
    </Step1Container>
  );

  const Step3 = () => (
    <Step2Container>
      <img
        src="/static/cohorts-home/workplace.svg"
        alt="workplace.svg"
        width={250}
        style={{ margin: '0 auto 1.5rem' }}
      />
      <DiscordDescription>
        Discord is a nice plataform to chat to the Cohort. Try to use now!
      </DiscordDescription>
      <StyledButton variant="contained" onClick={() => onStepComplete(3)}>
        Join Discord Server
      </StyledButton>
    </Step2Container>
  );

  const selectStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1 />;
      case 2:
        return (
          <SurveyQuestionForm
            last_recorded_question={homeConfig?.last_recorded_question}
            questionsData={questions}
            onComplete={() => onStepComplete(2)}
          />
        );
      case 3:
        return <Step3 />;
      case 4:
        return (
          <Step4 userProfile={homeConfig?.participant_profile} onSubmit={onFormSubmitHandler} />
        );
      // case 5:
      //   return <StepsCompleted />;
      default:
        return <div />;
    }
  };

  return (
    <Modal open={modal}>
      <StyledContainer>
        <HomeTabHeader
          cohortTitle={homeConfig?.cohort_title || 'Cohort Title...'}
          activeStep={activeStep}
          showProgressBar={activeStep !== 2}
        />
        {selectStep()}
      </StyledContainer>
    </Modal>
  );
}
