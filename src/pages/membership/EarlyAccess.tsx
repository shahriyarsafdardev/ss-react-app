import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useSnackbar } from 'notistack5';
import { useLocation } from 'react-router-dom';
import { Stack, Box, useTheme, useMediaQuery } from '@material-ui/core';
import axiosV2 from 'utils/axiosV2';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

import { useStyles, Logo, LoadingContainer, MembershipDetails, MembershipSurvey } from './Common';

export default function EarlyAccess() {
  const url = new URLSearchParams(useLocation().search);
  const [clientSecret, setClientSecret] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [membershipID, setMemberShipID] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const course_code = url.get('course_code') || '';
  const email = url.get('email') || '';
  const [course, setCourse] = useState<any>(null);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');
  const [interests, setInterests] = useState<string[]>([]);
  const [isMember, setIsMember] = useState<boolean>(false);

  useEffect(() => {
    if (course_code && email) {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        enqueueSnackbar('Invalid Email Address', { variant: 'error' });
      } else {
        axiosV2
          .get(`memberships/details.json?email=${email}&course_code=${course_code}`)
          .then((res) => {
            setInterests(res.data?.most_excited_for);
            setMemberShipID(res.data?.membership_id);
            setIsMember(res.data?.is_member);
            setCourse({ ...res?.data?.course });
            setClientSecret(res?.data?.client_secret);
            setCustomerID(res?.data?.customer_id);
            setLoading(false);
          })
          .catch((err) => {
            enqueueSnackbar(err.message, { variant: 'error' });
          });
      }
    }
  }, []);

  if (loading || !email || !course || !course_code) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page sx={{ minHeight: '100vh', overflow: 'auto' }} width="100%" title="Sphere | Membership">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      {isMember && membershipID && course ? (
        <Stack
          className={`${classes.paymentData} ${classes.purpleBackground}`}
          paddingTop={`${!isDesktop && '60px !important'}`}
          paddingBottom={`${!isDesktop && '40px !important'}`}
          spacing={3}
        >
          <MembershipSurvey membershipID={membershipID} course={course} interests={interests} />
        </Stack>
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', height: '100%' }}>
          <Stack
            className={`${classes.paymentData} ${classes.purpleBackground}`}
            paddingTop={`${!isDesktop && '60px !important'}`}
            paddingBottom={`${!isDesktop && '40px !important'}`}
            spacing={5}
          >
            <MembershipDetails course={course} />
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
                <PaymentForm
                  setIsMember={setIsMember}
                  setMemberShipID={setMemberShipID}
                  courseID={course?.id}
                  email={email}
                  customerID={customerID}
                />
              </Elements>
            </Box>
          </Stack>
        </Stack>
      )}
    </Page>
  );
}
