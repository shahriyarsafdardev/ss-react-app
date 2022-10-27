import React from 'react';
import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Cohort } from '../../../../@types/cohorts';
import ContentReleaseDate from './ContentReleaseDate';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '650px',
  width: '95%',
  maxWidth: '1200px',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const InstructorMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 80px 60px 60px',
  borderRadius: '16px',
  width: '45%',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '30px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundSize: '100%',
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  color: '#ffffff',
  textAlign: 'center',
  maxWidth: '70%'
}));

export default function ContentReleasePreview({ cohort }: { cohort: Cohort }) {
  return (
    <StyledCard>
      <InstructorMessage spacing={2}>
        <StyledTypography variant="h4">Thank you for sharing!</StyledTypography>
        <StyledTypography>
          We’ll make sure to let {cohort?.host_full_name} know so they can help you meet your
          professional goals.
        </StyledTypography>
      </InstructorMessage>
      <ContentReleaseDate />
    </StyledCard>
  );
}
