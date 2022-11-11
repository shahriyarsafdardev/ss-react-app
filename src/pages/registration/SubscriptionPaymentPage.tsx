import { Stack, Box, Typography, useTheme, useMediaQuery, Button } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Page from 'components/Page';
import { useEffect, useState } from 'react';
import minusFill from '@iconify/icons-eva/minus-outline';
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import { useLocation, useNavigate } from 'react-router';
import axiosV2 from 'utils/axiosV2';
import { useSnackbar } from 'notistack5';
import LoadingScreen from 'components/LoadingScreen';
import { InputAmount, LoadingContainer, Logo, useStyles } from './Common';
import PayNowForm from './PayNowForm';

export default function SubscriptionPaymentPage() {
  const classes = useStyles();
  const [customerID, setCustomerID] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [amount, setAmount] = useState(0);
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const enrollmentID = url.get('enrollment_id') || '';
  const { enqueueSnackbar } = useSnackbar();
  const [cohort, setCohort] = useState<any>({});
  const [registrantEmail, setRegistrantEmail] = useState('');

  useEffect(() => {
    if (enrollmentID && cohortID) {
      axiosV2
        .get(`enrollments/${enrollmentID}/details.json`)
        .then((res) => {
          setCohort({ ...res?.data?.cohort });
          setRegistrantEmail(res?.data?.registrant_email);
          setAmount(Math.floor(res?.data?.cohort?.price * 0.95));
          setLoading(false);
        })
        .catch((err) => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (registrantEmail) {
      axiosV2
        .get('payments/intent.json', {
          params: {
            is_membership: true,
            amount,
            email: registrantEmail
          }
        })
        .then((res) => {
          setClientSecret(res?.data?.clientSecret);
          setCustomerID(res?.data?.customerID);
          setLoading(false);
        })
        .catch((err) => {
          enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
        });
    }
  }, [registrantEmail]);

  if (loading || !clientSecret || !customerID || !enrollmentID || !cohortID) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page height="100vh" width="100%" title="Sphere Membership">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', height: '100%' }}>
        <Stack
          className={`${classes.paymentData} ${classes.purpleBackground}`}
          paddingTop={`${!isDesktop && '60px !important'}`}
        >
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h4" className={`${classes.heading} ${classes.whiteFont}`}>
              Your Sphere Membership
            </Typography>
            <Stack alignItems="center" sx={{ marginBottom: '30px' }} spacing={1}>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Button
                  className={classes.counterButton}
                  onClick={() => setAmount(amount - 100)}
                  disabled={amount <= Math.floor(cohort?.price * 0.95)}
                >
                  <Icon icon={minusFill} style={{ width: '100%', height: '100%' }} />
                </Button>
                <InputAmount
                  amount={amount}
                  onChange={(amount: number) => setAmount(Number(amount))}
                  minValue={Math.floor(cohort?.price * 0.95)}
                />
                <Button className={classes.counterButton} onClick={() => setAmount(amount + 100)}>
                  <Icon icon={plusFill} style={{ width: '100%', height: '100%' }} />
                </Button>
              </Stack>
              <Typography className={classes.whiteFont}>which will recur annually</Typography>
            </Stack>
          </Stack>
          <Box sx={{ mt: 4, maxWidth: '650px' }}>
            <Stack spacing={3} margin={{ xs: '20px', md: '60px 20px' }}>
              <Typography className={classes.whiteFont}>
                Every year, you will be able to enroll in ${amount} worth of Sphere courses with a
                5% discount. You can update or cancel your subscription at any time.
              </Typography>
              <Typography style={{ fontWeight: 'bold' }} className={classes.whiteFont}>
                The 5% discount starts immediately and will be applied to your enrollment in{' '}
                {cohort?.name}. You will also receive access to our alumni events and community.
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack justifyContent="center" alignItems="center" className={classes.paymentData}>
          <Box className={classes.fullWidthCenter}>
            <Elements
              key={clientSecret}
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#475569',
                    colorBackground: '#ffffff',
                    colorText: '#475569',
                    borderRadius: '8px',
                    fontFamily: 'Public Sans,sans-serif',
                    fontSizeBase: '1rem',
                    colorTextPlaceholder: '#D3D3D3',
                    spacingTab: '8px',
                    spacingGridRow: '20px'
                  },
                  rules: {
                    '.Input:focus': {
                      boxShadow: 'none',
                      border: '1px solid #475569'
                    }
                  }
                }
              }}
            >
              <PayNowForm
                cohortID={cohortID}
                enrollmentID={enrollmentID}
                customerID={customerID}
                amount={amount}
              />
            </Elements>
          </Box>
        </Stack>
      </Stack>
    </Page>
  );
}
