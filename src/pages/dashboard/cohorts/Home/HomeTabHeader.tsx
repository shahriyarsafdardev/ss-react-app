import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core//Step';
import StepLabel from '@material-ui/core//StepLabel';
import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';

const steps = ['Watch Welcome Video', 'Join Discord Server', 'Build Your Profile'];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 5,
  marginBottom: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 32,
  marginBottom: '2rem'
}));

const stepper = (activeStep: number) => (
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map((label) => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default function HomeTabHeader({
  children,
  activeStep
}: {
  children?: React.ReactNode;
  activeStep: number;
}) {
  return (
    <>
      <Title>Welcome to The Economics of the Internet</Title>
      <BorderLinearProgress variant="determinate" value={50} />
      {stepper(0)}
      {children}
    </>
  );
}
