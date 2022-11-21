import { useState, useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Card, Stack, TextField } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import axiosV2 from 'utils/axiosV2';
import { useSnackbar } from 'notistack5';
import { RootState, useSelector } from 'redux/store';
import { useStyles, StyledLoadingButton } from './Common';

export default function SendReferralInviteForm() {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ValidationSchema,
    validateOnChange: isFormSubmit,
    validateOnBlur: isFormSubmit,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await axiosV2
        .post('/referrals.json', {
          cohort_id: cohort?.id,
          referee_email: values?.email
        })
        .then((response) => {
          sendAnalyticsData('Balance Page - Referrals Tab - Referral sent', {
            'Referee Email': values?.email
          });
          sendAnalyticsData('Cohort Registration - Invited by Referral', {
            ...response?.data,
            'Referee Email': values?.email
          });
          enqueueSnackbar(`Invitation sent to ${values.email} 🎉`, { variant: 'success' });
          resetForm();
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Some error occurred!', { variant: 'error' });
        });
    }
  });

  const { values, isSubmitting, touched, errors, getFieldProps, isValid, handleSubmit } = formik;

  return (
    <Card className={classes.formCard}>
      <FormikProvider value={formik}>
        <Form>
          <Stack alignItems="center" direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label="Email"
              fullWidth
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <StyledLoadingButton
              data-testid="purchase-button"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !values.email}
              onClick={() => {
                handleSubmit();
                setIsFormSubmit(true);
              }}
            >
              Send referral
            </StyledLoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
