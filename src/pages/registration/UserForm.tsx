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
import { UserType, CohortType, StyledLoadingButton } from './Registration';

export default function UserForm({
  submitValues,
  cohort,
  user,
  account,
  wait_listed,
  trackReferralFlowEvents
}: {
  submitValues: Function;
  user: UserType;
  cohort: CohortType;
  account: string;
  wait_listed: boolean;
  trackReferralFlowEvents: Function;
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
    trackOnboardingEvent(
      ONBOARDING_EVENTS.event_type,
      {
        [ONBOARDING_EVENTS.event]: 'Registered',
        [ONBOARDING_EVENTS.category]: 'Registered',
        [ONBOARDING_EVENTS.description]: 'User has registered on portal.'
      },
      cohort
    );
  };

  const triggerReferralEvent = () => {
    trackReferralEvent(
      REFERRAL_EVENTS.event_type,
      {
        [REFERRAL_EVENTS.event]: 'Registered',
        [REFERRAL_EVENTS.category]: 'referral link',
        [REFERRAL_EVENTS.description]: 'Registered via referral link',
        [REFERRAL_EVENTS.referrer_code]: referrer_code
      },
      cohort
    );
  };

  const formik = useFormik<UserType>({
    initialValues: { ...user, acceptedTerms: false },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (values.enrollment_id && cohort?.id) {
        try {
          await axios
            .post(
              `/cohorts/${cohort?.id}/enrollments/${values.enrollment_id}/update_profile.json`,
              {
                ...values
              }
            )
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
              trackReferralFlowEvents(
                'Cohort Registration - Personal Info Page - Details Submitted',
                {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  linkedin_url: values.linkedin_url
                }
              );
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
