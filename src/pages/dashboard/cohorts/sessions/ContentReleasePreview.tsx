import { memo } from 'react';
import { Stack } from '@material-ui/core';
import { Cohort } from '../../../../@types/cohorts';
import {
  StyledCard,
  StyledImage,
  StyledButton,
  InstructorMessage,
  StyledTypography
} from './Common';

function ContentReleasePreview({
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

export default memo(ContentReleasePreview);
