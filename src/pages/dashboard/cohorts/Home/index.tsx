import { useState, useEffect } from 'react';

// material
import { Box, Container, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';

// components
import HomeTabHeader from './HomeTabHeader';
import VideoPreview from '../../../../components/cohorts/VideoPreview';
import Step3 from './BuildYourProfile';
import StepsCompleted from './StepsCompleted';

// redux
import axios from '../../../../utils/axios';
import { RootState, useSelector } from '../../../../redux/store';
import { Cohort } from '../../../../@types/cohorts';

type HomeResponse = {
  setup_completed: boolean;
  intro_video_url: string;
  discord_invitation_link: string;
  last_recorded_step: number;
};

const StyledButton = styled(LoadingButton)(() => ({
  padding: 11,
  width: 250,
  '&:hover': {
    backgroundColor: '#4D4DCD',
    opacity: 0.8
  }
}));

const Step1Container = styled(Box)(() => ({
  textAlign: 'center'
}));

const Step2Container = styled(Box)(() => ({
  textAlign: 'center',
  marginTop: '3rem'
}));

const StyledVideoPreview = styled(VideoPreview)(() => ({
  width: '75%',
  margin: '3rem auto 1.5rem'
}));

const DiscordDescription = styled(Typography)(() => ({
  marginBottom: '1.5rem'
}));

const emptyCohort: Cohort = {
  id: '',
  name: '',
  peers: [],
  sessions: []
};

export default function HomeTab() {
  const [activeStep, setActiveStep] = useState(1);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [stateCohort, setCohort] = useState<Cohort | undefined>(emptyCohort);
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/home`, { params: { cohort_id } })
      .then((res) => res.data)
      .then((payload) => {
        payload.last_recorded_step && setActiveStep(payload.last_recorded_step + 1);
        setHomeConfig(payload);
      });
    setCohort(cohorts.find((cohort) => cohort.id === cohort_id));
  }, [cohort_id, cohorts]);

  const selectStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 setActiveStep={setActiveStep} />;
      case 4:
        return <StepsCompleted />;
      default:
        return <div>default</div>;
    }
  };

  const sendStepCompletionRequest = (stepNumber: number) =>
    axios.get(`/cohorts/${cohort_id}/registration/step_completed`, {
      params: { cohort_id, step_number: stepNumber }
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
    <Container>
      <HomeTabHeader cohortTitle={stateCohort?.name || 'Cohort Title...'} activeStep={activeStep} />
      {selectStep()}
    </Container>
  );
}
