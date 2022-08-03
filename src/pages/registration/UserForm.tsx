import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import useAuth from 'hooks/useAuth';
import { Grid, Card, Stack, TextField, Typography } from '@material-ui/core';
import TermsCheckBox from 'components/TermsCheckBox';
import {
  ONBOARDING_EVENTS,
  REFERRAL_EVENTS,
  setAmplitudeUserId,
  setAmplitudeUserProperties,
  trackOnboardingEvent,
  trackReferralEvent
} from 'utils/amplitude';
import { useLocation } from 'react-router';
import { StyledLoadingButton } from './Registration';

type UserType = {
  first_name?: string;
  last_name?: string;
  linkedin_url?: string;
  enrollment_id?: string;
  acceptedTerms: boolean;
};

export default function UserForm({
  submitValues,
  cohortID,
  user,
  account,
  wait_listed
}: {
  submitValues: Function;
  cohortID: string;
  user: UserType;
  account: string;
  wait_listed: boolean;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useAuth();
  const url = new URLSearchParams(useLocation().search);
  const alumni = url.get('alumni') || false;
  const referrer_code = url.get('referrer') || '';
  const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    linkedin_url: Yup.string().required('LinkedIn url is required')
  });

  const triggerOnboardingEvent = () => {
    trackOnboardingEvent(ONBOARDING_EVENTS.event_type, {
      [ONBOARDING_EVENTS.cohort_name]: cohortID,
      [ONBOARDING_EVENTS.cohort_intake_number]: '',
      [ONBOARDING_EVENTS.event]: 'Registered',
      [ONBOARDING_EVENTS.category]: 'Registered',
      [ONBOARDING_EVENTS.description]: 'User has registered on portal.'
    });
  };

  const triggerReferralEvent = () => {
    trackReferralEvent(REFERRAL_EVENTS.event_type, {
      [REFERRAL_EVENTS.cohort_name]: cohortID,
      [REFERRAL_EVENTS.cohort_intake_number]: '',
      [REFERRAL_EVENTS.event]: 'Registered',
      [REFERRAL_EVENTS.category]: 'referral link',
      [REFERRAL_EVENTS.description]: 'Registered via referral link',
      [REFERRAL_EVENTS.referrer_code]: referrer_code
    });
  };

  const formik = useFormik<UserType>({
    initialValues: { ...user, acceptedTerms: false },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (values.enrollment_id && cohortID) {
        try {
          await axios
            .post(`/cohorts/${cohortID}/enrollments/${values.enrollment_id}/update_profile.json`, {
              ...values
            })
            .then((res) => {
              const { user } = res.data;
              enqueueSnackbar('Application Submitted', { variant: 'success' });
              submitValues({ ...values, slug: user.slug });
              if (!isAuthenticated) {
                setAmplitudeUserId(user?.slug);
                setAmplitudeUserProperties({
                  full_name: user?.full_name,
                  type: user?.type,
                  company: user?.company,
                  industry: user?.industry_category_selection?.join()
                });
              }
              triggerOnboardingEvent();
              if (alumni) {
                triggerReferralEvent();
              }
            });
        } catch (error) {
          enqueueSnackbar('Application Failed', { variant: 'error' });
          console.log(error);
        }
      } else {
        enqueueSnackbar('Invalid page URL', { variant: 'error' });
      }
    }
  });

  const {
    errors,
    values,
    touched,
    isSubmitting,
    getFieldProps,
    submitForm,
    setFieldValue,
    isValid
  } = formik;

  return (
    <Stack
      alignContent="center"
      width={{ xs: '100%', md: '50%' }}
      display="flex"
      direction="column"
      alignItems="center"
    >
      <FormikProvider value={formik}>
        <Form
          style={{ width: '100%' }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={1}>
            <Grid item sx={{ m: 'auto', width: '100%' }}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Typography variant="h6">Your Information</Typography>
                  <Stack direction="column" spacing={4}>
                    <TextField
                      fullWidth
                      label="First Name"
                      {...getFieldProps('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      inputProps={{
                        'data-testid': 'first-name'
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      {...getFieldProps('last_name')}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      inputProps={{
                        'data-testid': 'last-name'
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
                  </Stack>

                  {(account || wait_listed) && (
                    <TermsCheckBox
                      data-testid="registration-checkbox"
                      value={values.acceptedTerms}
                      onChange={(value: boolean) => setFieldValue('acceptedTerms', value)}
                    />
                  )}
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={!isValid || ((!!account || wait_listed) && !values.acceptedTerms)}
                    onClick={() => submitForm()}
                    data-testid="submit-application"
                    id="btn-submit"
                  >
                    Continue
                  </StyledLoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
}
