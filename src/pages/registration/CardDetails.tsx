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
  zipCode: string;
};

export default function CardDetails({
  cohortID,
  enrollmentID,
  user,
  setStep
}: {
  cohortID: string;
  user: string;
  enrollmentID: string;
  setStep: Function;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const ValidationSchema = Yup.object().shape({
    cardName: Yup.string().required('Full Name is required'),
    cardExpiry: Yup.string()
      .required('Card Expiry date is required')
      .max(5, 'Not a valid expiration date. Example: MM/YY')
      .test(
        'test-date',
        'Credit Card number is invalid.Example: MM/YY ',
        (value) => valid.expirationDate(value).isValid
      ),
    cardCvv: Yup.string()
      .required('Card CVV is required')
      .max(4, 'Cvv is invalid')
      .test('test-cvv', 'Cvv is invalid', (value) => valid.cvv(value).isValid),
    zipCode: Yup.string()
      .required('Zip Code is required')
      .max(6, 'Zip Code is invalid')
      .test('test-zip', 'Zip Code is invalid', (value) => valid.postalCode(value).isValid),
    cardNumber: Yup.string()
      .test('test-number', 'Credit Card number is invalid', (value) => valid.number(value).isValid)
      .required('Card Number is required')
  });

  const formik = useFormik<CardType>({
    initialValues: {
      cardCvv: '',
      cardExpiry: '',
      cardName: '',
      cardNumber: '',
      zipCode: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (enrollmentID && cohortID) {
        try {
          await axios
            .post(`/cohorts/${cohortID}/enrollments/${enrollmentID}/add_payment_details.json`, {
              ...values
            })
            .then((res) => {
              enqueueSnackbar('Details submitted', { variant: 'success' });
              setStep(3);
            });
        } catch (error) {
          enqueueSnackbar('Application Failed', { variant: 'error' });
          console.log(error);
        }
      } else {
        enqueueSnackbar('Invalid page URL', { variant: 'error' });
      }
    }
  });

  const { errors, touched, isSubmitting, getFieldProps, submitForm } = formik;

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" align="center" paragraph>
          👋 Thanks {user}, only one more step!
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          You can enter your payment details now in order to secure your spot in the cohort once you
          are selected.
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          ScholarSite is compatible with most L&D funding as shown here.
        </Typography>
      </Box>

      <Stack alignContent="center" width={{ xs: '100%', md: '40%' }} alignItems="center">
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
                        type="number"
                        variant="outlined"
                        {...getFieldProps('cardNumber')}
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
                        type="number"
                        {...getFieldProps('cardCvv')}
                        error={Boolean(touched.cardCvv && errors.cardCvv)}
                        helperText={touched.cardCvv && errors.cardCvv}
                        inputProps={{
                          maxLength: 4,
                          'data-testid': 'card-cvv'
                        }}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Zip Code"
                        {...getFieldProps('zipCode')}
                        error={Boolean(touched.zipCode && errors.zipCode)}
                        helperText={touched.zipCode && errors.zipCode}
                        inputProps={{
                          maxLength: 6,
                          'data-testid': 'zip-code'
                        }}
                      />
                    </Stack>
                  </Stack>
                  You will not be charged until you are accepted into the cohort!
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            variant="outlined"
            loading={isSubmitting}
            onClick={() => setStep(3)}
            id="btn-submit"
            sx={{ width: 150 }}
          >
            Skip this step
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={() => submitForm()}
            id="btn-submit"
            sx={{ width: 150, ml: 2 }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Stack>
    </>
  );
}
