import { Box, FormControl, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import { REFERRAL_EVENTS, trackReferralEvent } from 'utils/amplitude';
import { EmailModalProps } from './Common';
import { Cohort } from '../../@types/cohorts';

type ReferralTypeUser = {
  email: string;
  fullName: string;
  cohort?: Cohort;
  referrer_code?: string;
};

function InviteEmailForm({
  referralEmailModal,
  setReferralEmailModal,
  cohort,
  referrer_code
}: EmailModalProps) {
  const { enqueueSnackbar } = useSnackbar();
  const cohortId = window.location.pathname.split('/')[2] || '';

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
    onSubmit: async (values) => {
      await axios
        .post(`/cohorts/${cohortId}/send_referrals_email.json`, {
          referee_email: values.email,
          referee_name: values.fullName,
          id: cohortId,
          source: 'sidebar-referral'
        })
        .then((res) => {
          trackReferralEvent(
            REFERRAL_EVENTS.email_sent_event_type,
            {
              [REFERRAL_EVENTS.referee_first_name]: values.fullName.split(' ')[0],
              [REFERRAL_EVENTS.referee_full_name]: values.fullName,
              [REFERRAL_EVENTS.referee_email]: values.email
            },
            cohort
          );
          enqueueSnackbar('Refferal Invite sent!', { variant: 'success' });
          setReferralEmailModal(false);
        })
        .catch((error: any) => {
          console.log(error);
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  });

  const { values, errors, touched, isSubmitting, getFieldProps, submitForm, isValid } = formik;

  return (
    <Box sx={{ paddingLeft: '64px', width: '50%' }}>
      <FormikProvider value={formik}>
        <Form
          style={{ width: '100%' }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <FormControl fullWidth>
            <TextField
              inputProps={{ 'data-testid': 'role-title' }}
              fullWidth
              label="Email Address"
              error={Boolean(touched.email && errors.email)}
              {...getFieldProps('email')}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: '24px' }}>
            <TextField
              inputProps={{ 'data-testid': 'role-title' }}
              fullWidth
              label="Full Name"
              error={Boolean(touched.fullName && errors.fullName)}
              {...getFieldProps('fullName')}
            />
          </FormControl>
        </Form>
      </FormikProvider>
      <LoadingButton
        data-testid="purchase-button"
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: '24px', padding: '12px 0px' }}
        loading={isSubmitting}
        disabled={!isValid || !values.email || !values.fullName}
        onClick={() => submitForm()}
      >
        Invite
      </LoadingButton>
    </Box>
  );
}

export default InviteEmailForm;
