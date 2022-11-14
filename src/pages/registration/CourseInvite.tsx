import * as Yup from 'yup';
import {
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Avatar,
  Box,
  Link
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
  const [cohort, setCohort] = useState<any>();
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

  const formik = useFormik({
    initialValues: {
      emails: ''
    },
    validateOnChange: isFormSubmit,
    validateOnBlur: isFormSubmit,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const emails = values?.emails.split(',').map((email) => email.trim());
      let emailErrors = '';
      emails.forEach((email) => {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
          emailErrors += `${email}, `;
        }
      });
      if (emailErrors.split(', ').length === 2) {
        setErrors({
          emails: `Invalid email address ${emailErrors.substring(0, emailErrors.length - 2)}`
        });
        return;
      }
      if (emailErrors.split(', ').length > 2) {
        setErrors({
          emails: `Invalid email address for ${emailErrors.substring(0, emailErrors.length - 2)}`
        });
        return;
      }
      await axiosV2
        .post('invites/course.json', {
          cohort_id: cohortID,
          email: registrantEmail,
          referee_emails: emails.join(','),
          enrollment_id: enrollmentID
        })
        .then((res) => {
          enqueueSnackbar(`Invitation Sent to ${values?.emails}! 🎉`, { variant: 'success' });
          setSubmitting(false);
          emails.forEach((email) => {
            trackEvent(cohort, 'Cohort Registration - Invited by Referral', {
              ...res?.data,
              'Referee Email': email
            });
          });
          resetForm();
        })
        .catch((err) => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  });

  const { values, isSubmitting, touched, errors, getFieldProps, setFieldValue, handleSubmit } =
    formik;

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
            {mode === 'team-subscription'
              ? 'We’ll reach out to your team lead and keep you in the loop'
              : 'Congratulations, and welcome!'}
          </Typography>
          <Typography
            sx={{ color: { xs: '#fff', md: '#64748B' }, fontWeight: '600', fontSize: '18px' }}
          >
            {mode === 'team-subscription' ? (
              <>
                Please don’t hesitate to reach out{' '}
                <Link
                  sx={{
                    textDecoration: 'underline !important'
                  }}
                  href="https://portal.getsphere.com/contact-us"
                  target="_blank"
                  color="#64748B !important"
                >
                  here
                </Link>{' '}
                if you have further questions
              </>
            ) : (
              'You will receive your onboarding pack shortly via email'
            )}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          className={`${classes.inquiryTextContainer} ${isDesktop && classes.purpleBackground}`}
          padding="80px !important"
        >
          <Box className={classes.fullWidthCenter} width="100% !important">
            <Stack spacing={3} alignItems="center">
              <Typography className={`${classes.heading} ${classes.whiteFont}`}>
                Refer Friends & Colleagues
              </Typography>
              <Typography className={classes.whiteFont} width="80%" margin="auto">
                You’ll each receive $100 worth of Sphere courses after they join their first course.
              </Typography>
              <FormikProvider value={formik}>
                <Form autoComplete="off" style={{ width: '100%' }}>
                  <Stack spacing={3} className={classes.whiteStackCard} width="100% !important">
                    <TextField
                      label="Emails (separated by commas)"
                      fullWidth
                      {...getFieldProps('emails')}
                      error={Boolean(touched.emails && errors.emails)}
                      helperText={touched.emails && errors.emails}
                      onChange={(e: any) => setFieldValue('emails', e.target.value)}
                    />
                    <StyledLoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      onClick={() => {
                        handleSubmit();
                        setIsFormSubmit(true);
                      }}
                      disabled={values.emails === ''}
                    >
                      Send Invite
                    </StyledLoadingButton>
                  </Stack>
                </Form>
              </FormikProvider>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
