import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core//Step';
import StepLabel from '@material-ui/core//StepLabel';
import { Typography, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';

const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 30
}));

const CurrentStep = styled(Typography)(() => ({
  fontSize: 12,
  color: '#6C7885',
  textAlign: 'right'
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 32,
  marginBottom: '0.5rem'
}));

const SubTitle = styled(Typography)(() => ({
  fontWeight: 'normal',
  fontSize: 20,
  marginBottom: '2rem'
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '.css-wb2j8e-MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      display: 'none'
    }
  }
}));

export default function HomeTabHeader({
  children,
  activeStep,
  totalSteps,
  cohortTitle,
  showProgressBar = true
}: {
  children?: React.ReactNode;
  activeStep: number;
  cohortTitle: string;
  showProgressBar?: boolean;
  totalSteps: number;
}) {
  // eslint-disable-next-line no-nested-ternary
  const progress = () => {
    if (totalSteps === 0) {
      return 0;
    }
    return (activeStep / totalSteps) * 100;
  };
  return (
    <>
      <Title>{cohortTitle}</Title>
      {cohortTitle ? (
        <SubTitle>Before we get started you'll need to fill in a few details</SubTitle>
      ) : (
        ''
      )}
      {showProgressBar && (
        <>
          <ProgressBarContainer>
            <BorderLinearProgress variant="determinate" value={progress()} />
            <CurrentStep>
              {activeStep}/{totalSteps}
            </CurrentStep>
          </ProgressBarContainer>
        </>
      )}
      {children}
    </>
  );
}
