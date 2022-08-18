import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import Confetti from 'react-confetti';
import { useSnackbar } from 'notistack5';
import { Box, Stack, Button, Container, Typography, Avatar } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingButton } from '@material-ui/lab';
import { REGISTRATION_EVENTS, sendAmplitudeData } from 'utils/amplitude';
import InvitePeersForm from './InvitePeersForm';
import UserForm from './UserForm';
import CardDetails from './CardDetails';
import Page from '../../components/Page';
import AlumniRegistration from './AlumniRegistration';
import InviteChoice from './InviteChoice';
import RegistrationNavbar from './RegistrationNavbar';
import Header from './Header';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  position: 'relative'
}));

export type UserType = {
  first_name?: string;
  last_name?: string;
  linkedin_url?: string;
  email?: string;
  enrollment_id?: string;
  referrer?: string;
  acceptedTerms: boolean;
  alumni_event: boolean;
  wait_listed: boolean;
  pre_release: boolean;
  slug: string;
};

export type CohortType = {
  id: string;
  name: string;
  intake: string;
  intake_name: string;
  instructor: string;
  dates: string;
  price: string;
  code: string;
};

export type CompanyType = {
  name: string;
  image: string;
  no_of_enrollments: number;
  roles: string[];
  is_enterprise_customer: boolean;
  has_sphere_alumni: boolean;
};

const StyledBackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 110,
  left: 40,
  [theme.breakpoints.down('md')]: {
    top: 150,
    left: 10
  }
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  marginBottom: 0,
  borderRadius: '30px',
  height: '40px',
  width: '100%'
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: '24px',
  borderRadius: '30px',
  height: '40px',
  width: '100%'
}));

