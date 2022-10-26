import React from 'react';
import { Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import SurveyQuestions from '../SurveyQuestions';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '500px',
  width: '100%',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  margin: 2,
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const PictureStyle = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/purple_circle.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'right',
  borderRadius: '16px',
  width: '20%'
}));

export default function CohortQuestionnair() {
  return (
    <StyledCard direction="column" justifyContent="center" alignItems="center">
      {/* <PictureStyle /> */}
      <SurveyQuestions />
    </StyledCard>
  );
}
