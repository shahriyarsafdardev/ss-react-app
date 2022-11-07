import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import PaymentTermsCheckBox from 'components/PaymentTermsCheckBox';
import { LoadingButton } from '@material-ui/lab';
import { Box, InputLabel, Stack, TextField } from '@material-ui/core';
import { useStyles } from './Common';

type CardType = {
  cardName: string;
  cardEmail: string;
  acceptedTerms: boolean;
};
export default function StripePaymentForm({ onSuccess }: { onSuccess: Function }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [valid, setValid] = useState(false);

  const ValidationSchema = Yup.object().shape({
    cardName: Yup.string().required('Full Name is required'),
    cardEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik<CardType>({
    initialValues: {
      cardName: '',
      cardEmail: '',
      acceptedTerms: true
    },
    validationSchema: ValidationSchema,
    onSubmit: () => {}
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
        payment_method_data: {
          billing_details: {
            name: values.cardName,
            email: values.cardEmail
          }
        }
      },
      redirect: 'if_required'
    });
    if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      onSuccess();
    } else if (result.error) {
      enqueueSnackbar(result.error.message, { variant: 'error' });
      setIsSubmitting(false);
    } else {
      enqueueSnackbar('Some error occured', { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  const { values, isValid, errors, touched, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form style={{ width: '100%' }} noValidate autoComplete="off">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            style={{ marginBottom: '20px' }}
            spacing={2}
          >
            <Box style={{ width: '100%' }}>
              <InputLabel style={{ fontSize: '14.88px', color: '#475569' }}>Full Name</InputLabel>
              <TextField
                fullWidth
                {...getFieldProps('cardName')}
                error={Boolean(touched.cardName && errors.cardName)}
                helperText={touched.cardName && errors.cardName}
                className={classes.root}
                size="small"
                placeholder="Full Name"
                InputProps={{
                  classes: { input: classes.input }
                }}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
            </Box>
            <Box style={{ width: '100%' }}>
              <InputLabel style={{ fontSize: '14.88px', color: '#475569' }}>Email</InputLabel>
              <TextField
                fullWidth
                {...getFieldProps('cardEmail')}
                error={Boolean(touched.cardEmail && errors.cardEmail)}
                helperText={touched.cardEmail && errors.cardEmail}
                className={classes.root}
                size="small"
                placeholder="Email"
                InputProps={{
                  classes: { input: classes.input }
                }}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
      <PaymentElement
        onChange={(e) => {
          setValid(e.complete);
        }}
        options={{ terms: { card: 'never' } }}
      />
      <PaymentTermsCheckBox />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!(valid && isValid && values.acceptedTerms)}
        loading={isSubmitting}
        onClick={(e) => handleSubmit(e)}
        id="btn-submit"
      >
        Submit
      </LoadingButton>
    </>
  );
}
