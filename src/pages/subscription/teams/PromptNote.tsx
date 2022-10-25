import { Button, Stack } from '@material-ui/core';
import { StyledTypography } from './Common';

export default function PromptNote({ username, password }: { username: string; password: string }) {
  return (
    <Stack width="100%" display="flex" justifyContent="center" alignItems="center">
      <Stack sx={{ mb: 5 }}>
        <StyledTypography>Your login details are:</StyledTypography>
        <StyledTypography>Username: {username}</StyledTypography>
        <StyledTypography>Password: {password}</StyledTypography>
      </Stack>
      <Button
        href="https://www.getsphere.com/#upcoming-cohorts-slider"
        variant="contained"
        color="primary"
        data-testid="business-portal-btn"
        sx={{ borderRadius: '30px', height: '40px' }}
      >
        Go to Business Portal
      </Button>
    </Stack>
  );
}
