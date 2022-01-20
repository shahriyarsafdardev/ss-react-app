import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import valid from 'card-validator';
import axios from 'utils/axios';
import { Grid, Card, Box, Stack, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';

type CardType = {
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
};

export default function CardDetails({
  cohortID,
  enrollmentID,
  user,
  setStep
}: {
  cohortID?: string;
  user?: string;
  enrollmentID?: string;
  setStep: Function;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const pattern = /^[0-9\b]+$/;

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
      cardName: '',
      cardNumber: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (enrollmentID && cohortID) {
        await axios
          .post(`/cohorts/${cohortID}/enrollments/${enrollmentID}/add_payment_details.json`, {
            ...values
          })
          .then((res) => {
            enqueueSnackbar('Card Details submitted', { variant: 'success' });
            setStep(3);
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

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" align="center" paragraph>
          💳 Thanks {user}, just one last step!
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          You will be charged if you are accepted, and you can get a refund up to 72 hours before
          the date of the first session.
        </Typography>
      </Box>

      <Stack alignContent="center" width={{ xs: '100%', md: '45%' }} alignItems="center">
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
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={isSubmitting}
            onClick={() => submitForm()}
            id="btn-submit"
          >
            Submit
          </LoadingButton>
          <LoadingButton
            type="submit"
            color="primary"
            variant="outlined"
            loading={isSubmitting}
            onClick={() => setStep(3)}
            id="btn-submit"
            fullWidth
            sx={{
              '&:hover': { bgcolor: '#b3b3d7', opacity: 0.72 }
            }}
          >
            Send me email link to pay
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
}
