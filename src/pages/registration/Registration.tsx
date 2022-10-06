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
import {
  ONBOARDING_EVENTS,
  REFERRAL_EVENTS,
  REGISTRATION_EVENTS,
  setSegmentUserProperties,
  trackOnboardingEvent,
  trackReferralEvent,
  trackRegistrationEvent
} from 'utils/amplitude';
import useAuth from 'hooks/useAuth';
import InvitePeersForm from './InvitePeersForm';
import UserForm from './UserForm';
import CardDetails from './CardDetails';
import Page from '../../components/Page';
import AlumniRegistration from './AlumniRegistration';
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
  full_name?: string;
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
  amplitude_events_timeline: any;
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

export const REGISTRATION_FLOW_COHORT_CODES = ['TML', 'ACI'];

const RONNY_COHORT_CODE = 'AAB';

export default function Registration() {
  const [activeStep, setActiveStep] = useState(1);
  const url = new URLSearchParams(useLocation().search);
  const cohort_id = url.get('cohort_id') || '';
  const credit_account_id = url.get('credit_account') || '';
  const ref_source = url.get('source') || '';
  const referrer_domain = url.get('referrer_domain') || '';
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useAuth();

  const [user, setUser] = useState<UserType>({
    email: url.get('email') || '',
    referrer: url.get('referrer') || '',
    acceptedTerms: false,
    alumni_event: false,
    wait_listed: false,
    pre_release: false,
    slug: '',
    full_name: ''
  });

  const [company, setCompany] = useState<CompanyType | null>();

  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [alumniEvent, setAlumniEvent] = useState(false);
  const [wait_listed, setWaitListed] = useState(false);
  const [pre_release, setPreRelease] = useState(false);
  const [confetti, setConfetti] = useState(200);
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const referrer_code = url.get('referrer') || '';
  const alumni = url.get('alumni') || false;

  const [cohort, setCohort] = useState<CohortType>({
    id: '',
    name: '',
    intake: '',
    intake_name: '',
    instructor: '',
    dates: '',
    price: '',
    code: '',
    amplitude_events_timeline: null
  });

  const trackReferralFlowEvents = (eventType: string, params?: any) => {
    const eventData = {
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
      [REGISTRATION_EVENTS.source]: url.get('source') || '',
      [REGISTRATION_EVENTS.price]: cohort.price
    };
    trackRegistrationEvent(cohort, eventType, eventData);
  };

  const triggerOnboardingEvent = () => {
    trackOnboardingEvent(cohort, ONBOARDING_EVENTS.event_type, {
      [ONBOARDING_EVENTS.event]: 'Registered',
      [ONBOARDING_EVENTS.category]: 'Registered',
      [ONBOARDING_EVENTS.description]: 'User has registered on portal.'
    });
  };

  const triggerReferralEvent = () => {
    trackReferralEvent(
      REFERRAL_EVENTS.event_type,
      {
        [REFERRAL_EVENTS.event]: 'Registered',
        [REFERRAL_EVENTS.category]: 'referral link',
        [REFERRAL_EVENTS.description]: 'Registered via referral link',
        [REFERRAL_EVENTS.referrer_code]: referrer_code
      },
      cohort
    );
  };

  const createCompleteEnrollment = async (email: string, values?: any) => {
    await axios
      .post(`/cohorts/${cohort_id}/enrollments.json`, {
        email,
        coupon_code: user?.referrer,
        account_id: credit_account_id,
        source: ref_source,
        referrer_domain
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

        REGISTRATION_FLOW_COHORT_CODES.includes(cohort?.code) &&
          values &&
          createEnrollment(values, res.data?.user);

        setAccount(res.data.account);
        setLoading(false);
        setTimeout(() => {
          setConfetti(0);
        }, 3000);
      })
      .catch((error) => {
        enqueueSnackbar(error.message || 'Error in registration', { variant: 'error' });
      });
  };

  const createEnrollment = async (values: any, user: UserType) => {
    values = values?.full_name
      ? {
          ...values,
          first_name: values.full_name.split(' ')?.[0] || '',
          last_name: values.full_name.split(' ')?.[1] || values.full_name.split(' ')?.[0]
        }
      : values;

    if (user.enrollment_id && cohort?.id) {
      try {
        await axios
          .post(`/cohorts/${cohort?.id}/enrollments/${user.enrollment_id}/update_profile.json`, {
            ...values
          })
          .then((res) => {
            const updatedUser = res.data.user;
            enqueueSnackbar('Application Submitted', { variant: 'success' });
            updateUserData({ ...user, ...values, slug: updatedUser?.slug });
            if (!isAuthenticated) {
              setSegmentUserProperties({
                id: updatedUser?.id,
                slug: updatedUser?.slug,
                email: updatedUser?.email,
                displayName: updatedUser?.full_name,
                type: updatedUser?.type,
                current_company: updatedUser?.company,
                current_industry_category_selections: updatedUser?.industry_category_selection
              });
            }
            trackReferralFlowEvents(
              'Cohort Registration - Personal Info Page - Details Submitted',
              {
                first_name: values.first_name,
                last_name: values.last_name,
                linkedin_url: values.linkedin_url
              }
            );
            triggerOnboardingEvent();
            if (alumni) {
              triggerReferralEvent();
            }
          });
      } catch (error) {
        enqueueSnackbar('Application Failed', { variant: 'error' });
        console.log(error);
      }
    } else {
      enqueueSnackbar('Invalid page URL', { variant: 'error' });
    }
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
    setActiveStep(activeStep - 1);
  };

  const selectStep = () => {
    if (account || wait_listed) {
      setActiveStep(4);
    } else {
      setActiveStep(3);
    }
  };

  const updateUserData = async (data: any) => {
    setUser({ ...data });
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
    if (cohort_id) {
      axios
        .get(`/cohorts/${cohort_id}`)
        .then((res) => {
          if (res?.data?.cohort) {
            setCohort(res.data?.cohort);
            if (REGISTRATION_FLOW_COHORT_CODES.includes(res.data?.cohort?.code)) {
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (
      user?.email &&
      cohort_id &&
      cohort?.code &&
      !REGISTRATION_FLOW_COHORT_CODES.includes(cohort?.code)
    ) {
      createCompleteEnrollment(user?.email);
    }
  }, [cohort]);

  useEffect(() => {
    if (!loading) {
      try {
        const data = new FormData();
        data.append('user_id', 'adriantesting');
        data.append('event_type', 'Backend Cohort Registration - Personal Info Page - Page Loaded');
        data.append(
          'event_properties',
          JSON.stringify({
            'Registrant Email': `${user?.email} frontend`
          })
        );
        axios.post(`/segments/trigger_segment_event.json`, data);
      } catch (error) {
        console.log('EVENT SYSTEM ERROR');
        console.error(error);
      }
      window.analytics?.user &&
        trackReferralFlowEvents('Cohort Registration - Personal Info Page - Page Loaded', {
          is_enterprise_customer: company?.is_enterprise_customer || false,
          has_sphere_alumni: company?.has_sphere_alumni || false
        });
    }
  }, [loading, window.analytics?.user]);

  const subHeading = () => {
    if (cohort?.code === RONNY_COHORT_CODE) {
      return 'You will recieve an email shortly documenting your next steps!';
    }

    if (pre_release || wait_listed) {
      return 'You will recieve an email shortly with more details on the course and how to secure your seat';
    }
    if (company && account) {
      return `We’ve sent your application to a ${company?.name} representative for review and will be in touch with next steps!`;
    }
    return 'You will shortly recieve an email documenting your application outcome and next steps!';
  };

  const lastStepMainHeading = () => {
    if (cohort?.code === RONNY_COHORT_CODE) {
      return '🎉 Congratulations, your seat is secured!';
    }

    if (wait_listed || pre_release) {
      return '🎉 Congratulations, you’ve joined the waitlist';
    }
    return '🎉 Congratulations, you’ve completed your application!';
  };

  const displayStep = () => {
    const { payLaterMessage } = setFormHeadings();

    if (activeStep === 2) {
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

    if (activeStep === 3) {
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

    if (activeStep === 4) {
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
              {lastStepMainHeading()}
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
        user={user}
        cohortCode={cohort.code}
        account={account}
        wait_listed={wait_listed}
        createEnrollment={(values: any) =>
          values?.full_name
            ? createCompleteEnrollment(values?.email, values)
            : createEnrollment(values, user)
        }
      />
    );
  };

  const registrationFlow = () => {
    if (alumniEvent) {
      return <AlumniRegistration />;
    }
    return (
      <Stack width="100%">
        {![4, 5, 6].includes(activeStep) && (
          <Header
            company={company}
            account={account}
            activeStep={activeStep}
            waitlist={wait_listed}
            preRelease={pre_release}
            userName={user?.first_name}
            cohort={cohort}
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
        {[2, 3].includes(activeStep) && (
          <StyledBackButton variant="outlined" onClick={() => previousStep()}>
            <KeyboardBackspace fontSize="large" />
          </StyledBackButton>
        )}
        {loading ? (
          <Box padding="200px">
            <LoadingScreen />
          </Box>
        ) : (
          <>{registrationFlow()}</>
        )}
      </RootStyle>
    </>
  );
}
