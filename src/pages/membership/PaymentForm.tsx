import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { InputLabel, Stack, TextField } from '@material-ui/core';
import { memo, useState } from 'react';
import * as Yup from 'yup';

import { FormikProvider, useFormik } from 'formik';
import PaymentTermsCheckBox from 'components/PaymentTermsCheckBox';
import { LoadingButton } from '@material-ui/lab';
import axiosV2 from 'utils/axiosV2';
import { useSnackbar } from 'notistack5';
import { useStyles } from './Common';

type CardInfo = {
  name: string;
};

function PaymentForm({
  courseID,
  email,
  customerID,
  setIsMember,
  setMemberShipID
}: {
  courseID: string;
  email: string;
  customerID: string;
  setIsMember: Function;
  setMemberShipID: Function;
}) {
  const stripe = useStripe();
  const classes = useStyles();
  const elements = useElements();
  const [valid, setValid] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

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

      const result: any = await stripe.confirmSetup({
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
          .post('memberships.json', {
            course_id: courseID,
            email,
            stripe_customer_id: customerID,
            stripe_payment_method_id: String(result.setupIntent?.payment_method)
          })
          .then((res) => {
            enqueueSnackbar(res.data?.message, { variant: 'success' });
            setMemberShipID(res.data?.membership_id);
            setIsMember(true);
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
            Secure Discount
          </LoadingButton>
        </Stack>
      </FormikProvider>
    </>
  );
}

export default memo(PaymentForm);
