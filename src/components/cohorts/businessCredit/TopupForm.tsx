import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import valid from 'card-validator';
import { useDispatch } from 'redux/store';
import { addCredit } from 'redux/slices/businessCredit';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import {
  Grid,
  Card,
  Box,
  Button,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  ListItemText,
  Typography,
  FormControl,
  Select as MaterialSelect
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import { CardType } from '../../../@types/cohorts';

export default function TopupForm({
  accountID,
  setModal
}: {
  accountID?: string;
  setModal: Function;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const Credit_Topup_Options = ['5000', '10000', '20000'];
  const pattern = /^[0-9\b]+$/;
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [credits, setCredits] = useState(Number(Credit_Topup_Options[0]));

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
      cardName: `${user?.first_name} ${user?.last_name}`,
      cardNumber: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (accountID) {
        await axios
          .post(`/credit_accounts/${accountID}/add_credit.json`, {
            amount: credits,
            ...values
          })
          .then((res) => {
            dispatch(addCredit(res.data));
            enqueueSnackbar('Card Details submitted', { variant: 'success' });
            setModal(false);
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
    <Card sx={{ p: 3, height: 1, overflow: 'visible', background: 'white' }}>
      {step === 0 && (
        <>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" align="center" paragraph>
              Add Credits to Keep Saving
            </Typography>
            {/* <Typography sx={{ textAlign: 'center', marginBottom: '1rem', px: 3.5 }}>
              Your Credits are used to:
            </Typography>
            <Typography sx={{ textAlign: 'left', px: 4 }}>
              ✅ Unlock a 50% discount on all seats
            </Typography>
            <Typography sx={{ textAlign: 'left', px: 4 }}>
              ✅ Garuantee seats in the cohort for your employees
            </Typography> */}
          </Box>
          <Stack
            width={{ md: '40%', xs: '90%' }}
            spacing={2}
            sx={{ m: 'auto' }}
            justifyContent="center"
          >
            <FormControl fullWidth>
              <InputLabel>Top Up Amount</InputLabel>
              <MaterialSelect
                fullWidth
                label="Company Industries"
                onChange={(e) => setCredits(Number(e.target.value))}
                defaultValue={Credit_Topup_Options[0]}
              >
                {Credit_Topup_Options?.map((value: string) => (
                  <MenuItem key={value} value={value}>
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </MaterialSelect>
            </FormControl>
            <Button disabled={!(credits > 0)} onClick={() => setStep(1)} variant="contained">
              Add Credits
            </Button>
          </Stack>
        </>
      )}
      {step === 1 && (
        <>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" align="center" paragraph>
              You will be charged USD ${credits} for {credits} Credits
            </Typography>
          </Box>

          <Stack
            alignContent="center"
            justifyContent="center"
            width={{ xs: '100%', md: '80%' }}
            alignItems="center"
            sx={{ m: 'auto' }}
          >
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
                color="primary"
                variant="outlined"
                loading={isSubmitting}
                onClick={() => setStep(0)}
                fullWidth
                sx={{
                  '&:hover': { bgcolor: '#b3b3d7', opacity: 0.72 }
                }}
              >
                Back
              </LoadingButton>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={isSubmitting}
                onClick={() => submitForm()}
              >
                Purchase Credits
              </LoadingButton>
            </Stack>
          </Stack>
        </>
      )}
    </Card>
  );
}
