import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { Box, Stack, Button, Container, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import UserForm from './UserForm';
import CardDetails from './CardDetails';
import Page from '../../components/Page';
import AlumniRegistration from './AlumniRegistration';

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
  acceptedTerms: boolean;
  alumni_event: boolean;
};

export default function Registration() {
  const [activeStep, setActiveStep] = useState(1);
  const url = new URLSearchParams(useLocation().search);
  const cohort_id = url.get('cohort_id') || '';
  const credit_account_id = url.get('credit_account') || '';
  const ref_source = url.get('source') || '';
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<UserType>({
    email: url.get('email') || '',
    referrer: url.get('referrer') || '',
    acceptedTerms: false,
    alumni_event: false
  });

  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [alumniEvent, setAlumniEvent] = useState(false);

  const updateUserData = async (data: any) => {
    setUser({ ...user, ...data });
    if (account) {
      setActiveStep(3);
    } else {
      setActiveStep(2);
    }
  };

  useEffect(() => {
    if (user?.email && cohort_id) {
      axios
        .post(`/cohorts/${cohort_id}/enrollments.json`, {
          email: user?.email,
          coupon_code: user?.referrer,
          account_id: credit_account_id,
          source: ref_source
        })
        .then((res) => {
          res.data &&
            setUser({
              ...user,
              ...res.data.user
            });
          if (res.data.user.alumni_event) {
            setAlumniEvent(true);
          }
          setAccount(res.data.account);
          setLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Error in registration', { variant: 'error' });
        });
    }
  }, []);

  const selectStep = () => {
    if (activeStep === 2) {
      return (
        <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
          <CardDetails
            cohortID={cohort_id}
            first_name={user?.first_name}
            last_name={user?.last_name}
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
            <Typography variant="h3" align="center" paragraph data-testid="confirmation-message">
              {account
                ? `🎉 Thanks ${user.first_name} you’ll hear back from us shortly`
                : '🎉 You’ve completed your application!'}
            </Typography>
            <Typography
              align="center"
              sx={{ color: 'text.secondary' }}
              data-testid="confirmation-subtext"
            >
              {account
                ? `Sphere has an enterprise package deal with ${account}, we’re just checking whether your team qualifies!`
                : 'You will shortly recieve an email documenting your application outcome and next steps!'}
            </Typography>
          </Box>
          <Button
            href="https://www.getsphere.com/#upcoming-cohorts-slider"
            variant="contained"
            color="primary"
            data-testid="explore-btn"
          >
            Explore more Sphere cohorts
          </Button>
        </Stack>
      );
    }

    if (activeStep === 4) {
      return (
        <Stack
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph data-testid="remainingTime">
              🎉 You have 72 hours to lock in your price and seat!
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }} data-testid="email-message">
              Look for an email with your payment link in the next few hours; if you haven’t
              received any, make sure you check your spam folder.
            </Typography>
          </Box>
          <Button
            href="https://www.getsphere.com/pages/contact-us"
            variant="contained"
            color="primary"
            data-testid="contact-btn"
          >
            Any questions? Click here to contact Sphere
          </Button>
        </Stack>
      );
    }

    return (
      <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
        <UserForm
          cohortID={cohort_id}
          user={user}
          account={account}
          submitValues={(data: any) => updateUserData(data)}
        />
      </Stack>
    );
  };
  return (
    <RootStyle title="Sphere Cohort Registration">
      {loading ? (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      ) : (
        <>
          {alumniEvent ? (
            <AlumniRegistration />
          ) : (
            <Container maxWidth="lg">{selectStep()}</Container>
          )}
        </>
      )}
    </RootStyle>
  );
}
