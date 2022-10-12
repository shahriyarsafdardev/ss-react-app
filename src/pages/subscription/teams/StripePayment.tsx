import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'utils/axios';
import PaymentOptions from 'components/subscription/teams/PaymentOptions';
import PaymentDivider from 'components/subscription/teams/PaymentDivider';
import PaymentForm from 'components/subscription/teams/PaymentForm';
import { Button } from '@material-ui/core';
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

  const handleSubmit = async (event: any) => {
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
          setStep();
        });
    }
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
      <Button
        fullWidth
        sx={{ mt: 4 }}
        onClick={(e: any) => handleSubmit(e)}
        type="submit"
        variant="contained"
        size="large"
      >
        Submit
      </Button>
      {/* <PaymentForm handleSubmit={handleSubmit} setStep={setStep} /> */}
    </>
  );
}
