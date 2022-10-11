import { useState } from 'react';
import { Box, Container, Stack } from '@material-ui/core';
import Navbar from 'components/subscription/teams/Navbar';
import { KeyboardBackspace } from '@material-ui/icons';
import LoadingScreen from 'components/LoadingScreen';
import Header from 'components/subscription/teams/Header';
import OnboardChoice from './OnboardChoice';
import InviteMembersForm from './InviteMembersForm';
import PromptNote from './PromptNote';
import { RootStyle, StyledBackButton } from './Common';

export default function TeamRegistration() {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSinglePayee, setIsSinglePayee] = useState(false);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };

  const selectComponent = () => {
    if (activeStep === 2) {
      return <InviteMembersForm setStep={nextStep} isSinglePayee={isSinglePayee} />;
    }
    if (activeStep === 3) {
      return <PromptNote username="dev.mahboob@gmail.com" password="sphere-2340" />;
    }
    return <OnboardChoice setStep={nextStep} setIsSinglePayee={setIsSinglePayee} />;
  };

  const teamRegistrationFlow = () => (
    <Stack width="100%">
      <Header activeStep={activeStep} isSinglePayee={isSinglePayee} />
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
