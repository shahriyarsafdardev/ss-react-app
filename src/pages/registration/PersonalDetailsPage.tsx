import { Stack, Box, Typography, useTheme, useMediaQuery, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@material-ui/lab';
import { PaymentRootStyle, Logo, useStyles } from './Common';

export type UserType = {
  email: string;
  full_name: string;
  linkedin_url: string;
};

export default function PersonalDetailsPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    full_name: Yup.string().required('Full Name is required'),
    linkedin_url: Yup.string().required('LinkedIn url is required')
  });

  const formik = useFormik<UserType>({
    initialValues: { email: '', full_name: '', linkedin_url: '' },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      navigate('/registration/payment-options');
    }
  });

  const { errors, touched, getFieldProps, isSubmitting, isValid, submitForm } = formik;

  return (
    <PaymentRootStyle title="Sphere Registration">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-purple.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} className={classes.wrapperStack}>
        <Stack className={classes.paymentData} alignItems="center" spacing={4}>
          <Typography className={`${classes.heading} ${classes.toggleFont}`}>
            Accelerating Innovation with A/B Testing
          </Typography>
          <Typography textAlign="center" className={`${isDesktop && classes.paddingHorizontal40}`}>
            live with Ronny Kohavi and a community of likeminded industry professionals
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          className={`${classes.paymentData} ${isDesktop && classes.purpleBackground}`}
        >
          <Box className={classes.fullWidthCenter}>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
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
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={!isValid}
                    onClick={() => submitForm()}
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
