import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'utils/axios';
import { InputLabel, Stack, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { TeamMember } from './InviteMembersForm';
import { StyledLoadingButton, SubscriptionDetails } from './Common';
import { Registration } from './TeamRegistration';

export default function StripePayment({
  team,
  teamMembers,
  email,
  setStep,
  setCredentials,
  stripeCustomerID,
  setPaymentCompleted,
  registration,
  shouldDisplayBackButton,
  teamDiscount,
  isSinglePayee
}: {
  team: string;
  teamMembers: TeamMember[];
  email: string;
  setStep?: Function;
  setCredentials?: Function;
  stripeCustomerID: string;
  setPaymentCompleted?: Function;
  registration?: Registration;
  shouldDisplayBackButton: boolean;
  teamDiscount: number;
  isSinglePayee: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const teamID = url.get('team_id') || '';
  const creditAmount = url.get('amount') || '';
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: '1px solid #E6E6E6',
          borderWidth: `${touched && name === '' ? '2px' : '1px'}`
        },
        '&:hover fieldset': {
          borderColor: `${touched && name === '' ? '#DF1B41' : '#475569'}`
        },
        '&.Mui-focused fieldset': {
          border: `1px solid ${touched && name === '' ? '#DF1B41' : '#475569'}`,
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02), #475569',
          borderWidth: `${touched && name === '' ? '2px' : '1px'}`
        }
      }
    },
    input: {
      '&::placeholder': {
        color: '#475569'
      }
    },
    helperText: {
      fontSize: '14.88px',
      margin: '0',
      '&.MuiFormHelperText-root.Mui-error': {
        color: '#DF1B41'
      }
    }
  });

  const classes = useStyles();

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
        return_url: '',
        payment_method_data: {
          billing_details: {
            name
          }
        }
      },
      redirect: 'if_required'
    });

    if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      uploadData.append('stripe_customer_id', stripeCustomerID);
      uploadData.append('payment_method', String(result.paymentIntent?.payment_method));
      await axios
        .post(url, uploadData)
        .then((res) => {
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
      <InputLabel style={{ fontSize: '14.88px', color: '#475569' }}>Name on Card</InputLabel>
      <TextField
        fullWidth
        placeholder="Name on Card"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: '20px' }}
        size="small"
        className={classes.root}
        onBlur={(e) => setTouched(true)}
        error={touched && name === ''}
        helperText={touched && name === '' ? 'Name is required' : ''}
        InputProps={{
          classes: { input: classes.input }
        }}
        FormHelperTextProps={{
          className: classes.helperText
        }}
      />
      <PaymentElement
        options={{
          wallets: {
            applePay: 'auto',
            googlePay: 'auto'
          }
        }}
        onChange={(e) => {
          setValid(e.complete);
        }}
      />
      <Stack spacing={{ xs: 3, md: 2 }}>
        {!desktopView && (
          <SubscriptionDetails isSinglePayee={isSinglePayee} teamDiscount={teamDiscount} />
        )}
        <StyledLoadingButton
          fullWidth
          onClick={(e: any) => handleSubmit(e)}
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          disabled={!name || !valid}
        >
          Subscribe
        </StyledLoadingButton>
        {(shouldDisplayBackButton || creditAmount === '') && (
          <StyledLoadingButton
            fullWidth
            onClick={() => setStep && setStep(true)}
            variant="outlined"
            size="large"
          >
            Back
          </StyledLoadingButton>
        )}
      </Stack>
    </>
  );
}
