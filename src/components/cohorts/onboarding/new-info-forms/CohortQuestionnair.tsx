import React from 'react';
import { Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import SurveyQuestions from '../SurveyQuestions';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '650px',
  width: '95%',
  maxWidth: '1200px',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const PictureStyle = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/purple_semicircle.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  borderRadius: '16px',
  width: '20%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export default function CohortQuestionnair() {
  return (
    <StyledStack alignItems="center">
      <PictureStyle />
      <SurveyQuestions />
    </StyledStack>
  );
}
