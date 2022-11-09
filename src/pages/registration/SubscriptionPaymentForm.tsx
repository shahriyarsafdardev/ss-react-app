import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, InputLabel, Stack, TextField } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import PaymentTermsCheckBox from 'components/PaymentTermsCheckBox';
import { LoadingButton } from '@material-ui/lab';

type CardInfo = {
  name: string;
};

export default function SubscriptionPaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    },
    submitButton: {
      height: '40px',
      borderRadius: '30px'
    }
  });

  const classes = useStyles();

  const handleSubmit = async (event: any, name: string) => {
    setIsSubmitting(true);
    event.preventDefault();
  };

  const makePayment = async (name: string, email: string) => {
    const uploadData = new FormData();
    uploadData.append('name', name);

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

    setIsSubmitting(false);
  };

  const CardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required')
  });

  const formik = useFormik<CardInfo>({
    enableReinitialize: true,
    initialValues: {
      name: ''
    },
    validationSchema: CardSchema,
    onSubmit: () => {}
  });

  const { isValid, errors, touched, values, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
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
          onChange={(e) => {
            setValid(e.complete);
          }}
          options={{ terms: { card: 'never' } }}
        />
        <PaymentTermsCheckBox />
        <Stack spacing={{ xs: 3, md: 2 }} marginY="40px">
          <LoadingButton
            fullWidth
            onClick={(e: any) => handleSubmit(e, values.name)}
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            disabled={!(valid && isValid)}
            className={classes.submitButton}
          >
            Start Membership
          </LoadingButton>
          <Button fullWidth variant="outlined" className={classes.submitButton}>
            Back
          </Button>
        </Stack>
      </FormikProvider>
    </>
  );
}
