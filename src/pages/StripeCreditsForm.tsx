import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { Box, InputLabel, Stack, TextField } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import PaymentTermsCheckBox from 'components/PaymentTermsCheckBox';
import { useStyles } from './Common';

type CardType = {
  cardName: string;
};
export default function StripeCreditsForm({
  onSuccess,
  onBack
}: {
  onSuccess: Function;
  onBack: Function;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [valid, setValid] = useState(false);
  const { user } = useAuth();

  const ValidationSchema = Yup.object().shape({
    cardName: Yup.string().required('Full Name is required')
  });

  const formik = useFormik<CardType>({
    initialValues: {
      cardName: `${user?.first_name} ${user?.last_name}` || ''
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
            name: values.cardName
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

  const { values, isValid, errors, touched, getFieldProps } = formik;

  return (
    <>
      <Box style={{ marginBottom: '20px' }}>
        <InputLabel style={{ fontSize: '14.88px', color: '#475569' }}>Name on Card</InputLabel>
        <TextField
          fullWidth
          {...getFieldProps('cardName')}
          error={Boolean(touched.cardName && errors.cardName)}
          helperText={touched.cardName && errors.cardName}
          className={classes.root}
          size="small"
          placeholder="Name on Card"
          InputProps={{
            classes: { input: classes.input }
          }}
          FormHelperTextProps={{
            className: classes.helperText
          }}
        />
      </Box>
      <PaymentElement
        onChange={(e) => {
          setValid(e.complete);
        }}
        options={{ terms: { card: 'never' } }}
      />
      <PaymentTermsCheckBox />
      <Stack
        width="100%"
        spacing={2}
        alignItems="center"
        sx={{ mt: 3 }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <LoadingButton
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          loading={isSubmitting}
          onClick={(e) => onBack()}
          id="btn-submit"
        >
          Back
        </LoadingButton>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!(valid && isValid)}
          loading={isSubmitting}
          onClick={(e) => handleSubmit(e)}
          id="btn-submit"
        >
          Purchase Credits
        </LoadingButton>
      </Stack>
    </>
  );
}
