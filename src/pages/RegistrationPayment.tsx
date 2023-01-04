import { memo } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Grid } from '@material-ui/core';
import RegistrationPaymentForm from './RegistrationPaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

function RegistrationPayment({
  clientSecret,
  cohortCode,
  payLaterMessage,
  setStep,
  handleSubmit,
  trackRegistrationEvent,
  userFullName
}: {
  clientSecret: string;
  cohortCode: string;
  payLaterMessage: string;
  setStep: Function;
  handleSubmit: Function;
  trackRegistrationEvent: Function;
  userFullName: string;
}) {
  if (clientSecret === '') {
    return <></>;
  }

  return (
    <Grid container style={{ display: 'unset' }}>
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
        <RegistrationPaymentForm
          clientSecret={clientSecret}
          cohortCode={cohortCode}
          payLaterMessage={payLaterMessage}
          setStep={setStep}
          submitForm={handleSubmit}
          trackRegistrationEvent={trackRegistrationEvent}
          userFullName={userFullName}
        />
      </Elements>
    </Grid>
  );
}

export default memo(RegistrationPayment);
