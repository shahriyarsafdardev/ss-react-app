import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Stack, Button, Container, Typography } from '@material-ui/core';
import UserForm from './UserForm';
import CardDetails from './CardDetails';
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export default function Registration() {
  const [activeStep, setActiveStep] = useState(1);
  const url = new URLSearchParams(useLocation().search);
  const cohort_id = url.get('cohort_id') || '';
  const email = url.get('email') || '';

  const [host, setHost] = useState('Host');
  const [enrollment_id, setEnrollmentID] = useState('');
  const [user, setUser] = useState('');

  const updateUserData = async (data: any) => {
    setEnrollmentID(data.enrollment_id);
    setHost(data.host);
    setUser(data.user);
    setActiveStep(2);
  };

  const selectStep = () => {
    if (activeStep === 2) {
      return (
        <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
          <CardDetails
            cohortID={cohort_id}
            user={user}
            enrollmentID={enrollment_id}
            setStep={(step: number) => setActiveStep(step)}
          />
        </Stack>
      );
    }

    if (activeStep === 3) {
      return (
        <Stack
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph>
              🎉 You’ve completed your application!
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              {host} will review your submission and accept you into the cohort within 48 hours
            </Typography>
          </Box>
          <Button
            href="https://www.scholarsite.io/#upcoming-cohorts-slider"
            variant="contained"
            color="primary"
          >
            Explore more ScholarSite cohorts
          </Button>
        </Stack>
      );
    }

    return (
      <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
        <UserForm
          cohortID={cohort_id}
          email={email}
          submitValues={(data: any) => updateUserData(data)}
        />
      </Stack>
    );
  };
  return (
    <RootStyle title="Payment | Minimal-UI">
      <Container maxWidth="lg">{selectStep()}</Container>
    </RootStyle>
  );
}
