import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import {
  InputLabel,
  Stack,
  TextField,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@material-ui/core';

import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';

import { LoadingButton } from '@material-ui/lab';
import TermsCheckBox from 'components/TermsCheckBox';
import { useStyles } from './Common';

type CardInfo = {
  name: string;
  acceptedTerms: boolean;
};

const RONNY_COHORT_CODE = 'AAB';

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  borderRadius: '30px',
  [theme.breakpoints.down('sm')]: {
    position: null,
    bottom: null,
    right: null,
    width: '100%',
    marginTop: '10px'
  }
}));

export default function RegistrationPaymentForm({
  clientSecret,
  cohortCode,
  payLaterMessage,
  setStep,
  submitForm,
  trackRegistrationEvent,
  userFullName
}: {
  clientSecret: string;
  cohortCode: string;
  payLaterMessage: string;
  setStep: Function;
  submitForm: Function;
  trackRegistrationEvent: Function;
  userFullName: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handlePayLater = () => {
    trackRegistrationEvent("Cohort Registration - Payment Info Page - 'Pay Later' Selected");
    setOpen(true);
  };

  const handlePayNow = () => {
    trackRegistrationEvent(
      "Cohort Registration - Payment Info Page - 'No, I would like to pay now' Selected"
    );
    setOpen(false);
  };

  const handlePayLaterConfirmation = () => {
    trackRegistrationEvent(
      "Cohort Registration - Payment Info Page - 'Yes, I would like to pay later' Selected"
    );
    setStep(4);
  };

  const classes = useStyles();

  const CardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const formik = useFormik<CardInfo>({
    enableReinitialize: true,
    initialValues: {
      name: userFullName || '',
      acceptedTerms: false
    },
    validationSchema: CardSchema,
    onSubmit: () => {}
  });

  const { isValid, errors, touched, values, getFieldProps, setFieldValue } = formik;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: '',
        payment_method_data: {
          billing_details: {
            name: values.name
          }
        }
      },
      redirect: 'if_required'
    });

    if (result.setupIntent && result.setupIntent.status === 'succeeded') {
      submitForm(result.setupIntent.payment_method);
    } else if (result.error) {
      enqueueSnackbar(result.error.message, { variant: 'error' });
      setIsSubmitting(false);
    } else {
      enqueueSnackbar('Some error occured', { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', marginBottom: '1rem' }} data-testid="modal-header">
          Are you sure you want to pay later?
        </DialogTitle>
        <DialogContent sx={{ fontWeight: 500 }}>
          <Typography
            sx={{ textAlign: 'center', marginBottom: '1rem', px: 3.5 }}
            data-testid="modal-subtext"
          >
            {payLaterMessage}
          </Typography>
          <Typography sx={{ textAlign: 'left' }} data-testid="guarantee-one">
            ❌ We cannot guarantee the price you were quoted
          </Typography>
          <Typography sx={{ textAlign: 'left' }} data-testid="guarantee-two">
            ❌ We cannot guarantee a seat in the cohort - our seats sell out quickly!{' '}
          </Typography>
        </DialogContent>
        <DialogActions>
          <StyledButton
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handlePayLaterConfirmation}
            data-testid="pay-later"
          >
            Yes, I would like to pay later
          </StyledButton>
          <StyledButton
            fullWidth
            variant="contained"
            color="primary"
            data-testid="pay-now"
            onClick={handlePayNow}
          >
            No, I would like to pay now
          </StyledButton>
        </DialogActions>
      </Dialog>
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
        />
        <TermsCheckBox
          value={values.acceptedTerms}
          onChange={(value: boolean) => setFieldValue('acceptedTerms', value)}
        />
        <Stack
          width="100%"
          spacing={2}
          alignItems="center"
          sx={{ mt: 3 }}
          direction={{ xs: 'column', md: 'row' }}
        >
          {cohortCode !== RONNY_COHORT_CODE && (
            <StyledButton
              fullWidth
              type="submit"
              variant="outlined"
              loading={isSubmitting}
              onClick={handlePayLater}
              id="btn-submit"
              data-testid="pay-later-btn"
            >
              Pay Later
            </StyledButton>
          )}
          <StyledButton
            fullWidth
            type="submit"
            data-testid="submit-btn"
            disabled={!(valid && isValid && values.acceptedTerms)}
            loading={isSubmitting}
            variant="contained"
            id="btn-submit"
            onClick={(e) => handleSubmit(e)}
          >
            Secure Your Seat
          </StyledButton>
        </Stack>
      </FormikProvider>
    </>
  );
}
