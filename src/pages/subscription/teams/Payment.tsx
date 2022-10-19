import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Stack, Grid, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import StripePayment from './StripePayment';
import { LoadingContainer, PaymentRootStyle, useStyles } from './Common';
import { TeamMember } from './InviteMembersForm';
import PaymentDetails from './PaymentDetails';
import { Registration } from './TeamRegistration';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export default function Payment({
  team,
  teamMembers,
  email,
  amount,
  setAmount,
  setStep,
  isSinglePayee,
  cohortID,
  registration,
  setCredentials,
  teamDiscount
}: {
  team: string;
  teamMembers: TeamMember[];
  email: string;
  amount: number;
  setAmount: Function;
  setStep: Function;
  isSinglePayee: boolean;
  cohortID: string;
  registration: Registration;
  setCredentials: Function;
  teamDiscount: number;
}) {
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState('');
  const [stripeCustomerID, setStripeCustomerID] = useState('');

  const getPaymentIntent = async () => {
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('team', team);
    uploadData.append('team_members', JSON.stringify(teamMembers));
    uploadData.append('cohort_id', cohortID);
    await axios.post(`team_registrations/payment_intent.json`, uploadData).then((res) => {
      setClientSecret(res.data.clientSecret);
      setAmount(res.data.total_amount);
      setStripeCustomerID(res.data.customer_id);
    });
  };

  useEffect(() => {
    getPaymentIntent();
  }, []);

  if (clientSecret === '') {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <PaymentRootStyle title="Sphere Cohort Payment">
      <Grid container>
        <PaymentDetails
          amount={amount}
          isSinglePayee={isSinglePayee}
          teamDiscount={teamDiscount}
          registration={registration}
        />
        <Stack width={{ md: '50%', sm: '100%' }} className={classes.paymentForm}>
          <Box className={classes.fullWidthCenter}>
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
                setStep={setStep}
                registration={registration}
                setCredentials={setCredentials}
                stripeCustomerID={stripeCustomerID}
              />
            </Elements>
          </Box>
        </Stack>
      </Grid>
    </PaymentRootStyle>
  );
}
