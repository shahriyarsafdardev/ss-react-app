import * as Yup from 'yup';
import {
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Link,
  TextField,
  Avatar,
  Button,
  Box
} from '@material-ui/core';

import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosV2 from 'utils/axiosV2';
import LoadingScreen from 'components/LoadingScreen';
import { PaymentRootStyle, Logo, useStyles, StyledLoadingButton, LoadingContainer } from './Common';

export default function TeamPackageInquiry() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const enrollmentID = url.get('enrollment_id') || '';
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<any>({});
  const [registrantEmail, setRegistrantEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (enrollmentID) {
      axiosV2
        .get(`enrollments/${enrollmentID}/details.json`)
        .then((res) => {
          setCompany({ ...res?.data?.company });
          setRegistrantEmail(res?.data?.registrant_email);
          setLoading(false);
        })
        .catch((err) => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  }, []);

  const handleBackButton = () => {
    navigate(`/registration/payment-options?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`);
  };

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
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await axiosV2
        .post('invites/team_package.json', {
          email: registrantEmail,
          referee_name: values?.fullName,
          referee_email: values?.email
        })
        .then((res) => {
          enqueueSnackbar(`Information shared with ${values?.email}!`, { variant: 'success' });
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
        });
    }
  });

  const { values, isSubmitting, touched, errors, getFieldProps, isValid, handleSubmit } = formik;

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
            Inquire about our Team Packages
          </Typography>
          <Typography className={classes.inquiryFont}>
            You can learn more about our team packages through{' '}
            <Link
              sx={{
                textDecoration: 'underline !important',
                color: { xs: '#FFFFFF', md: '#4D4DCD' }
              }}
              href="https://www.getsphere.com/pricing"
              target="_blank"
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
          <Box className={classes.fullWidthCenter}>
            <FormikProvider value={formik}>
              <Form autoComplete="off">
                <Stack spacing={3} className={classes.whiteStackCard} width="100% !important">
                  <TextField
                    label="Team Lead Email"
                    fullWidth
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Team Lead Full Name"
                    fullWidth
                    {...getFieldProps('fullName')}
                    helperText={touched.fullName && errors.fullName}
                    error={Boolean(touched.fullName && errors.fullName)}
                  />
                  <Stack spacing={2}>
                    <StyledLoadingButton
                      variant="contained"
                      loading={isSubmitting}
                      onClick={() => handleSubmit()}
                      disabled={!isValid || values.email === '' || values.fullName === ''}
                    >
                      Share Information
                    </StyledLoadingButton>
                    <Button
                      variant="outlined"
                      onClick={() => handleBackButton()}
                      className={classes.submitButton}
                    >
                      Back
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
