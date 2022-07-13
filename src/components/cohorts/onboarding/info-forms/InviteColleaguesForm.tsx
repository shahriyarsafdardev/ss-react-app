import { Grid, Stack, FormControl, TextField } from '@material-ui/core';
import axios from 'utils/axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import { LoadingButton } from '@material-ui/lab';
import { NavigationButtons } from './dataTypes';
import { Cohort } from '../../../../@types/cohorts';

type ReferralTypeUser = {
  email: string;
  fullName: string;
  cohort?: Cohort;
  referrer_code?: string;
};

export default function InviteColleagues({
  onSubmit,
  onPrevHandler,
  isSubmittingButton
}: {
  isSubmittingButton: boolean;
  onSubmit: Function;
  onPrevHandler: Function;
}) {
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required')
  });
  const { enqueueSnackbar } = useSnackbar();
  const cohortId = window.location.pathname.split('/')[2] || '';

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
          id: cohortId
        })
        .then((res) => {
          enqueueSnackbar('Refferal Invite sent!', { variant: 'success' });
          values.email = '';
          values.fullName = '';
        })
        .catch((error: any) => {
          console.log(error);
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  });

  const { values, errors, touched, isSubmitting, getFieldProps, submitForm, isValid } = formik;

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Stack
            direction="column"
            sx={{ height: 1, overflow: 'visible' }}
            spacing={2}
            style={{ padding: '10px' }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormikProvider value={formik}>
                <Form
                  style={{ width: '100%', display: 'flex', columnGap: '16px' }}
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
                  <FormControl fullWidth>
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
            </Stack>
            <Stack>
              <LoadingButton
                data-testid="invite-button"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: '24px', padding: '12px 0px', width: '50%', alignSelf: 'center' }}
                loading={isSubmitting}
                disabled={!isValid || !values.email || !values.fullName}
                onClick={() => submitForm()}
              >
                Invite
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <NavigationButtons
        isSubmitting={isSubmittingButton}
        isSubmitBtn={true}
        showPrevButton={true}
        disabled={false}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit()}
      />
    </>
  );
}
