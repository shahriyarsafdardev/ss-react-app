import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import { Enrollment } from '../../../@types/cohorts';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function EnrollmentForm({
  enrollment,
  onClose,
  onSubmit
}: {
  onClose: Function;
  enrollment: Enrollment;
  onSubmit: Function;
}) {
  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    price: Yup.number().required('Price required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required')
  });

  const formik = useFormik<Enrollment>({
    enableReinitialize: true,
    initialValues: enrollment,
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <br />
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="enrollment-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item sx={{ m: 'auto', width: '100%' }}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <h3 style={{ marginBottom: '1rem' }}>Applicant Details</h3>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      id="first_name"
                      {...getFieldProps('first_name')}
                      label="First Name"
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      inputProps={{
                        'data-testid': 'first-name'
                      }}
                    />
                    <TextField
                      fullWidth
                      id="last_name"
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
                      id="email"
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
                      label="LinkedIn"
                      id="linkedin_url"
                      {...getFieldProps('linkedin_url')}
                      error={Boolean(touched.linkedin_url && errors.linkedin_url)}
                      helperText={touched.linkedin_url && errors.linkedin_url}
                      inputProps={{
                        'data-testid': 'linkedin-url'
                      }}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="price"
                      id="price"
                      {...getFieldProps('price')}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                      inputProps={{
                        'data-testid': 'price',
                        type: 'number'
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Coupon Code"
                      id="coupon_code"
                      {...getFieldProps('coupon_code')}
                      error={Boolean(touched.coupon_code && errors.coupon_code)}
                      helperText={touched.coupon_code && errors.coupon_code}
                      inputProps={{
                        'data-testid': 'coupon-code'
                      }}
                    />
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    width={{ xs: '100%', md: '49%' }}
                    spacing={2}
                  >
                    <TextField
                      fullWidth
                      id="stream"
                      label="Stream (ie Timezone)"
                      {...getFieldProps('stream')}
                      error={Boolean(touched.stream && errors.stream)}
                      helperText={touched.stream && errors.stream}
                      inputProps={{
                        'data-testid': 'stream'
                      }}
                    />
                  </Stack>
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    id="btn-submit"
                  >
                    Save Changes
                  </StyledLoadingButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
