// hooks
import { useState, useEffect } from 'react';
// material
import { Box, Container, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import useAuth from '../../../../hooks/useAuth';

// components
import HomeTabHeader from './HomeTabHeader';
import VideoPreview from '../../../../components/cohorts/VideoPreview';
import Step3 from './ProfileForm';
import StepsCompleted from './StepsCompleted';
import LoadindScreen from '../../../../components/LoadingScreen';

// axios
import axios from '../../../../utils/axios';

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  enrollment_id: string;
  intro_video_url: string;
  discord_invitation_link: string;
  last_recorded_step: number;
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

export default function HomeTab() {
  const [activeStep, setActiveStep] = useState(1);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/home.json`, { params: { cohort_id, participant_id: user?.id } })
      .then((res) => res.data)
      .then((payload) => {
        payload.last_recorded_step && setActiveStep(payload.last_recorded_step + 1);
        setHomeConfig(payload);
      });
  }, [cohort_id, user?.id]);

  console.log(homeConfig);
  const onFormSubmitHandler = async (values: UserProfileProps) => {
    await axios
      .post(`/cohorts/${cohort_id}/save_user_profile`, {
        ...values,
        enrollment_id: homeConfig?.enrollment_id
      })
      .then((res) => setActiveStep(4));
  };

  const selectStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return (
          <Step3 userProfile={homeConfig?.participant_profile} onSubmit={onFormSubmitHandler} />
        );
      case 4:
        return <StepsCompleted />;
      default:
        return <div />;
    }
  };

  const sendStepCompletionRequest = (stepNumber: number) =>
    axios.post(`/cohorts/${cohort_id}/step_completed`, {
      cohort_id,
      step_number: stepNumber,
      enrollment_id: homeConfig?.enrollment_id
    });

  const onStepComplete = (stepNumber: number) => {
    if (stepNumber === 2) {
      window.open(homeConfig?.discord_invitation_link, '_blank');
    }
    setActiveStep(stepNumber + 1);
    sendStepCompletionRequest(stepNumber);
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview video_url={homeConfig?.intro_video_url} />
      <StyledButton variant="contained" onClick={() => onStepComplete(1)}>
        Next Step
      </StyledButton>
    </Step1Container>
  );

  const Step2 = () => (
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
      <StyledButton variant="contained" onClick={() => onStepComplete(2)}>
        Join Discord Server
      </StyledButton>
    </Step2Container>
  );

  return (
    <>
      {!homeConfig ? (
        <LoadindScreen />
      ) : (
        <Container>
          <HomeTabHeader
            cohortTitle={homeConfig?.cohort_title || 'Cohort Title...'}
            activeStep={activeStep}
          />
          {selectStep()}
        </Container>
      )}
    </>
  );
}
