import React, { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import HomeTabHeader from './HomeTabHeader';
import VideoPreview from '../../../../components/cohorts/VideoPreview';

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

const StyledVideoPreview = styled(VideoPreview)(() => ({
  width: '75%',
  margin: '3rem auto 1.5rem'
}));

export default function HomeTab() {
  const [activeStep, setActiveStep] = useState(1);

  const selectStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <div>test</div>;
      default:
        return <div>default</div>;
    }
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview />
      <StyledButton variant="contained" onClick={() => setActiveStep(2)}>
        Next Step
      </StyledButton>
    </Step1Container>
  );

  return (
    <Container>
      <HomeTabHeader activeStep={activeStep} />
      {selectStep()}
    </Container>
  );
}
