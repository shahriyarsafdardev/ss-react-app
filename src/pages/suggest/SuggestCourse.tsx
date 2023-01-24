import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, Typography, Alert, Container } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Page from 'components/Page';
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  fullName: string;
  suggestion: string;
  afterSubmit?: string;
  title: string;
  company: string;
};

export default function SuggestCourse({ setFormType }: { setFormType: Function }) {
  const { isAuthenticated } = useAuth();

  const RegisterSchema = Yup.object().shape({
    suggestion: Yup.string().required('Suggestion is required'),
    fullName: Yup.string().when([], {
      is: () => !isAuthenticated,
      then: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
      otherwise: Yup.string().notRequired()
    }),
    email: Yup.string().when([], {
      is: () => !isAuthenticated,
      then: Yup.string().email('Email must be a valid email address').required('Email is required'),
      otherwise: Yup.string().notRequired()
    }),
    title: Yup.string().when([], {
      is: () => !isAuthenticated,
      then: Yup.string().required('Title is required'),
      otherwise: Yup.string().notRequired()
    }),
    company: Yup.string().when([], {
      is: () => !isAuthenticated,
      then: Yup.string().required('Company name is required'),
      otherwise: Yup.string().notRequired()
    })
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      fullName: '',
      email: '',
      suggestion: '',
      title: '',
      company: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {}
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid } = formik;

  return (
    <Page title="Sphere | Suggest a Course">
      <Container sx={{ padding: '50px' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack sx={{ marginBottom: '32px' }} spacing={1}>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                Suggest a course
              </Typography>
              <Typography sx={{ fontSize: '16px' }}>
                We are always looking to expand our course offerings to address learners’
                professional development needs.
              </Typography>
            </Stack>
            <Stack spacing={3} alignItems="center">
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              {!isAuthenticated && (
                <>
                  <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...getFieldProps('fullName')}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                  <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Title"
                      {...getFieldProps('title')}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />

                    <TextField
                      fullWidth
                      label="Company"
                      {...getFieldProps('company')}
                      error={Boolean(touched.company && errors.company)}
                      helperText={touched.company && errors.company}
                    />
                  </Stack>
                </>
              )}
              <TextField
                fullWidth
                multiline
                label="Tell us about your course idea"
                rows={4}
                {...getFieldProps('suggestion')}
                error={Boolean(touched.suggestion && errors.suggestion)}
                helperText={touched.suggestion && errors.suggestion}
              />
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                disabled={!isValid}
                loading={isSubmitting}
                sx={{ borderRadius: '35px', width: '50%' }}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
