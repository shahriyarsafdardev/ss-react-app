import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Stack, Grid, Typography, Box } from '@material-ui/core';
import StripePayment from './StripePayment';
import { HeadingStyle, InfoStyle, LoadingContainer, PaymentRootStyle, useStyles } from './Common';
import { TeamMember } from './InviteMembersForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export default function StripePaymentForm({
  team,
  teamMembers,
  email,
  clientSecret,
  amount,
  setStep
}: {
  team: string;
  teamMembers: TeamMember[];
  email: string;
  clientSecret: string;
  amount: number;
  setStep: Function;
}) {
  const classes = useStyles();
  if (!clientSecret) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <PaymentRootStyle title="Sphere Cohort Payment">
      <Grid container>
        <Stack
          width={{ md: '50%', sm: '100%' }}
          sx={{ maxWidth: '600px', marginLeft: 'auto' }}
          className={classes.paymentInfo}
        >
          <Box sx={{ maxWidth: '600px', marginLeft: 'auto' }}>
            <HeadingStyle
              variant="h3"
              className={(classes.font26, classes.colorGrey, classes.fontBolder)}
            >
              Your Team Package
            </HeadingStyle>
            <InfoStyle className={(classes.font18, classes.colorGrey)}>
              Based on the number of people you’ve invited, your team package is:
            </InfoStyle>
            <Stack direction="row" alignItems="center">
              <InfoStyle className={(classes.colorGrey, classes.fontBold)}>
                <span className={classes.font26}>{`$${amount} USD = ${amount} credits`}</span>{' '}
                <span className={classes.font20}>which will recur annually</span>
              </InfoStyle>
            </Stack>
            <InfoStyle className={(classes.font18, classes.colorGrey)}>
              {' '}
              Sphere credits provide:{' '}
            </InfoStyle>
            <ul style={{ marginLeft: '20px' }}>
              <li>
                <Typography className={(classes.font18, classes.colorGrey)}>
                  A 15% discount on the price of all course in our library (our discounts are
                  volume-based)
                </Typography>
              </li>
              <li>
                <Typography className={(classes.font18, classes.colorGrey)}>
                  Immunity to price increases
                </Typography>
              </li>
              <li>
                <Typography className={(classes.font18, classes.colorGrey)}>
                  Ongoing access to the Sphere portal (including all recordings and resources)
                </Typography>
              </li>
              <li>
                <Typography className={(classes.font18, classes.colorGrey)}>
                  Access to Sphere alumni events
                </Typography>
              </li>
            </ul>
            <InfoStyle className={(classes.font18, classes.colorGrey)}>
              You can top up or cancel your subscription at any time.
            </InfoStyle>
          </Box>
        </Stack>

        <Stack width={{ md: '50%', sm: '100%' }} className={classes.paymentForm}>
          <Box sx={{ maxWidth: '600px', marginRight: 'auto' }}>
            <Elements
              key={clientSecret}
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'flat',
                  labels: 'floating'
                }
              }}
            >
              <StripePayment
                team={team}
                teamMembers={teamMembers}
                email={email}
                clientSecret={clientSecret}
                setStep={setStep}
              />
            </Elements>
          </Box>
        </Stack>
      </Grid>
    </PaymentRootStyle>
  );
}
