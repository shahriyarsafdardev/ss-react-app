import React from 'react';
import { Typography, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Cohort } from '../../../../@types/cohorts';

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
  padding: '60px',
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
  textAlign: 'center',
  maxWidth: '70%'
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '250px',
  height: '150px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '5px 70px',
  marginTop: '30px !important'
}));

export default function ContentReleasePreview({
  cohort,
  setInvitePeersModalState
}: {
  cohort: Cohort;
  setInvitePeersModalState: Function;
}) {
  return (
    <StyledCard>
      <InstructorMessage spacing={2}>
        <StyledTypography variant="h4" color="#ffffff">
          Thank you for sharing!
        </StyledTypography>
        <StyledTypography color="#ffffff">
          We’ll make sure to let {cohort?.host_full_name} know so they can help you meet your
          professional goals.
        </StyledTypography>
      </InstructorMessage>
      <Stack
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px 0px' }}
      >
        <StyledImage
          src="https://sphere-public.s3.eu-west-2.amazonaws.com/invite-team-box-grey.png"
          alt="invitation image"
        />
        <StyledTypography variant="h3">Upskill your team</StyledTypography>
        <StyledTypography>
          Learn collaboratively with your team and apply the learnings to the problems you're
          facing.
        </StyledTypography>
        <StyledButton variant="contained" onClick={() => setInvitePeersModalState(true)}>
          Invite your team
        </StyledButton>
      </Stack>
    </StyledCard>
  );
}
