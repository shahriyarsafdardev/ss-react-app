import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { RootState, useSelector } from 'redux/store';
import ProfileForm from './ProfileForm';

const StyledCard = styled(Stack)(({ theme }) => ({
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

const InstructorMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 80px 60px 60px',
  alignItems: 'center',
  width: '45%',
  borderRadius: '16px',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '40px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundSize: '100%',
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const BoldText = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ffffff'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  color: '#ffffff'
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px'
}));

export default function BasicProfileForm({
  setProfileFormSubmitted
}: {
  setProfileFormSubmitted: Function;
}) {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  return (
    <>
      <StyledCard>
        <InstructorMessage spacing={2}>
          <StyledImage
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/channels-box.svg"
            alt="channels image"
          />
          <Stack spacing={2}>
            <BoldText>
              We use Messaging in the Sphere portal for all cohort communications.{' '}
            </BoldText>
            <StyledTypography>
              Please fill in a few details so {cohort?.host_full_name} and your peers will know who
              you are. You can always edit these later under your profile.
            </StyledTypography>
          </Stack>
        </InstructorMessage>
        <ProfileForm setProfileFormSubmitted={setProfileFormSubmitted} cohortID={cohort_id} />
      </StyledCard>
    </>
  );
}
