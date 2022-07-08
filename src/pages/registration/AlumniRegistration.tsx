import { styled } from '@material-ui/core/styles';
import { Box, Stack, Button, Container, Typography } from '@material-ui/core';
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export default function AlumniRegistration() {
  return (
    <RootStyle title="Sphere Cohort Registration">
      <Container maxWidth="lg">
        <Stack
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph data-testid="remainingTime">
              👋 We look forward to seeing you soon
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }} data-testid="email-message">
              We just sent over a calendar invite over email, if you haven’t recieved it, make sure
              you check your junk!
            </Typography>
          </Box>
          <Button
            href="https://www.linkedin.com/groups/14089598/"
            variant="contained"
            color="primary"
            data-testid="contact-btn"
          >
            Submit your questions ahead of time
          </Button>
        </Stack>
      </Container>
    </RootStyle>
  );
}
