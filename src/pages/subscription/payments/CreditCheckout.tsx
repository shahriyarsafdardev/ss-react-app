import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Stack, Box, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import moment from 'moment';
import StripePayment from '../teams/StripePayment';
import {
  LoadingContainer,
  Logo,
  PaymentRootStyle,
  StyledDetailsStack,
  StyledLoadingButton,
  StyledTypography,
  useStyles
} from '../teams/Common';
import PaymentDetails from '../teams/PaymentDetails';
import { TeamMember } from '../teams/InviteMembersForm';
import { Registration } from '../teams/TeamRegistration';
import PaymentPrompt from './PaymentPrompt';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export type CheckoutDetails = {
  team_name: string;
  team_discount: number;
  lead_user_email: string;
  next_billing_date: string;
};

export default function CreditCheckout() {
  const url = new URLSearchParams(useLocation().search);
  const teamID = url.get('team_id') || '';
  const amount = url.get('credit_amount') || '';
  const creditAmount = amount !== '' ? parseInt(amount, 10) : 0;
  const email = url.get('email') || '';
  const cohortID = url.get('cohort_id') || '';
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState('');
  const [stripeCustomerID, setStripeCustomerID] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [accountID, setAccountID] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    team_name: '',
    team_discount: 0,
    lead_user_email: '',
    next_billing_date: ''
  });
  const [registration, setRegistration] = useState<Registration>({
    cohort_id: '',
    cohort_name: '',
    cohort_price: 0,
    cohort_host_name: '',
    lead_user_name: ''
  });

  const getCheckoutDetails = async () => {
    await axios
      .get(`team_registrations/get_checkout_details.json`, {
        params: {
          team_id: teamID,
          email,
          cohort_id: cohortID,
          amount: creditAmount
        }
      })
      .then((res) => {
        setAccountID(res.data.account_id);
        setTeamMembers(res.data.teamMembers);
        setCheckoutDetails({
          team_name: res.data.team_name,
          team_discount: res.data.team_discount,
          lead_user_email: res.data.lead_user_email,
          next_billing_date: res.data.next_billing_date
        });
        setClientSecret(res.data.payment_intent.clientSecret);
        setStripeCustomerID(res.data.payment_intent.customer_id);
        setSubscriptionAmount(res.data.subscription_amount);
        if (email !== '' && cohortID !== '') {
          getRegistrationDetails(res.data.team_name);
        }
      });
  };

  const getRegistrationDetails = async (teamName: string) => {
    axios
      .get(`team_registrations/get_registration_details.json`, {
        params: { email, cohort_id: cohortID, team_name: teamName }
      })
      .then((res) => {
        setRegistration(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', {
          variant: 'error'
        });
      });
  };

  const handleTopUp = async () => {
    axios
      .post(`credit_subscriptions/${accountID}/add_credit.json`, {
        team_id: teamID,
        amount: creditAmount
      })
      .then((res) => {
        enqueueSnackbar('Package updated successfully!', {
          variant: 'success'
        });
        setPaymentCompleted(true);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    if (teamID !== '' && (creditAmount !== 0 || (cohortID !== '' && email !== ''))) {
      getCheckoutDetails();
      setLoading(false);
    }
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
        <PaymentPrompt />
      </>
    );
  }

  if (email === '' && subscriptionAmount > 0) {
    return (
      <>
        <Stack className={classes.topUpContainer}>
          <Box className={classes.topUp}>
            <StyledDetailsStack spacing={4} sx={{ alignItems: 'center' }}>
              <StyledTypography variant="h4">Top Up Your Team Package</StyledTypography>
              <StyledTypography>Your top up amount is:</StyledTypography>
              <Stack alignItems="center">
                <Typography variant="h4">{`$${creditAmount} USD`}</Typography>
                <StyledTypography>Due today</StyledTypography>
              </Stack>
              <StyledTypography>
                Your total package of ${creditAmount + subscriptionAmount} per year will be billed
                next on{' '}
                {moment(new Date(checkoutDetails?.next_billing_date)).format('ll').toString()}
              </StyledTypography>
              <StyledLoadingButton
                variant="contained"
                className={classes.topUpButton}
                onClick={handleTopUp}
              >
                Top Up
              </StyledLoadingButton>
            </StyledDetailsStack>
          </Box>
        </Stack>
      </>
    );
  }

  return (
    <PaymentRootStyle title="Sphere Cohort Payment">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', height: '100%' }}>
        <PaymentDetails
          amount={creditAmount}
          isSinglePayee={!email && !cohortID}
          teamDiscount={checkoutDetails?.team_discount}
          registration={registration}
        />
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
                    colorTextPlaceholder: '#475569',
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
              <StripePayment
                team={checkoutDetails.team_name}
                teamMembers={teamMembers}
                email={email || checkoutDetails.lead_user_email}
                registration={registration}
                stripeCustomerID={stripeCustomerID}
                setPaymentCompleted={setPaymentCompleted}
                shouldDisplayBackButton={false}
                isSinglePayee={!email && !cohortID}
                teamDiscount={checkoutDetails?.team_discount}
              />
            </Elements>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
