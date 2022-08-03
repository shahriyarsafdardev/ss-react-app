import { FormControl, TextField, Button, Stack, styled, Box } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { REFERRAL_EVENTS, trackReferralEvent } from 'utils/amplitude';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import { useState } from 'react';
import { Cohort } from '../../@types/cohorts';
import { CohortType } from './Registration';
import InvitesList from './InvitesList';

export type ReferralTypeUser = {
  email: string;
  fullName: string;
  cohort?: Cohort;
  referrer_code?: string;
};

const StyledStack = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '39px 28px',
  marginBottom: '50px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const StyledInviteList = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '39px 28px',
  marginBottom: '50px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px 5px'
  }
}));
const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  height: '40px',
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const StyledButton = styled(Button)(({ theme }) => ({
  width: '270px',
  height: '40px',
  borderRadius: '30px',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

function InvitePeersForm({
  onContinue,
  enrollmentId,
  cohort,
  referrer_code,
  company,
  account,
  waitListed,
  preRelease
}: {
  onContinue: Function;
  enrollmentId: string;
  cohort: CohortType;
  referrer_code: string;
  company: boolean;
  account: boolean;
  waitListed: boolean;
  preRelease: boolean;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [invites, setInvites] = useState<ReferralTypeUser[]>([]);
  const getRegistrationFlow = () => {
    if (account) {
      return 'Enterprise contract';
    }
    if (company) {
      return 'No enterprise contract BUT have sent employees to cohorts in the past';
    }
    if (waitListed) {
      return 'Waitlist - No Price';
    }
    if (preRelease) {
      return 'Waitlist with Price';
    }
    return "No enterprise contract and haven't sent anyone to cohorts in the past";
  };

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
        .post(`/enrollments/${enrollmentId}/send_referrals_email.json`, {
          referee_email: values.email,
          referee_name: values.fullName
        })
        .then((res) => {
          setSubmitting(false);
          setInvites([...invites, { email: values.email, fullName: values.fullName }]);
          resetForm();
          enqueueSnackbar('Refferal Invite sent!', { variant: 'success' });
          trackReferralEvent(REFERRAL_EVENTS.event_type, {
            [REFERRAL_EVENTS.cohort_name]: cohort?.name,
            [REFERRAL_EVENTS.cohort_intake_number]: cohort?.intake,
            [REFERRAL_EVENTS.event]: 'email invitation sent',
            [REFERRAL_EVENTS.category]: 'referral link',
            [REFERRAL_EVENTS.description]: 'Send referral link via email',
            [REFERRAL_EVENTS.referrer_code]: referrer_code,
            [REFERRAL_EVENTS.invite_email]: values.email,
            [REFERRAL_EVENTS.invite_full_name]: values.fullName,
            [REFERRAL_EVENTS.registration_flow]: getRegistrationFlow()
          });
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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <StyledStack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 2 }}>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'role-title' }}
                fullWidth
                label={company ? 'Company Email' : 'Email'}
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
              data-testid="purchase-button"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !values.email || !values.fullName}
              onClick={() => submitForm()}
            >
              Send Invite
            </StyledLoadingButton>
          </StyledStack>
          {invites && invites.length > 0 && (
            <StyledInviteList>
              <InvitesList invites={invites} />
            </StyledInviteList>
          )}
        </Form>
      </FormikProvider>
      <StyledButton fullWidth variant="outlined" onClick={() => onContinue()}>
        Continue
      </StyledButton>
    </Box>
  );
}

export default InvitePeersForm;
