import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import { TeamMember } from './InviteMembersForm';

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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: any) => {
    setSubmitting(true);
    event.preventDefault();
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('team', team);
    uploadData.append('team_members', JSON.stringify(teamMembers));
    await axios
      .post(`team_registrations/team_members_registration .json`, uploadData)
      .then((res) => {
        setStep();
        console.log(res);
      });

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
    setSubmitting(false);
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
      <LoadingButton
        fullWidth
        sx={{ mt: 4 }}
        onClick={(e: any) => handleSubmit(e)}
        type="submit"
        variant="contained"
        size="large"
        loading={submitting}
      >
        Submit
      </LoadingButton>
    </>
  );
}
