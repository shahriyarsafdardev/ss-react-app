import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, Card, Stack, TextField, Typography } from '@material-ui/core';
import TermsCheckBox from 'components/TermsCheckBox';
import { UserType, StyledLoadingButton, NEW_REGISTRATION_FLOW_COHORT_CODES } from './Registration';

export default function UserForm({
  user,
  cohortCode,
  account,
  wait_listed,
  createEnrollment
}: {
  user: UserType;
  cohortCode: string;
  account: string;
  wait_listed: boolean;
  createEnrollment: Function;
}) {
  const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    linkedin_url: Yup.string().required('LinkedIn url is required')
  });
  const NonEmailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    full_name: Yup.string().required('Full Name is required'),
    linkedin_url: Yup.string().required('LinkedIn url is required')
  });

  const formik = useFormik<UserType>({
    initialValues: { ...user, acceptedTerms: false },
    validationSchema:
      user?.email && !NEW_REGISTRATION_FLOW_COHORT_CODES.includes(cohortCode)
        ? ValidationSchema
        : NonEmailValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await createEnrollment(values)
        .then((res: any) => {
          setSubmitting(false);
          resetForm();
        })
        .catch((error: any) => {
          setSubmitting(false);
        });
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

  const submitButtonText = () =>
    NEW_REGISTRATION_FLOW_COHORT_CODES.includes(cohortCode) ? 'Complete Enrollment' : 'Continue';

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
                    {user?.email && !NEW_REGISTRATION_FLOW_COHORT_CODES.includes(cohortCode) ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <TextField
                          fullWidth
                          label="Company Email"
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
                      </>
                    )}
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
                    {submitButtonText()}
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
