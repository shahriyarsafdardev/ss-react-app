import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import valid from 'card-validator';
import TermsCheckBox from 'components/TermsCheckBox';
import axios from 'utils/axios';
import {
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import {
  ONBOARDING_EVENTS,
  REFERRAL_EVENTS,
  trackOnboardingEvent,
  trackReferralEvent
} from 'utils/amplitude';
import { useLocation } from 'react-router';
import { trackReferralFlowEvents } from 'components/cohorts/registrations/Common';
import { CohortType, UserType } from './Registration';

type CardType = {
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  acceptedTerms: boolean;
};

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

const CohortDetailsCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '24px',
  marginBottom: '12px'
}));

export default function CardDetails({
  cohort,
  user,
  enrollmentID,
  first_name,
  last_name,
  setStep,
  payLaterMessage,
  source
}: {
  cohort: CohortType;
  user: UserType;
  first_name?: string;
  last_name?: string;
  enrollmentID?: string;
  setStep: Function;
  payLaterMessage: string;
  source: string;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const pattern = /^[0-9\b]+$/;
  const [open, setOpen] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const alumni = url.get('alumni') || false;
  const referrer_code = url.get('referrer') || '';

  useEffect(() => {
    trackReferralFlowEvents(
      'Cohort Registration - Payment Info Page - Page Loaded',
      user,
      cohort,
      source
    );
  }, []);

  const handlePayLater = () => {
    trackReferralFlowEvents(
      "Cohort Registration - Payment Info Page - 'Pay Later' Selected",
      user,
      cohort,
      source
    );
    setStep(5);
  };

  const triggerOnboardingEvent = () => {
    trackOnboardingEvent(ONBOARDING_EVENTS.event_type, {
      [ONBOARDING_EVENTS.cohort_name]: cohort?.id,
      [ONBOARDING_EVENTS.cohort_intake_number]: '',
      [ONBOARDING_EVENTS.event]: 'Payment Made',
      [ONBOARDING_EVENTS.category]: 'Payment Made',
      [ONBOARDING_EVENTS.description]: 'User has paid for enrollment.'
    });
  };

  const triggerReferralEvent = () => {
    trackReferralEvent(REFERRAL_EVENTS.event_type, {
      [REFERRAL_EVENTS.cohort_name]: cohort?.id,
      [REFERRAL_EVENTS.cohort_intake_number]: '',
      [REFERRAL_EVENTS.event]: 'Payment Made',
      [REFERRAL_EVENTS.category]: 'referral link',
      [REFERRAL_EVENTS.description]: 'Payment Made via referral link',
      [REFERRAL_EVENTS.referrer_code]: referrer_code
    });
  };

  const ValidationSchema = Yup.object().shape({
    cardName: Yup.string().required('Full Name is required'),
    cardExpiry: Yup.string()
      .required('Card Expiry date is required')
      .max(5, 'Not a valid expiration date. Example: MM/YY')
      .matches(/^[0-9][0-9]['\/'][0-9][0-9]+$/, 'Not a valid expiration date. Example: MM/YY')
      .test(
        'test-date',
        'Credit Card number is invalid.Example: MM/YY ',
        (value) => valid.expirationDate(value).isValid
      ),
    cardCvv: Yup.string()
      .required('Card CVV is required')
      .max(4, 'Cvv is invalid')
      .test('test-cvv', 'Cvv is invalid', (value) => validateCardCvv(value)),
    cardNumber: Yup.string()
      .test('test-number', 'Credit Card number is invalid', (value) => validateCardNumber(value))
      .required('Card Number is required')
  });

  const formik = useFormik<CardType>({
    initialValues: {
      cardCvv: '',
      cardExpiry: '',
      cardName: `${first_name} ${last_name}`,
      cardNumber: '',
      acceptedTerms: false
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (enrollmentID && cohort?.id) {
        await axios
          .post(`/cohorts/${cohort?.id}/enrollments/${enrollmentID}/add_payment_details.json`, {
            ...values
          })
          .then((res) => {
            enqueueSnackbar('Card Details submitted', { variant: 'success' });
            triggerOnboardingEvent();
            trackReferralFlowEvents(
              'Cohort Registration - Payment Info Page - Submitted Card',
              user,
              cohort,
              source,
              { amount_paid: cohort?.price }
            );
            if (alumni) {
              triggerReferralEvent();
            }
            setStep(5);
          })
          .catch((error: any) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          });
      } else {
        enqueueSnackbar('Invalid user credentials', { variant: 'error' });
      }
    }
  });

  const { values, errors, touched, isSubmitting, getFieldProps, submitForm, setFieldValue } =
    formik;

  const validateCardCvv = (value: any) => {
    const properties: any = valid.number(values.cardNumber)?.card;
    if (properties && value) {
      return properties.niceType && properties.code.size === value.length;
    }
    return false;
  };

  const validateCardNumber = (value: any) => {
    const properties: any = valid.number(values.cardNumber);
    if (properties.card && value) {
      return properties.card.niceType && properties.card.lengths.includes(value.length);
    }
    return false;
  };

  const InfoRow = ({ title, value }: { title: string; value: string }) => (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={{ mb: 1 }}>
      <Typography sx={{ color: 'text.secondary', fontWeight: 'bolder' }}>{title}:&nbsp;</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
  const CohortInfo = () => (
    <CohortDetailsCard>
      <InfoRow title="Course" value={cohort?.name || ''} />
      <InfoRow title="Instructor" value={cohort?.instructor || ''} />
      <InfoRow title="Dates" value={cohort?.dates || 'TBD'} />
      <InfoRow title="Price" value={cohort?.price ? `$${cohort?.price}` : 'TBD'} />
    </CohortDetailsCard>
  );

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
            onClick={handlePayLater}
            data-testid="pay-later"
          >
            Yes, I would like to pay later
          </StyledButton>
          <StyledButton
            fullWidth
            variant="contained"
            color="primary"
            data-testid="pay-now"
            onClick={() => setOpen(false)}
          >
            No, I would like to pay now
          </StyledButton>
        </DialogActions>
      </Dialog>
      <Stack alignContent="center" width={{ xs: '100%', md: '50%' }} alignItems="center">
        <CohortInfo />

        <FormikProvider value={formik}>
          <Form
            style={{ width: '100%' }}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={1}>
              <Grid item sx={{ m: 'auto', width: '100%' }}>
                <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        {...getFieldProps('cardName')}
                        error={Boolean(touched.cardName && errors.cardName)}
                        helperText={touched.cardName && errors.cardName}
                        inputProps={{
                          'data-testid': 'card-name'
                        }}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Credit Card Number"
                        value={values.cardNumber}
                        onChange={(e) => {
                          if (e.target.value === '' || pattern.test(e.target.value)) {
                            setFieldValue('cardNumber', e.target.value);
                          }
                        }}
                        variant="outlined"
                        error={Boolean(touched.cardNumber && errors.cardNumber)}
                        helperText={touched.cardNumber && errors.cardNumber}
                        inputProps={{
                          'data-testid': 'card-number'
                        }}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Exp Date"
                        {...getFieldProps('cardExpiry')}
                        error={Boolean(touched.cardExpiry && errors.cardExpiry)}
                        helperText={touched.cardExpiry && errors.cardExpiry}
                        inputProps={{
                          maxLength: 5,
                          'data-testid': 'card-expiry'
                        }}
                      />
                      <TextField
                        fullWidth
                        label="CVV"
                        value={values.cardCvv}
                        onChange={(e) => {
                          if (e.target.value === '' || pattern.test(e.target.value)) {
                            setFieldValue('cardCvv', e.target.value);
                          }
                        }}
                        error={Boolean(touched.cardCvv && errors.cardCvv)}
                        helperText={touched.cardCvv && errors.cardCvv}
                        inputProps={{
                          maxLength: 4,
                          'data-testid': 'card-cvv'
                        }}
                      />
                    </Stack>
                    <TermsCheckBox
                      value={values.acceptedTerms}
                      onChange={(value: boolean) => setFieldValue('acceptedTerms', value)}
                    />
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
        <Stack
          width="100%"
          spacing={2}
          alignItems="center"
          sx={{ mt: 3 }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <StyledButton
            fullWidth
            type="submit"
            variant="outlined"
            loading={isSubmitting}
            onClick={() => setOpen(true)}
            id="btn-submit"
            data-testid="pay-later-btn"
          >
            Pay Later
          </StyledButton>
          <StyledButton
            fullWidth
            type="submit"
            data-testid="submit-btn"
            disabled={!values.acceptedTerms}
            loading={isSubmitting}
            variant="contained"
            id="btn-submit"
            onClick={() => submitForm()}
          >
            Secure Your Seat
          </StyledButton>
        </Stack>
      </Stack>
    </>
  );
}
