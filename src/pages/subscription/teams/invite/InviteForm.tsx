import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'utils/axios';
import { InputLabel, Stack, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { StyledLoadingButton } from '../Common';
import { InvitationDetails } from './InvitePage';
import InvitationSubscriptionDetails from './InvitationSubscriptionDetails';

type CardInfo = {
  name: string;
  email: string;
};

export default function InviteForm({
  teamID,
  cohortID,
  creditAmount,
  stripeCustomerID,
  setPaymentCompleted,
  setSubscriptionExist,
  invitationDetails
}: {
  teamID: string;
  cohortID: string;
  creditAmount: string;
  stripeCustomerID: string;
  setPaymentCompleted: Function;
  setSubscriptionExist: Function;
  invitationDetails: InvitationDetails;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [valid, setValid] = useState(false);
  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root.Mui-error fieldset': {
        border: '2px solid #DF1B41'
      },
      '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderWidth: '1px'
      },
      '& .MuiOutlinedInput-root.Mui-error.Mui-focused fieldset': {
        borderColor: '#475569'
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

  const handleSubmit = async (event: any, name: string, email: string) => {
    setIsSubmitting(true);
    event.preventDefault();

    await axios
      .get(
        `subscriptions/teams/${teamID}/invite/subscription_details.json?team_id=${teamID}&cohort_id=${cohortID}&email=${email}`
      )
      .then((res) => {
        if (res.data.is_subscription_exist) {
          setSubscriptionExist(res.data.is_subscription_exist);
          setPaymentCompleted(true);
        } else {
          makePayment(name, email);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
      });
  };

  const makePayment = async (name: string, email: string) => {
    const uploadData = new FormData();
    uploadData.append('cohort_id', cohortID);
    uploadData.append('name', name);
    uploadData.append('email', email);
    uploadData.append('subscription_amount', creditAmount);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
        payment_method_data: {
          billing_details: {
            name,
            email
          }
        }
      },
      redirect: 'if_required'
    });

    if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      uploadData.append('stripe_customer_id', stripeCustomerID);
      uploadData.append('payment_method', String(result.paymentIntent?.payment_method));
      await axios
        .post(`subscriptions/teams/${teamID}/invite/subscribe.json`, uploadData)
        .then((res) => {
          setPaymentCompleted && setPaymentCompleted(true);
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    } else {
      enqueueSnackbar('Some error occurred!', { variant: 'error' });
    }
    setIsSubmitting(false);
  };

  const CardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required')
  });

  const formik = useFormik<CardInfo>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: CardSchema,
    onSubmit: () => {}
  });

  const { isValid, errors, touched, values, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <InputLabel style={{ fontSize: '14.88px', color: '#475569' }}>Your Email</InputLabel>
        <TextField
          fullWidth
          type="email"
          placeholder="Your Email"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          className={classes.root}
          sx={{ marginBottom: '20px' }}
          size="small"
          InputProps={{
            classes: { input: classes.input }
          }}
          FormHelperTextProps={{
            className: classes.helperText
          }}
        />
        <InputLabel style={{ fontSize: '14.88px', color: '#475569' }}>Full Name</InputLabel>
        <TextField
          fullWidth
          placeholder="Full Name"
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
          className={classes.root}
          sx={{ marginBottom: '20px' }}
          size="small"
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
            <InvitationSubscriptionDetails
              amount={creditAmount !== '' ? parseInt(creditAmount, 10) : 0}
              details={invitationDetails}
            />
          )}

          <StyledLoadingButton
            fullWidth
            onClick={(e: any) => handleSubmit(e, values.name, values.email)}
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            disabled={!(valid && isValid)}
          >
            Subscribe
          </StyledLoadingButton>
        </Stack>
      </FormikProvider>
    </>
  );
}
