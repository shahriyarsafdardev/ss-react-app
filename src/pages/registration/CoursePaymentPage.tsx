import { Stack, Box, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosV2 from 'utils/axiosV2';
import { setSegmentUserProperties } from 'utils/eventTracking';
import { LoadingContainer, BannerLogo, useStyles, SaleBanner } from './Common';
import PayLaterForm from './PayLaterForm';

export default function CoursePaymentPage() {
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState('');
  const [customerID, setCustomerID] = useState('');
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const enrollmentID = url.get('enrollment_id') || '';
  const [cohort, setCohort] = useState<any>();
  const [registrantEmail, setRegistrantEmail] = useState('');

  useEffect(() => {
    setLoading(true);
    if (enrollmentID && cohortID) {
      axiosV2
        .get(`enrollments/${enrollmentID}/details.json`)
        .then((res) => {
          setCohort({ ...res?.data?.cohort });
          setRegistrantEmail(res?.data?.registrant_email);
          setLoading(false);
          setSegmentUserProperties(res?.data?.user);
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
            is_membership: false,
            amount: cohort?.price,
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
    <Page height="100vh" width="100%" title="Sphere Payment">
      <SaleBanner />
      <BannerLogo
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png"
        alt="logo"
      />
      <Stack direction={{ xs: 'column', md: 'row' }} className={classes.paymentStack}>
        <Stack
          className={`${classes.paymentData} ${classes.purpleBackground}`}
          paddingTop={`${!isDesktop && '60px !important'}`}
          paddingBottom={`${!isDesktop && '40px !important'}`}
        >
          <Stack spacing={3}>
            <Typography variant="h4" className={`${classes.heading} ${classes.whiteFont}`}>
              Pay now to secure your seat
            </Typography>
            <Typography className={classes.whiteFont}>
              We provide an invoice for expense purposes. You can get a full refund up to 72 hours
              before the date of the first session
            </Typography>
            <Stack
              spacing={1}
              sx={{
                border: '1px solid #fff',
                borderRadius: '16px',
                padding: '17px 22px',
                margin: '0px',
                width: '100%',
                marginTop: '60px !important'
              }}
            >
              <Typography className={classes.whiteFont}>
                <b>Course:</b> {cohort?.name}
              </Typography>
              <Typography className={classes.whiteFont}>
                <b>Instructor:</b> {cohort?.host_full_names}
              </Typography>
              <Typography className={classes.whiteFont}>
                <b>Dates:</b> {cohort?.dates}
              </Typography>
              <Typography className={classes.whiteFont}>
                <b>Price:</b> ${Math.floor(cohort?.price)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent="center" alignItems="center" className={classes.paymentData}>
          <Box className={classes.fullWidthCenter} width="100% !important">
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
              <PayLaterForm
                cohortID={cohortID}
                enrollmentID={enrollmentID}
                customerID={customerID}
                cohort={cohort}
              />
            </Elements>
          </Box>
        </Stack>
      </Stack>
    </Page>
  );
}
