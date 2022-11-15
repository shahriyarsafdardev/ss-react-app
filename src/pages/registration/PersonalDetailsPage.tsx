import { Stack, Box, Typography, useTheme, useMediaQuery, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import { LoadingButton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import axiosV2 from 'utils/axiosV2';
import { useSnackbar } from 'notistack5';
import LoadingScreen from 'components/LoadingScreen';
import { setSegmentUserProperties, trackEvent } from 'utils/eventTracking';
import { PaymentRootStyle, Logo, useStyles, LoadingContainer } from './Common';

export type UserType = {
  email: string;
  full_name: string;
  linkedin_url: string;
};

export type CohortType = {
  id: string;
  name: string;
  intake: string;
  intake_name: string;
  host_full_names: string;
  dates: string;
  price: string;
  code: string;
  amplitude_events_timeline: any;
};

export type CompanyType = {
  name: string;
  logo_url: string;
};

export default function PersonalDetailsPage() {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    full_name: Yup.string().required('Full Name is required'),
    linkedin_url: Yup.string().required('LinkedIn url is required')
  });
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const [cohort, setCohort] = useState<any>();
  const source = url.get('source') || '';
  const referrerDomain = url.get('referrer_domain') || '';
  const couponCode = url.get('referrer') || '';

  useEffect(() => {
    setLoading(true);
    axiosV2
      .get(`cohorts/${cohortID}.json`)
      .then((res) => {
        setCohort(res?.data?.cohort);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
      });
  }, []);

  useEffect(() => {
    cohort &&
      window.analytics?.ready &&
      window.analytics?.ready(() => {
        window.analytics?.identify(window.analytics?.user().anonymousId(), {});
        sendAnalyticsData('Cohort Registration - Personal Info Page - Page Loaded', {
          Source: '',
          Referrer: '',
          'Cohort Price': cohort?.price
        });
      });
  }, [cohort, window.analytics?.ready]);

  const sendAnalyticsData = (eventType: string, eventData: any) => {
    trackEvent(cohort, eventType, eventData);
  };

  const formik = useFormik<UserType>({
    initialValues: { email: '', full_name: '', linkedin_url: '' },
    validationSchema: ValidationSchema,
    validateOnChange: isFormSubmit,
    validateOnBlur: isFormSubmit,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await axiosV2
        .post(`enrollments.json`, {
          cohort_id: cohortID,
          email: values?.email,
          full_name: values?.full_name,
          linkedin_url: values?.linkedin_url,
          source,
          referrer_domain: referrerDomain,
          coupon_code: couponCode
        })
        .then((res) => {
          setSegmentUserProperties(res?.data?.user);
          sendAnalyticsData('Cohort Registration - Personal Info Page - Details Submitted', {
            'Registrant First Name': values?.full_name.split(' ')?.[0] || '',
            'Registrant Last Name':
              values?.full_name.split(' ')?.[1] || values?.full_name.split(' ')?.[0],
            'Registrant LinkedIn URL': values?.linkedin_url,
            'Registrant Email': values?.email,
            Source: '',
            Referrer: '',
            'Cohort Price': cohort?.price
          });
          navigate(
            `/registration/payment-options?cohort_id=${cohortID}&enrollment_id=${res?.data?.enrollment_id}`
          );
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          enqueueSnackbar(err.message || 'Some error occurred!', { variant: 'error' });
        });
    }
  });

  const { errors, touched, getFieldProps, isSubmitting, isValid, submitForm } = formik;

  if (loading || !cohortID) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <PaymentRootStyle title="Sphere Registration">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-purple.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} className={classes.wrapperStack}>
        <Stack className={classes.paymentData} alignItems="center" spacing={4}>
          <Typography className={`${classes.heading} ${classes.toggleFont}`}>
            {cohort?.name}
          </Typography>
          <Typography textAlign="center" className={`${isDesktop && classes.paddingHorizontal40}`}>
            live with {cohort?.host_full_names} and a community of likeminded industry professionals
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          className={`${classes.paymentData} ${isDesktop && classes.purpleBackground}`}
        >
          <Box className={classes.fullWidthCenter}>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off">
                <Stack spacing={3} className={classes.whiteStackCard} width="100% !important">
                  <TextField
                    fullWidth
                    label="Company Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    inputProps={{
                      'data-testid': 'email'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...getFieldProps('full_name')}
                    error={Boolean(touched.full_name && errors.full_name)}
                    helperText={touched.full_name && errors.full_name}
                    inputProps={{
                      'data-testid': 'full-name'
                    }}
                  />
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    {...getFieldProps('linkedin_url')}
                    error={Boolean(touched.linkedin_url && errors.linkedin_url)}
                    helperText={touched.linkedin_url && errors.linkedin_url}
                    inputProps={{
                      'data-testid': 'linkedin_url'
                    }}
                  />
                  <LoadingButton
                    variant="contained"
                    loading={isSubmitting}
                    disabled={!isValid}
                    onClick={() => {
                      submitForm();
                      setIsFormSubmit(true);
                    }}
                    type="submit"
                    data-testid="submit-registration-form"
                    id="btn-submit"
                    className={classes.submitButton}
                  >
                    Get Started
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
