import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Stack, Grid, Typography } from '@material-ui/core';
import StripePayment from './StripePayment';
import { HeadingStyle, InfoStyle, LoadingContainer, PaymentRootStyle } from './Common';
import { TeamMember } from './InviteMembersForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export default function StripePaymentForm({
  team,
  teamMembers,
  email,
  clientSecret,
  setStep
}: {
  team: string;
  teamMembers: TeamMember[];
  email: string;
  clientSecret: string;
  setStep: Function;
}) {
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
        <Stack sx={{ padding: 15, backgroundColor: '#fffffa' }} width={{ md: '50%', sm: '100%' }}>
          <HeadingStyle variant="h3">Your Team Package</HeadingStyle>
          <InfoStyle>Based on the number of people you’ve invited, your team package is:</InfoStyle>
          <Stack direction="row" alignItems="center">
            <InfoStyle variant="h4">$7,000 USD = 7,000 credits</InfoStyle>&nbsp;
            <InfoStyle variant="h6">which will recur annually</InfoStyle>
          </Stack>
          <InfoStyle> Sphere credits provide: </InfoStyle>
          <ul style={{ marginLeft: '20px' }}>
            <li>
              <Typography>
                A 15% discount on the price of all course in our library (our discounts are
                volume-based)
              </Typography>
            </li>
            <li>
              <Typography>Immunity to price increases</Typography>
            </li>
            <li>
              <Typography>
                Ongoing access to the Sphere portal (including all recordings and resources)
              </Typography>
            </li>
            <li>
              <Typography>Access to Sphere alumni events</Typography>
            </li>
          </ul>
          <InfoStyle>You can top up or cancel your subscription at any time.</InfoStyle>
        </Stack>

        <Stack sx={{ p: 15, backgroundColor: '#E2E8F0' }} width={{ md: '50%', sm: '100%' }}>
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
        </Stack>
      </Grid>
    </PaymentRootStyle>
  );
}
