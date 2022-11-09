import { Stack, Box, Typography, useTheme, useMediaQuery, Button } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Page from 'components/Page';
import { useState } from 'react';
import minusFill from '@iconify/icons-eva/minus-outline';
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import { InputAmount, Logo, useStyles } from './Common';
import SubscriptionPaymentForm from './SubscriptionPaymentForm';

export default function SubscriptionPaymentPage() {
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState(
    'pi_3M2IwjCZlN68pp1b1WdwNopZ_secret_6ie7NlwIk3Z2QKbUZyAmeDaW4'
  );
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [amount, setAmount] = useState(0);

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
                  disabled={amount <= 0}
                >
                  <Icon icon={minusFill} style={{ width: '100%', height: '100%' }} />
                </Button>
                <InputAmount
                  amount={amount}
                  onChange={(amount: number) => setAmount(Number(amount))}
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
                Every year, you will be able to enroll in $y worth of Sphere courses with a x%
                discount. You can update or cancel your subscription at any time.
              </Typography>
              <Typography style={{ fontWeight: 'bold' }} className={classes.whiteFont}>
                The x% discount starts immediately and will be applied to your enrollment in
                Accelerating Innovation with A/B Testing. You will also receive access to our alumni
                events and community.
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
              <SubscriptionPaymentForm />
            </Elements>
          </Box>
        </Stack>
      </Stack>
    </Page>
  );
}
