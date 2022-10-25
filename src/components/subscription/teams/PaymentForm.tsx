import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import valid from 'card-validator';
import { Grid, Stack, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { StyledLoadingButton } from './Common';

type CardType = {
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  acceptedTerms: boolean;
};

export default function PaymentForm({
  handleSubmit,
  setStep
}: {
  handleSubmit: Function;
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
      cardNumber: '',
      acceptedTerms: true
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      enqueueSnackbar('Payment Made', { variant: 'success' });
      handleSubmit();
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
      <Stack alignContent="center" width="100%" alignItems="center" sx={{ marginTop: '30px' }}>
        <FormikProvider value={formik}>
          <Form
            style={{ width: '100%' }}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={1}>
              <Grid item sx={{ m: 'auto', width: '100%' }}>
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
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
        <Stack width="100%" spacing={2} alignItems="center" sx={{ mt: 5 }}>
          <StyledLoadingButton
            fullWidth
            type="submit"
            data-testid="submit-btn"
            loading={isSubmitting}
            variant="contained"
            id="btn-submit"
            onClick={() => submitForm()}
          >
            Subscribe
          </StyledLoadingButton>
          <StyledLoadingButton
            fullWidth
            type="submit"
            variant="outlined"
            loading={false}
            id="btn-submit"
            data-testid="pay-later-btn"
            onClick={() => setStep(true)}
          >
            Back
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </>
  );
}
