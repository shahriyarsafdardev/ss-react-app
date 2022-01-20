import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'utils/axios';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack5';

import { Grid, Card, Box, Stack, TextField, Typography } from '@material-ui/core';

type UserType = {
  first_name?: string;
  last_name?: string;
  linkedin_url?: string;
  enrollment_id?: string;
};

export default function UserForm({
  submitValues,
  cohortID,
  user
}: {
  submitValues: Function;
  cohortID: string;
  user: UserType;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    linkedin_url: Yup.string().url('Must be a valid url').required('LinkedIn url is required')
  });

  const formik = useFormik<UserType>({
    initialValues: { ...user },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (values.enrollment_id && cohortID) {
        try {
          await axios
            .post(`/cohorts/${cohortID}/enrollments/${values.enrollment_id}/update_profile.json`, {
              ...values
            })
            .then((res) => {
              enqueueSnackbar('Application Submitted', { variant: 'success' });
              submitValues({ ...values });
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

  const { errors, touched, isSubmitting, getFieldProps, submitForm, isValid } = formik;

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" align="center" paragraph>
          👋 We just need a few more details to process your application
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          We review each application in order to ensure a diverse and experienced cohort!
        </Typography>
      </Box>

      <Stack alignContent="center" width={{ xs: '100%', md: '70%' }} alignItems="center">
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
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!isValid}
          onClick={() => submitForm()}
          id="btn-submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit Application
        </LoadingButton>
      </Stack>
    </>
  );
}
