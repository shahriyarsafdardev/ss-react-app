import { Button, Card, Stack, styled, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';

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

const StyledCard = styled(Card)(({ theme }) => ({
  padding: '40px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '25px'
  }
}));

export default function StudentProfilePrompt({
  setNetworkingModalState
}: {
  setNetworkingModalState: Function;
}) {
  const { user } = useAuth();

  const buttonText = () =>
    user?.networking_profile_completed
      ? 'Edit my networking profile'
      : 'Complete my networking profile';

  const handleButtonSubmit = () => {
    setNetworkingModalState(true);
  };

  return (
    <StyledCard>
      <Stack spacing={2}>
        <Typography variant="h4">Welcome to Sphere’s network!</Typography>
        <Typography>
          Sphere’s network consists of of ambitious professionals from organizations across the
          globe — from startups to blue-chips.{' '}
        </Typography>
        <Typography>
          Access to the peer network for your [Cohort Name] cohort will open 2 weeks before the
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
      </Stack>
    </StyledCard>
  );
}
