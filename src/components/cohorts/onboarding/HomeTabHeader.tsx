import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import { Typography, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';

export const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

export const CurrentStep = styled(Typography)(() => ({
  fontSize: 12,
  color: '#6C7885',
  textAlign: 'right'
}));

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
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
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: '1rem'
}));

const Description = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 12,
  marginBottom: '1rem',
  color: '#6C7885'
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
  cohortDescription,
  showProgressBar = true
}: {
  children?: React.ReactNode;
  activeStep: number;
  cohortTitle: any;
  showProgressBar?: boolean;
  totalSteps: number;
  cohortDescription: string | undefined;
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
      {cohortTitle ? <SubTitle data-testid="onboard-title">{cohortTitle}</SubTitle> : ''}
      {cohortDescription ? (
        <Description data-testid="onboard-header-description">{cohortDescription}</Description>
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
