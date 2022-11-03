import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingScreen from 'components/LoadingScreen';
import { Grid } from '@material-ui/core';
import { LoadingContainer } from './admin/Common';
import StripeCreditsForm from './StripeCreditsForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || '');

export default function StripeCredits({
  clientSecret,
  onSuccess,
  onBack
}: {
  clientSecret: string;
  onSuccess: Function;
  onBack: Function;
}) {
  if (clientSecret === '') {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
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
        <StripeCreditsForm onSuccess={onSuccess} onBack={onBack} />
      </Elements>
    </Grid>
  );
}
