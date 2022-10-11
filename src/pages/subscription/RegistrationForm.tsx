import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, Card, Stack, TextField, Typography } from '@material-ui/core';
import { StyledLoadingButton } from './Subscription';

export type RegistrationType = {
  email: string;
  full_name: string;
  company: string;
};

export default function RegistrationForm() {
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    full_name: Yup.string().required('Full Name is required'),
    linkedin_url: Yup.string().required('LinkedIn url is required')
  });

  const formik = useFormik<RegistrationType>({
    initialValues: { email: '', full_name: '', company: '' },
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('Registration Form Submitted');
      setSubmitting(false);
      resetForm();
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
                      label="Email"
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
                      label="Company"
                      {...getFieldProps('company')}
                      error={Boolean(touched.company && errors.company)}
                      helperText={touched.company && errors.company}
                      inputProps={{
                        'data-testid': 'company'
                      }}
                    />
                  </Stack>
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={!isValid}
                    onClick={() => submitForm()}
                    data-testid="submit-application"
                    id="btn-submit"
                  >
                    Complete Enrollment
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
