import * as Yup from 'yup';
import {
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Avatar,
  Box
} from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import axiosV2 from 'utils/axiosV2';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import LoadingScreen from 'components/LoadingScreen';
import { setSegmentUserProperties, trackEvent } from 'utils/eventTracking';

import { PaymentRootStyle, Logo, useStyles, StyledLoadingButton, LoadingContainer } from './Common';

export default function CourseInvite() {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { enqueueSnackbar } = useSnackbar();
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const enrollmentID = url.get('enrollment_id') || '';
  const mode = url.get('mode') || '';
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<any>({});
  const [cohort, setCohort] = useState<any>({});
  const [registrantEmail, setRegistrantEmail] = useState('');

  useEffect(() => {
    if (enrollmentID && mode) {
      axiosV2
        .get(`enrollments/${enrollmentID}/details.json`)
        .then((res) => {
          setCompany({ ...res?.data?.company });
          setCohort({ ...res?.data?.cohort });
          setRegistrantEmail(res?.data?.registrantEmail);
          setLoading(false);
          setSegmentUserProperties(res?.data?.user);
        })
        .catch((err) => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  }, []);

  const FormSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: ''
    },
    validationSchema: FormSchema,
    validateOnChange: isFormSubmit,
    validateOnBlur: isFormSubmit,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await axiosV2
        .post('invites/course.json', {
          cohort_id: cohortID,
          email: registrantEmail,
          referee_name: values?.fullName,
          referee_email: values?.email,
          enrollment_id: enrollmentID
        })
        .then((res) => {
          enqueueSnackbar(`Invitation Sent to ${values?.email}! 🎉`, { variant: 'success' });
          setSubmitting(false);
          trackEvent(cohort, 'Cohort Registration - Invited by Referral', {
            ...res?.data,
            'Referee Email': values.email,
            'Referee Name': values.fullName
          });
          resetForm();
        })
        .catch((err) => {
          console.log('error from here', err);
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  });

  const {
    values,
    isSubmitting,
    touched,
    errors,
    getFieldProps,
    setFieldValue,
    isValid,
    handleSubmit
  } = formik;

  if (loading || !cohortID || !enrollmentID) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <PaymentRootStyle title="Sphere">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere_blue.svg" alt="logo" />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        className={`${classes.wrapperStack} ${classes.textCenter}`}
      >
        <Stack className={`${classes.inquiryTextContainer}`} alignItems="center" spacing={3}>
          {company?.logo_url && (
            <Avatar src={company?.logo_url} alt={company?.name} sx={{ width: 112, height: 112 }} />
          )}
          <Typography variant="h3" className={classes.heading}>
            {mode === 'subscription'
              ? 'Congratulations, you’ve started your membership'
              : 'Congratulations, you will receive your onboarding details shortly'}
          </Typography>
          <Typography
            sx={{ color: { xs: '#fff', md: '#64748B' }, fontWeight: '600', fontSize: '18px' }}
          >
            {mode === 'subscription'
              ? 'Would you like to refer colleagues'
              : "Enter your colleague's email and name and we will send them an exclusive invite to the course"}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          className={`${classes.inquiryTextContainer} ${isDesktop && classes.purpleBackground}`}
        >
          <Box className={classes.fullWidthCenter}>
            <FormikProvider value={formik}>
              <Form autoComplete="off">
                <Stack spacing={3} className={classes.whiteStackCard} width="100% !important">
                  <TextField
                    label="Email"
                    fullWidth
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    onChange={(e: any) => setFieldValue('email', e.target.value)}
                  />
                  <TextField
                    label="Full Name"
                    fullWidth
                    {...getFieldProps('fullName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                    onChange={(e: any) => setFieldValue('fullName', e.target.value)}
                  />
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    onClick={() => {
                      handleSubmit();
                      setIsFormSubmit(true);
                    }}
                    disabled={!isValid || values.email === '' || values.fullName === ''}
                  >
                    Send Invite
                  </StyledLoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
