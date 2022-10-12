import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LoadingButton } from '@material-ui/lab';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: any) => {
    setSubmitting(true);
    event.preventDefault();

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
