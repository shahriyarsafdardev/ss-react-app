import { Button, Stack, styled, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { trackEvent } from 'utils/eventTracking';
import { Cohort } from '../../@types/cohorts';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '300px',
  width: '100%',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  marginBottom: '32px',
  [theme.breakpoints.down('md')]: {
    height: '350px'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const NetworkingMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 20px',
  alignItems: 'center',
  width: '50%',
  borderRadius: '16px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '60%'
  },
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

const StyledContent = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  margin: 'auto',
  padding: '0px 100px',
  [theme.breakpoints.down('lg')]: {
    padding: '0px 80px'
  },
  [theme.breakpoints.down('md')]: {
    padding: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 40px'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  height: '40px',
  width: 'fit-content',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    margin: 'auto !important',
    marginTop: '16px !important'
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

export default function StudentProfilePrompt({
  setNetworkingModalState,
  cohort
}: {
  setNetworkingModalState: Function;
  cohort: Cohort;
}) {
  const { user } = useAuth();

  const buttonText = () =>
    user?.networking_profile_completed
      ? 'Edit my networking profile'
      : 'Complete my networking profile';

  const handleButtonSubmit = () => {
    trackEvent(cohort, 'Networking - "Complete My Networking Profile" Selected');
    setNetworkingModalState(true);
  };

  return (
    <>
      <StyledStack>
        <NetworkingMessage spacing={2}>
          <Stack spacing={2}>
            <BoldText>Welcome to Sphere’s network!</BoldText>
            <StyledTypography>
              Sphere’s network consists of of ambitious professionals from organizations across the
              globe — from startups to blue-chips.
            </StyledTypography>
          </Stack>
        </NetworkingMessage>
        <StyledContent spacing={2}>
          <Typography>
            Access to the peer network for your {cohort?.name} cohort will open 2 weeks before the
            cohort begins.
          </Typography>
          <Typography>
            Until then, complete your networking profile and enjoy access to Sphere’s diverse alumni
            network.
          </Typography>
          <StyledButton
            variant={user?.networking_profile_completed ? 'outlined' : 'contained'}
            onClick={handleButtonSubmit}
          >
            {buttonText()}
          </StyledButton>
        </StyledContent>
      </StyledStack>
    </>
  );
}
