import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import valid from 'card-validator';
import TermsCheckBox from 'components/TermsCheckBox';
import axios from 'utils/axios';
import { Stack, TextField } from '@material-ui/core';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3)
  }
}));

type CardType = {
  cardName?: string;
  cardEmail?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  acceptedTerms: boolean;
};

export default function PaymentCardDetails({
  linkID,
  onSuccess,
  onFailure,
  isUserPayment
}: {
  linkID: string | null;
  onSuccess: Function;
  onFailure: Function;
  isUserPayment: boolean;
}) {
  const pattern = /^[0-9\b]+$/;

  const ValidationSchema = Yup.object().shape({
    cardName: Yup.string().required('Full Name is required'),
    cardEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
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
      cardEmail: '',
      cardNumber: '',
      acceptedTerms: false
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const endpoint = isUserPayment ? 'add_user_payment' : 'add_payment';
      await axios
        .post(`/payments/${linkID}/${endpoint}.json`, {
          ...values
        })
        .then((res) => {
          onSuccess();
          resetForm();
        })
        .catch((error: any) => {
          onFailure(error.message);
        });
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
    <RootStyle>
      <FormikProvider value={formik}>
        <Form
          style={{ width: '100%' }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
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
              <TextField
                fullWidth
                label="Email"
                {...getFieldProps('cardEmail')}
                error={Boolean(touched.cardEmail && errors.cardEmail)}
                helperText={touched.cardEmail && errors.cardEmail}
                inputProps={{
                  'data-testid': 'card-email'
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
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!values.acceptedTerms}
              loading={isSubmitting}
              onClick={() => submitForm()}
              id="btn-submit"
            >
              Submit
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
