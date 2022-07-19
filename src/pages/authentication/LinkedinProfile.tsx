import { useLocation } from 'react-router-dom';
import { Stack, Box } from '@material-ui/core';

type CustomizedState = {
  profile: {
    first_name: string;
    last_name: string;
    headline: string;
  };
};

export default function LinkedinProfile() {
  const location = useLocation();
  const state = location.state as CustomizedState;

  const { profile } = state;

  return (
    <Stack
      direction="column"
      sx={{
        margin: 'auto',
        textAlign: 'center'
      }}
    >
      <Box>
        Name: {profile && profile?.first_name} {profile && profile?.last_name}
      </Box>
      <Box>Headline: {profile && profile?.headline}</Box>
    </Stack>
  );
}
