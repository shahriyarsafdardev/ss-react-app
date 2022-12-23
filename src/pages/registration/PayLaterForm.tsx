import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, InputLabel, Stack, TextField, Theme } from '@material-ui/core';
import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import PaymentTermsCheckBox from 'components/PaymentTermsCheckBox';
import { LoadingButton } from '@material-ui/lab';
import { useNavigate } from 'react-router';
import axiosV2 from 'utils/axiosV2';
import { useSnackbar } from 'notistack5';
import { trackEvent } from 'utils/eventTracking';

type CardInfo = {
  name: string;
};

function PayLaterForm({
  cohortID,
  enrollmentID,
  customerID,
  cohort
}: {
  cohortID: string;
  enrollmentID: string;
  customerID: string;
  cohort: any;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const useStyles = makeStyles((theme: Theme) => ({
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
        color: '#D3D3D3'
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
      height: '48px',
      borderRadius: '30px'
    },
    paymentButtonsStack: {
      marginTop: '40px',
      [theme.breakpoints.down('md')]: {
        marginBottom: '40px'
      }
    }
  }));

  const classes = useStyles();

  const handleBackButton = () => {
    trackEvent(cohort, 'Cohort Registration - Course Payment - "Back" Selected');
    navigate(`/registration/payment-options?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`);
  };

  const CardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const formik = useFormik<CardInfo>({
    enableReinitialize: true,
    initialValues: {
      name: ''
    },
    validationSchema: CardSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: '',
          payment_method_data: {
            billing_details: {
              name: values?.name
            }
          }
        },
        redirect: 'if_required'
      });

      if (result?.setupIntent && result?.setupIntent.status === 'succeeded') {
        await axiosV2
          .put(`enrollments/${enrollmentID}.json`, {
            stripeCustomerID: customerID,
            stripePaymentMethodID: String(result.setupIntent?.payment_method)
          })
          .then((res) => {
            trackEvent(cohort, 'Cohort Registration - Course Payment - Payment Made');
            navigate(
              `/registration/course-invite?cohort_id=${cohortID}&enrollment_id=${enrollmentID}&mode=one-time`
            );
          })
          .catch((err) => {
            enqueueSnackbar(err.message, { variant: 'error' });
          });
      } else if (result.error) {
        enqueueSnackbar(result.error.message, { variant: 'error' });
        setSubmitting(false);
      } else {
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        setSubmitting(false);
      }
    }
  });

  const { isValid, errors, touched, getFieldProps, handleSubmit, isSubmitting } = formik;

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
        <Stack spacing={{ xs: 3, md: 2 }} className={classes.paymentButtonsStack}>
          <LoadingButton
            fullWidth
            onClick={() => handleSubmit()}
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            disabled={!(valid && isValid)}
            className={classes.submitButton}
          >
            Secure Your Seat
          </LoadingButton>
          <Button
            fullWidth
            variant="outlined"
            className={classes.submitButton}
            onClick={handleBackButton}
          >
            Back
          </Button>
        </Stack>
      </FormikProvider>
    </>
  );
}

export default memo(PayLaterForm);
