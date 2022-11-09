import { Stack, Box, Typography, useTheme, useMediaQuery, Button } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Page from 'components/Page';
import { useState } from 'react';
import { Logo, useStyles } from './Common';
import SubscriptionPaymentForm from './SubscriptionPaymentForm';

export default function CoursePaymentPage() {
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState(
    'pi_3M2IwjCZlN68pp1b1WdwNopZ_secret_6ie7NlwIk3Z2QKbUZyAmeDaW4'
  );
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Page height="100vh" width="100%" title="Sphere Payment">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', height: '100%' }}>
        <Stack
          className={`${classes.paymentData} ${classes.purpleBackground}`}
          paddingTop={`${!isDesktop && '60px !important'}`}
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
                <b>Course:</b> Accelerating Innovation with A/B Testing
              </Typography>
              <Typography className={classes.whiteFont}>
                <b>Instructor:</b> Ronny Kohavi
              </Typography>
              <Typography className={classes.whiteFont}>
                <b>Dates:</b> Aug 1, 3, 25, 27
              </Typography>
              <Typography className={classes.whiteFont}>
                <b>Price:</b> $700
              </Typography>
            </Stack>
          </Stack>
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
              <SubscriptionPaymentForm paymentType="course payment" />
            </Elements>
          </Box>
        </Stack>
      </Stack>
    </Page>
  );
}
