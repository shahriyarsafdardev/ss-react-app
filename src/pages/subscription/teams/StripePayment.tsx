import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'utils/axios';
import PaymentOptions from 'components/subscription/teams/PaymentOptions';
import PaymentDivider from 'components/subscription/teams/PaymentDivider';
import PaymentForm from 'components/subscription/teams/PaymentForm';
import { Button, Stack } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import { TeamMember } from './InviteMembersForm';
import { StyledLoadingButton } from './Common';

export default function CheckoutForm({
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
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: any) => {
    setIsSubmitting(true);
    event.preventDefault();
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('team', team);
    uploadData.append('team_members', JSON.stringify(teamMembers));

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
      await axios
        .post(`team_registrations/team_members_registration.json`, uploadData)
        .then((res) => {
          enqueueSnackbar('Payment made successfully!', { variant: 'success' });
          setStep();
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
      {/* <PaymentOptions />
      <PaymentDivider /> */}
      <Stack spacing={2}>
        <StyledLoadingButton
          fullWidth
          sx={{ mt: 4 }}
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
          onClick={() => setStep(true)}
          variant="outlined"
          size="large"
        >
          Back
        </StyledLoadingButton>
      </Stack>
      {/* <PaymentForm handleSubmit={handleSubmit} setStep={setStep} /> */}
    </>
  );
}
