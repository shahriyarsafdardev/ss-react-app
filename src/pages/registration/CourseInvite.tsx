import * as Yup from 'yup';
import {
  Stack,
  Box,
  Card,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Avatar
} from '@material-ui/core';
import { useEffect } from 'react';
import { trackEvent } from 'utils/eventTracking';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import { PaymentRootStyle, Logo, useStyles, StyledLoadingButton } from './Common';
import { Company } from '../expense_checker/ExpenseCheckerPage';

export default function CourseInvite() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   trackEvent(cohort, 'L&D Approval Checker - Approved Company - Page Opened', {
  //     Company: company?.name
  //   });
  // }, []);
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
    onSubmit: (values, { setSubmitting }) => {
      enqueueSnackbar(`Invitation Sent to ${values?.email}! 🎉`, { variant: 'success' });
      setSubmitting(false);
    }
    // onSubmit: async (values, { setErrors, setSubmitting }) => {
    //   try {
    //     handleNextStep();
    //   } catch (error) {
    //     console.error(error);
    //     setSubmitting(false);
    //     setErrors(error.message);
    //   }
    // }
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

  return (
    <PaymentRootStyle title="Sphere">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere_blue.svg" alt="logo" />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        className={`${classes.wrapperStack} ${classes.textCenter}`}
      >
        <Stack className={`${classes.inquiryTextContainer}`} alignItems="center" spacing={3}>
          <Avatar
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/dark-email-background.png"
            alt="company?.name"
            sx={{ width: 112, height: 112 }}
          />
          <Typography variant="h3" className={classes.heading}>
            Invite your Colleagues
          </Typography>
          <Typography
            sx={{ color: { xs: '#fff', md: '#64748B' }, fontWeight: '600', fontSize: '18px' }}
          >
            Enter your colleagues email and name and we will send them an exclusive invite to the
            course
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          className={`${classes.inquiryTextContainer} ${isDesktop && classes.purpleBackground}`}
        >
          <Card className={classes.formContainer}>
            <FormikProvider value={formik}>
              <Form autoComplete="off">
                <Stack spacing={3}>
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
                    onClick={() => handleSubmit()}
                    disabled={!isValid || values.email === '' || values.fullName === ''}
                  >
                    Send Invite
                  </StyledLoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Card>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
