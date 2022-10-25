import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'utils/axios';
import { Stack } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TeamMember } from './InviteMembersForm';
import { StyledLoadingButton } from './Common';
import { Registration } from './TeamRegistration';

export default function StripePayment({
  team,
  teamMembers,
  email,
  setStep,
  setCredentials,
  stripeCustomerID,
  setPaymentCompleted,
  registration
}: {
  team: string;
  teamMembers: TeamMember[];
  email: string;
  setStep?: Function;
  setCredentials?: Function;
  stripeCustomerID: string;
  setPaymentCompleted?: Function;
  registration?: Registration;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const teamID = url.get('team_id') || '';
  const creditAmount = url.get('credit_amount') || '';
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: any) => {
    let url = '';
    setIsSubmitting(true);
    event.preventDefault();
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('team', team);
    if (teamID === '') {
      uploadData.append('team_members', JSON.stringify(teamMembers));
      url = 'team_registrations/team_members_registration.json';
    } else if (registration?.cohort_id !== '') {
      uploadData.append('cohort_id', registration?.cohort_id || '');
      url = 'team_registrations/member_payment.json';
    } else if (teamID !== '' && creditAmount !== '') {
      uploadData.append('team_id', teamID);
      uploadData.append('amount', creditAmount);
      url = 'team_registrations/team_subscription.json';
    }

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: ''
      },
      redirect: 'if_required'
    });

    if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      uploadData.append('stripe_customer_id', stripeCustomerID);
      uploadData.append('payment_method', String(result.paymentIntent?.payment_method));
      await axios
        .post(url, uploadData)
        .then((res) => {
          enqueueSnackbar('Payment made successfully!', { variant: 'success' });
          setPaymentCompleted && setPaymentCompleted(true);
          setCredentials && setCredentials(res.data.login_credentials);
          setStep && setStep();
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    } else {
      enqueueSnackbar('Some error occurred!', { variant: 'error' });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <PaymentElement
        options={{
          wallets: {
            applePay: 'auto',
            googlePay: 'auto'
          }
        }}
      />
      <Stack spacing={2}>
        <StyledLoadingButton
          fullWidth
          onClick={(e: any) => handleSubmit(e)}
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          Subscribe
        </StyledLoadingButton>
        <StyledLoadingButton
          fullWidth
          onClick={() => setStep && setStep(true)}
          variant="outlined"
          size="large"
        >
          Back
        </StyledLoadingButton>
      </Stack>
    </>
  );
}
