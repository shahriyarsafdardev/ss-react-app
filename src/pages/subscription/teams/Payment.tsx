import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Stack, Grid, Box } from '@material-ui/core';
import StripePayment from './StripePayment';
import { LoadingContainer, PaymentRootStyle, useStyles } from './Common';
import { TeamMember } from './InviteMembersForm';
import PaymentDetails from './PaymentDetails';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export default function StripePaymentForm({
  team,
  teamMembers,
  email,
  clientSecret,
  amount,
  setStep,
  isSinglePayee
}: {
  team: string;
  teamMembers: TeamMember[];
  email: string;
  clientSecret: string;
  amount: number;
  setStep: Function;
  isSinglePayee: boolean;
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
        <PaymentDetails amount={amount} isSinglePayee={isSinglePayee} />
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
