import { Button, FormControl, Stack, styled, TextField, Typography } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';

export type ReferralTypeUser = {
  email: string;
  fullName: string;
};

const ParentStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: '40%',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    margin: '20px auto'
  }
}));

const ChildStack = styled(Stack)(({ theme }) => ({
  padding: '50px',
  border: '1px solid #CBD5E1',
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    padding: '20px'
  }
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  width: '40%',
  margin: 'auto !important',
  marginTop: '32px !important',
  [theme.breakpoints.down('md')]: {
    width: '60%'
  }
}));

export default function InviteTeamForm({ handleSubmit }: { handleSubmit: Function }) {
  const { enqueueSnackbar } = useSnackbar();
  const cohortID = window.location.pathname.split('/')[2] || '';

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required')
  });

  const formik = useFormik<ReferralTypeUser>({
    initialValues: {
      email: '',
      fullName: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await axios
        .post(`/cohorts/${cohortID}/send_referrals_email.json`, {
          referee_email: values.email,
          referee_name: values.fullName,
          id: cohortID,
          source: 'onboarding-referral'
        })
        .then((res) => {
          setSubmitting(false);
          enqueueSnackbar(`Invitation sent to ${values.email} 🎉`, { variant: 'success' });
          resetForm();
        })
        .catch((error: any) => {
          setSubmitting(false);
          console.log(error);
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  });

  const { values, errors, touched, isSubmitting, getFieldProps, submitForm, isValid } = formik;

  return (
    <ParentStack spacing={{ xs: 2, md: 8 }}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <ChildStack spacing={2}>
            <Typography textAlign="center">
              Enter your colleague’s email and name and we will send them an invite to the course.
            </Typography>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'role-title' }}
                fullWidth
                label="Email"
                error={Boolean(touched.email && errors.email)}
                {...getFieldProps('email')}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'role-title' }}
                fullWidth
                label="Full Name"
                error={Boolean(touched.fullName && errors.fullName)}
                {...getFieldProps('fullName')}
              />
            </FormControl>
            <StyledLoadingButton
              data-testid="invitation-button"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !values.email || !values.fullName}
              onClick={() => submitForm()}
            >
              Send Invite
            </StyledLoadingButton>
          </ChildStack>
        </Form>
      </FormikProvider>
      <Button
        fullWidth
        sx={{ borderRadius: '30px' }}
        variant="outlined"
        onClick={() => handleSubmit()}
      >
        Finish
      </Button>
    </ParentStack>
  );
}
