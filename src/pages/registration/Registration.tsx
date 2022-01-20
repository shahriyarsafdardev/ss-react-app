import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { Box, Stack, Button, Container, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
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

type UserType = {
  first_name?: string;
  last_name?: string;
  linkedin_url?: string;
  email?: string;
  host?: string;
  enrollment_id?: string;
  referrer?: string;
};

export default function Registration() {
  const [activeStep, setActiveStep] = useState(1);
  const url = new URLSearchParams(useLocation().search);
  const cohort_id = url.get('cohort_id') || '';

  const [user, setUser] = useState<UserType>({
    email: url.get('email') || '',
    referrer: url.get('referrer') || ''
  });

  const [loading, setLoading] = useState(true);

  const updateUserData = async (data: any) => {
    setUser({ ...user, ...data });
    setActiveStep(2);
  };

  useEffect(() => {
    if (user?.email && cohort_id) {
      axios
        .post(`/cohorts/${cohort_id}/enrollments.json`, {
          email: user?.email,
          coupon_code: user?.referrer
        })
        .then((res) => {
          res.data &&
            setUser({
              ...user,
              ...res.data
            });
          setLoading(false);
        });
    }
  }, []);

  const selectStep = () => {
    if (activeStep === 2) {
      return (
        <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
          <CardDetails
            cohortID={cohort_id}
            user={user?.first_name}
            enrollmentID={user?.enrollment_id}
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
              {user?.host} will review your submission within the next 48 hours. You will then
              recieve an email documenting the outcome and next steps!
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
          user={user}
          submitValues={(data: any) => updateUserData(data)}
        />
      </Stack>
    );
  };
  return (
    <RootStyle title="ScholarSite Cohort Registration">
      {loading ? (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      ) : (
        <Container maxWidth="lg">{selectStep()}</Container>
      )}
    </RootStyle>
  );
}
