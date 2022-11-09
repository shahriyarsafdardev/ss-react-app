import * as Yup from 'yup';
import {
  Stack,
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
  Link,
  TextField,
  Avatar
} from '@material-ui/core';

import { useFormik, Form, FormikProvider } from 'formik';
import { PaymentRootStyle, Logo, useStyles, StyledLoadingButton } from './Common';

export default function TeamPackageInquiry() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const TeamLeadSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: ''
    },
    validationSchema: TeamLeadSchema,
    onSubmit: () => {}
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

  const { values, isSubmitting, touched, errors, handleSubmit, getFieldProps, setFieldValue } =
    formik;

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
            Inquire about our Team Packages
          </Typography>
          <Typography className={classes.inquiryFont}>
            You can learn more about our team packages through{' '}
            <Link
              sx={{
                textDecoration: 'underline !important',
                color: { xs: '#FFFFFF', md: '#4D4DCD' }
              }}
            >
              our team pricing page
            </Link>
          </Typography>
          <Typography className={classes.inquiryFont}>
            If you provide the contact details of your team lead / training rep we will get in touch
            to share more information.
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
                    label="Team Lead Email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    {...getFieldProps('email')}
                    onChange={(e: any) => setFieldValue('email', e.target.value)}
                  />
                  <TextField
                    label="Team Lead Full Name"
                    fullWidth
                    {...getFieldProps('fullName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    onChange={(e: any) => setFieldValue('fullName', e.target.value)}
                  />
                  <Stack spacing={2}>
                    <StyledLoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      onClick={() => {}}
                    >
                      Share Information
                    </StyledLoadingButton>
                    <StyledLoadingButton
                      type="submit"
                      variant="outlined"
                      loading={isSubmitting}
                      onClick={() => {}}
                    >
                      Back
                    </StyledLoadingButton>
                  </Stack>
                </Stack>
              </Form>
            </FormikProvider>
          </Card>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
