import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { Box, Typography, Button } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import Step4 from 'pages/dashboard/cohorts/Home/ProfileForm';
import { useDispatch } from 'redux/store';
import { updateOnboardingStatus } from 'redux/slices/cohort';
import { ParticipantProfile } from '../../../@types/user';
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
    discord_url: string;
    profile_image_url: string;
    current_position: string;
    current_company: string;
    strengths: string[];
    interests: string[];
  };
};

const MODAL_HEIGHT = '600px';

const OnboardingStepsContainer = styled('div')(() => ({
  display: 'flex',
  borderRadius: '25px'
}));

const CohortAuthorPreview = styled('div')(({ theme }) => ({
  height: MODAL_HEIGHT,
  width: '430px',
  alignSelf: 'center',
  backgroundImage: `url("https://scholarsite-public.s3.eu-west-2.amazonaws.com/author-preview-min.png")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  borderTopLeftRadius: '25px',
  borderBottomLeftRadius: '25px',
  [theme.breakpoints.down(1250)]: {
    display: 'none'
  }
}));

const ContentContainer = styled('div')(({ theme }) => ({
  flex: '1',
  backgroundColor: 'white',
  height: MODAL_HEIGHT,
  padding: '50px',
  boxSizing: 'border-box',
  borderTopRightRadius: '25px',
  borderBottomRightRadius: '25px',
  [theme.breakpoints.down(1250)]: {
    borderRadius: '25px',
    height: '100%'
  }
}));

const QuestionWrapper = styled('div')(() => ({
  height: '70%',
  paddingTop: '10px'
}));

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  width: '250px !important',
  '&:hover': {
    backgroundColor: '#4D4DCD',
    opacity: 0.8
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  position: 'absolute',
  bottom: '30px',
  right: '50px'
}));

const DiscordButton = styled(Button)(({ theme }) => ({
  padding: 11,
  width: '250px !important',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const Step1Container = styled(Box)(() => ({
  textAlign: 'center'
}));

const Step2Container = styled(Box)(() => ({
  textAlign: 'center',
  margin: '20px 0',
  marginBottom: '50px',
  padding: '1rem 0',
  backgroundColor: '#F4F6F8'
}));

const StyledVideoPreview = styled('video')(({ theme }) => ({
  width: '92%',
  marginBottom: '100px',
  marginTop: '20px',
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
    title: 'How did you hear about this cohort?',
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
    title: 'Who is paying for this course?',
    options: ['I am', 'My employer is', 'Other'],
    submitted_answer: null
  },
  {
    question_type: 'multiple-choice',
    title:
      'Would you like your participation in the Scholarsite cohort to count towards professional development accreditation (CPD, CPE or CE)?',
    options: ['Yes', 'No', 'Maybe?'],
    submitted_answer: null
  },
  {
    question_type: 'multi-select',
    title: 'What are you looking to find within the Scholarsite community?',
    options: ['Find a mentor', 'Mentor others', 'Grow my network', 'Discuss materials'],
    submitted_answer: null
  },
  {
    question_type: 'create-multi-select',
    title: 'What topics can fellow cohort members ask you question on?',
    options: ['Economics', 'Management', 'Hiring', 'Statistics'],
    submitted_answer: null
  }
];

export default function OnboardingModal({ onSubmit }: { onSubmit: Function }) {
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(0);
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);

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
    if (stepNumber > 0 && stepNumber < totalSteps - 2) {
      sendStepCompletionRequest(activeStep, currentAnswer || '');
      setCurrentAnswer(null);
    } else {
      sendStepCompletionRequest(activeStep);
    }

    setActiveStep(stepNumber + 1);
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();
    uploadData.append('enrollment_id', homeConfig?.enrollment_id);
    uploadData.append('step_number', activeStep.toString());
    values.first_name && uploadData.append('first_name', values.first_name);
    values.last_name && uploadData.append('last_name', values.last_name);
    values.linkedin_url && uploadData.append('linkedin_url', values.linkedin_url);
    values.discord_url && uploadData.append('discord_url', values.discord_url);
    values.current_company && uploadData.append('current_company', values.current_company);
    values.current_position && uploadData.append('current_position', values.current_position);
    values.strengths && uploadData.append('strengths', values.strengths);
    values.interests && uploadData.append('interests', values.interests);
    values.profile_image_url.image && uploadData.append('image', values.profile_image_url.image);

    onSubmit();

    await axios.post(`/cohorts/${cohort_id}/save_user_profile.json`, uploadData).then((res) => {
      console.log(res.data);
      console.log('cohort_id', cohort_id);
      setModal(false);
      enqueueSnackbar('Profile Updated successfully', { variant: 'success' });
      dispatch(updateOnboardingStatus(cohort_id));
      updateProfile({ ...res.data });
    });
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview
        src="https://scholarsite-public.s3.eu-west-2.amazonaws.com/Welcome+Video+-+BINFX+F21.mp4"
        poster="https://scholarsite-public.s3.eu-west-2.amazonaws.com/andrei-julian-thumbnail.jpeg"
        controls
      />
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
        All cohort communication will be done through the Discord platform. <br />
        Please join the BINFX server by clicking the button below.
      </DiscordDescription>
      <DiscordButton
        variant="outlined"
        onClick={() => {
          window.open(homeConfig?.discord_invitation_link, '_blank');
        }}
      >
        Join Discord Server
      </DiscordButton>
    </Step2Container>
  );

  const OnBoardingQuestions = () => (
    <QuestionWrapper>
      <SurveyRow
        item={questions[activeStep - 1]}
        submitted_answer={currentAnswer || ''}
        onChange={setCurrentAnswer}
      />
    </QuestionWrapper>
  );

  const selectStep = () => {
    if (activeStep === 0) {
      return <Step1 />;
    }

    if (activeStep === totalSteps - 1) {
      return (
        <div>
          <Step4
            userProfile={homeConfig?.participant_profile}
            isOnboardingModal={true}
            onSubmit={onFormSubmitHandler}
          />
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
      return `Welcome to BINFX F21! Here is a message from your instructors!`;
    }

    if (activeStep === totalSteps - 1) {
      return 'Finally, fill out your profile for the directory.';
    }

    if (activeStep === totalSteps - 2) {
      return 'Next, make sure you join the Discord server so you can interact with the cohort!';
    }

    if (activeStep >= 1 && activeStep <= totalSteps - 3) {
      return "First off, we'd like to ask you a few questions so we can get to know you better";
    }
    return '';
  };

  const OnBoardingSteps = () => (
    <OnboardingStepsContainer>
      <CohortAuthorPreview />
      <ContentContainer>
        <HomeTabHeader
          cohortTitle={headContent()}
          activeStep={activeStep}
          totalSteps={totalSteps}
          showProgressBar={true}
        />
        {selectStep()}
        {activeStep !== totalSteps - 1 && (
          <div style={{ display: 'absolute', bottom: '10px', right: '0px' }}>
            {/* <StyledButton
              variant="contained"
              disabled={activeStep == 0}
              style={{ marginLeft: '30px', width: '100px !important' }}
              onClick={() => {
                setActiveStep(activeStep - 1);
              }}
            >
              Back
            </StyledButton> */}
            {/* <div style={{ position: 'absolute', bottom: '0px', right: '0px' }}>Hello</div> */}
            <StyledButton
              variant="contained"
              disabled={
                activeStep > 0 &&
                activeStep < totalSteps - 2 &&
                (!currentAnswer || currentAnswer.length === 0)
              }
              // style={{
              //   marginLeft: '30px',
              //   width: '100px !important',
              //   display: 'absolute !important',
              //   bottom: '10px !important',
              //   right: '0px !important'
              // }}
              onClick={() => onStepChange(activeStep)}
            >
              Next
            </StyledButton>
          </div>
        )}
      </ContentContainer>
    </OnboardingStepsContainer>
  );

  return (
    <Modal open={modal} zIndex={1400}>
      <OnBoardingSteps />
    </Modal>
  );
}
