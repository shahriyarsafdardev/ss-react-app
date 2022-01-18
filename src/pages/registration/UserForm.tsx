import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'utils/axios';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack5';

import {
  Grid,
  Card,
  Box,
  Stack,
  TextField,
  Typography,
  MenuItem,
  ListItemText,
  InputLabel,
  FormControl,
  Select as MaterialSelect
} from '@material-ui/core';

type UserType = {
  first_name: string;
  last_name: string;
  current_company: string;
  current_position: string;
  linkedin_url: string;
};

export default function UserForm({
  submitValues,
  cohortID,
  email
}: {
  submitValues: Function;
  cohortID: string;
  email: string;
}) {
  const [companies, setCompanies] = useState<string[]>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.companies && setCompanies(payload.companies);
      });
  }, []);
  const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    linkedin_url: Yup.string().url('Must be a valid url').required('LinkedIn url is required')
  });

  const formik = useFormik<UserType>({
    initialValues: {
      first_name: '',
      last_name: '',
      current_company: '',
      current_position: '',
      linkedin_url: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (email && cohortID) {
        try {
          await axios
            .post(`/cohorts/${cohortID}/enrollments.json`, { ...values, email })
            .then((res) => {
              enqueueSnackbar('Application Submitted', { variant: 'success' });
              submitValues({
                enrollment_id: res.data.enrollment_id,
                host: res.data.host,
                user: values.first_name
              });
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

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" align="center" paragraph>
          👋 We just need a few more details to process your application
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          The more info you provide, the better your chances are of being accepted into the cohort!
        </Typography>
      </Box>

      <Stack alignContent="center" width={{ xs: '100%', md: '80%' }} alignItems="center">
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
                        label="Current Role"
                        {...getFieldProps('current_position')}
                        error={Boolean(touched.current_position && errors.current_position)}
                        helperText={touched.current_position && errors.current_position}
                        inputProps={{
                          'data-testid': 'current_position'
                        }}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="multiple-checkbox-pronoun-label">
                          Current Company
                        </InputLabel>
                        <MaterialSelect
                          fullWidth
                          label="Current Company"
                          labelId="company-label"
                          id="multiple-checkbox-company"
                          data-testid="preferred-company"
                          sx={{ zIndex: 1500 }}
                          {...getFieldProps('current_company')}
                        >
                          {companies?.map((company: string) => (
                            <MenuItem key={company} value={company}>
                              <ListItemText primary={company} />
                            </MenuItem>
                          ))}
                        </MaterialSelect>
                      </FormControl>
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
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Personal Bio"
                        {...getFieldProps('bio_text')}
                        multiline
                        rows={4}
                        inputProps={{
                          'data-testid': 'user-introduction'
                        }}
                      />
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      id="btn-submit"
                      sx={{ width: 70 }}
                    >
                      Next
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Stack>
    </>
  );
}