export default function Registration() {
  const [activeStep, setActiveStep] = useState(1);
  const url = new URLSearchParams(useLocation().search);
  const cohort_id = url.get('cohort_id') || '';
  const credit_account_id = url.get('credit_account') || '';
  const ref_source = url.get('source') || '';
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<UserType>({
    email: url.get('email') || '',
    referrer: url.get('referrer') || '',
    acceptedTerms: false,
    alumni_event: false,
    wait_listed: false,
    pre_release: false,
    slug: ''
  });

  const [company, setCompany] = useState<CompanyType | null>();

  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [alumniEvent, setAlumniEvent] = useState(false);
  const [wait_listed, setWaitListed] = useState(false);
  const [pre_release, setPreRelease] = useState(false);
  const [confetti, setConfetti] = useState(200);
  const [displayConfetti, setDisplayConfetti] = useState(true);

  const [cohort, setCohort] = useState<CohortType>({
    id: '',
    name: '',
    intake: '',
    intake_name: '',
    instructor: '',
    dates: '',
    price: '',
    code: ''
  });

  const trackReferralFlowEvents = (eventType: string, params?: any) => {
    sendAmplitudeData(eventType, {
      [REGISTRATION_EVENTS.company_is_enterprise_customer]:
        params?.is_enterprise_customer === undefined ? null : params?.is_enterprise_customer,
      [REGISTRATION_EVENTS.company_has_sphere_alumni]:
        params?.has_sphere_alumni === undefined ? null : params?.has_sphere_alumni,
      [REGISTRATION_EVENTS.first_name]: params?.first_name || null,
      [REGISTRATION_EVENTS.last_name]: params?.last_name || null,
      [REGISTRATION_EVENTS.linkedIn_url]: params?.linkedin_url || null,
      [REGISTRATION_EVENTS.referree_name]: params?.referree_name || null,
      [REGISTRATION_EVENTS.referree_email]: params?.referree_email || null,
      [REGISTRATION_EVENTS.amount_paid]: params?.amount_paid || null,
      [REGISTRATION_EVENTS.registrant_email]: user.email,
      [REGISTRATION_EVENTS.cohort_name]: cohort.name,
      [REGISTRATION_EVENTS.cohort_code]: cohort.code,
      [REGISTRATION_EVENTS.cohort_intake_number]: cohort.intake,
      [REGISTRATION_EVENTS.cohort_intake]: cohort.intake_name,
      [REGISTRATION_EVENTS.source]: url.get('source') || '',
      [REGISTRATION_EVENTS.price]: cohort.price
    });
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const previousStep = () => {
    if (activeStep === 4 || activeStep === 3) {
      setActiveStep(2);
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const selectStep = () => {
    if (account || wait_listed) {
      setActiveStep(5);
    } else {
      setActiveStep(4);
    }
  };

  const updateUserData = async (data: any) => {
    setUser({ ...user, ...data });
    setActiveStep(2);
  };

  const setFormHeadings = () => {
    let payLaterMessage =
      'If you choose to pay later, you will be emailed a payment link. You will have 72 hours to lock in your price and seat. If you are unable to complete the payment within 72 hours:';

    if (pre_release) {
      payLaterMessage =
        'If you choose to pay later, and are accepted into the cohort, you will be emailed a payment link. Note that as long as you have not processed your payment:';
    }

    return { payLaterMessage };
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
          if (res.data.company) {
            setCompany({
              ...res.data.company
            });
          }
          if (res.data.user.alumni_event) {
            setAlumniEvent(true);
          }
          if (res.data.user.wait_listed) {
            setWaitListed(true);
          }
          if (res.data.user.pre_release) {
            setPreRelease(true);
          }
          if (res.data.cohort) {
            setCohort(res.data.cohort);
          }
          setAccount(res.data.account);
          setLoading(false);
          setTimeout(() => {
            setConfetti(0);
          }, 3000);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Error in registration', { variant: 'error' });
        });
    }
  }, []);

  useEffect(() => {
    !loading &&
      trackReferralFlowEvents('Cohort Registration - Personal Info Page - Page Loaded', {
        is_enterprise_customer: company?.is_enterprise_customer || false,
        has_sphere_alumni: company?.has_sphere_alumni || false
      });
  }, [loading]);

  const subHeading = () => {
    if (pre_release || wait_listed) {
      return 'You will recieve an email shortly with more details on the course and how to secure your seat';
    }
    if (company && account) {
      return `We’ve sent your application to a ${company?.name} representative for review and will be in touch with next steps!`;
    }
    return 'You will shortly recieve an email documenting your application outcome and next steps!';
  };

  const displayStep = () => {
    const { payLaterMessage } = setFormHeadings();

    if (activeStep === 2) {
      return (
        <>
          <InviteChoice
            company={company}
            account={account}
            setStep={(step: number) => setActiveStep(step)}
            selectStep={() => selectStep()}
            trackReferralFlowEvents={trackReferralFlowEvents}
          />
        </>
      );
    }

    if (activeStep === 3) {
      return (
        <>
          <InvitePeersForm
            onContinue={() => selectStep()}
            enrollmentId={user?.enrollment_id || ''}
            cohort={cohort}
            referrer_code={user.slug}
            company={!!company}
            account={!!account}
            waitListed={wait_listed}
            preRelease={pre_release}
            trackReferralFlowEvents={trackReferralFlowEvents}
          />
        </>
      );
    }

    if (activeStep === 4) {
      return (
        <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
          <CardDetails
            cohort={cohort}
            first_name={user?.first_name}
            last_name={user?.last_name}
            enrollmentID={user?.enrollment_id}
            setStep={(step: number) => setActiveStep(step)}
            payLaterMessage={payLaterMessage}
            trackReferralFlowEvents={trackReferralFlowEvents}
          />
        </Stack>
      );
    }

    if (activeStep === 5) {
      trackReferralFlowEvents('Cohort Registration - Confirmation Page - Page Loaded');
      return (
        <Stack
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!!company && (
            <Box style={{ marginBottom: '24px' }}>
              <Avatar
                alt={company?.name}
                src={company?.image}
                sx={{ width: 95, height: 95, border: '1px solid #64748B' }}
              />
            </Box>
          )}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph data-testid="confirmation-message">
              {wait_listed || pre_release
                ? '🎉 Congratulations, you’ve joined the waitlist'
                : '🎉 Congratulations, you’ve completed your application!'}
            </Typography>
            <Typography
              align="center"
              sx={{ color: 'text.secondary' }}
              data-testid="confirmation-subtext"
            >
              {subHeading()}
            </Typography>
          </Box>
          <Button
            href="https://www.getsphere.com/#upcoming-cohorts-slider"
            onClick={() =>
              trackReferralFlowEvents(
                "Cohort Registration - Confirmation Page - 'Explore more cohorts' Selected"
              )
            }
            variant="contained"
            color="primary"
            data-testid="explore-btn"
            sx={{ borderRadius: '30px', height: '40px' }}
          >
            Explore more Sphere cohorts
          </Button>
        </Stack>
      );
    }

    return (
      <UserForm
        submitValues={(data: any) => updateUserData(data)}
        user={user}
        cohort={cohort}
        account={account}
        wait_listed={wait_listed}
        trackReferralFlowEvents={trackReferralFlowEvents}
      />
    );
  };

  const RegistrationFlow = () => {
    if (alumniEvent) {
      return <AlumniRegistration />;
    }
    return (
      <Stack width="100%">
        {![5, 6, 7].includes(activeStep) && (
          <Header
            company={company}
            account={account}
            activeStep={activeStep}
            waitlist={wait_listed}
            preRelease={pre_release}
            userName={user?.first_name}
          />
        )}
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
          {displayStep()}
        </Container>
      </Stack>
    );
  };

  return (
    <>
      <RootStyle title="Sphere Cohort Registration">
        {!alumniEvent && account && displayConfetti && (
          <Confetti
            width={windowSize?.innerWidth}
            height={windowSize?.innerHeight}
            numberOfPieces={confetti}
            onConfettiComplete={(confetti: any) => {
              setDisplayConfetti(false);
            }}
          />
        )}
        <RegistrationNavbar cohort={cohort} />
        {[2, 3, 4].includes(activeStep) && (
          <StyledBackButton variant="outlined" onClick={() => previousStep()}>
            <KeyboardBackspace fontSize="large" />
          </StyledBackButton>
        )}
        {loading ? (
          <Box padding="200px">
            <LoadingScreen />
          </Box>
        ) : (
          <RegistrationFlow />
        )}
      </RootStyle>
    </>
  );
}
