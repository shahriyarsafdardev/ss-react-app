import { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@material-ui/core';
import Navbar from 'components/subscription/teams/Navbar';
import { KeyboardBackspace } from '@material-ui/icons';
import LoadingScreen from 'components/LoadingScreen';
import Header from 'components/subscription/teams/Header';
import { useLocation } from 'react-router-dom';
import axios from 'utils/axios';
import OnboardChoice from './OnboardChoice';
import InviteMembersForm, { TeamMember } from './InviteMembersForm';
import PromptNote from './PromptNote';
import { RootStyle, StyledBackButton } from './Common';
import Payment from './Payment';

export default function TeamRegistration() {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSinglePayee, setIsSinglePayee] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const email = url.get('email') || '';
  const team = url.get('team') || '';
  const [clientSecret, setClientSecret] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    axios
      .get(`team_registrations/get_team_details.json`, {
        params: { email, team }
      })
      .then((res) => {
        console.log('Response:', res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };

  const selectComponent = () => {
    if (activeStep === 2) {
      return (
        <InviteMembersForm
          setStep={nextStep}
          isSinglePayee={isSinglePayee}
          email={email}
          team={team}
          setClientSecret={setClientSecret}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
        />
      );
    }
    if (activeStep === 3 && isSinglePayee) {
      return (
        <Payment
          team={team}
          teamMembers={teamMembers}
          email={email}
          clientSecret={clientSecret}
          setStep={nextStep}
        />
      );
    }
    if ((activeStep === 3 && !isSinglePayee) || activeStep === 4) {
      return <PromptNote username="dev.mahboob@gmail.com" password="sphere-2340" />;
    }
    return <OnboardChoice setStep={nextStep} setIsSinglePayee={setIsSinglePayee} />;
  };

  const teamRegistrationFlow = () => (
    <Stack width="100%">
      {!(activeStep === 3 && isSinglePayee) && (
        <Header activeStep={activeStep} isSinglePayee={isSinglePayee} />
      )}
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
        {selectComponent()}
      </Container>
    </Stack>
  );

  return (
    <RootStyle title="Sphere Cohort Registration">
      <Navbar activeStep={activeStep} />
      {activeStep !== 1 && (
        <StyledBackButton variant="outlined" onClick={() => previousStep()}>
          <KeyboardBackspace fontSize="large" />
        </StyledBackButton>
      )}
      {loading ? (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      ) : (
        <>{teamRegistrationFlow()}</>
      )}
    </RootStyle>
  );
}
