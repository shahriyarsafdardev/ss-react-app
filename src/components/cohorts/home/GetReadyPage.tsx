import { memo } from 'react';
import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Cohort } from '../../../@types/cohorts';
import ContentReleaseDetails from './ContentReleaseDetails';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '500px',
  width: '100%',
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
  width: '60%',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '30px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  color: '#ffffff'
}));

const GetReadyPage = ({ cohort }: { cohort: Cohort }) => (
  <>
    <Stack direction="column" spacing={2} width="100%">
      <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
        {`Get ready for ${cohort?.name}`}
      </Typography>
      <StyledCard>
        <InstructorMessage spacing={2}>
          <StyledTypography variant="h5">
            Congratulations, you have completed the Pre-Cohort Checklist!
          </StyledTypography>
          <StyledTypography>
            The Course Content and Cohort Directory will be released 2 weeks before the cohort
            starts. In the meantime, you can:
          </StyledTypography>
          <StyledTypography>
            <ul style={{ marginLeft: '17px' }}>
              <li>Message your instructor and peers</li>
              <li>Network with alumni</li>
              <li>Invite your colleagues to join your cohort</li>
            </ul>
          </StyledTypography>
          <Typography sx={{ color: '#ffffff', fontSize: '15px' }}>
            Looking forward to seeing you soon,
          </Typography>
          <StyledTypography sx={{ fontWeight: 'bold' }}>{cohort?.host_full_names}</StyledTypography>
        </InstructorMessage>
        <ContentReleaseDetails />
      </StyledCard>
    </Stack>
  </>
);

export default memo(GetReadyPage);
