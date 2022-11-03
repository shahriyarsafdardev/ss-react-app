import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Stack, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import { LoadingContainer, Logo, PaymentRootStyle, useStyles } from '../Common';
import InviteDetails from './InviteDetails';
import InviteForm from './InviteForm';
import SuccessPage from './SuccessPage';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export type InvitationDetails = {
  cohort_name: string;
  cohort_host_name: string;
  lead_user_name: string;
  team_company_name: string;
  team_discount: number;
};

export default function InvitePage() {
  const url = new URLSearchParams(useLocation().search);
  const teamID = url.get('team_id') || '';
  const amount = url.get('amount') || '';
  const creditAmount = amount !== '' ? parseInt(amount, 10) : 0;
  const cohortID = url.get('cohort_id') || '';
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState('');
  const [stripeCustomerID, setStripeCustomerID] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [subscriptionExist, setSubscriptionExist] = useState(false);
  const [invitationDetails, setInvitationDetails] = useState<InvitationDetails>({
    cohort_name: '',
    cohort_host_name: '',
    lead_user_name: '',
    team_company_name: '',
    team_discount: 0
  });

  const getInvitationDetails = async () => {
    setLoading(true);
    await axios
      .get(`subscriptions/teams/${teamID}/invite.json`, {
        params: {
          cohort_id: cohortID,
          subscription_amount: creditAmount
        }
      })
      .then((res) => {
        setClientSecret(res.data.payment_intent.clientSecret);
        setStripeCustomerID(res.data.payment_intent.customer_id);
        setInvitationDetails(res.data.invitation_details);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
      });
  };

  useEffect(() => {
    getInvitationDetails();
  }, []);

  if (clientSecret === '' || loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  if (paymentCompleted) {
    return (
      <>
        <SuccessPage subscriptionExist={subscriptionExist} />
      </>
    );
  }

  return (
    <PaymentRootStyle title="Sphere Cohort Payment">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', height: '100%' }}>
        <InviteDetails amount={creditAmount} details={invitationDetails} />
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
              <InviteForm
                teamID={teamID}
                cohortID={cohortID}
                creditAmount={`${creditAmount}`}
                stripeCustomerID={stripeCustomerID}
                setPaymentCompleted={setPaymentCompleted}
                setSubscriptionExist={setSubscriptionExist}
                invitationDetails={invitationDetails}
              />
            </Elements>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
