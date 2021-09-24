import * as Yup from 'yup';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, Typography, FormHelperText } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { styled } from '@material-ui/core/styles';
import { UploadAvatar } from '../../../../components/upload';
// utils
import { fData } from '../../../../utils/formatNumber';

interface InitialState {
  email: string;
  first_name: string;
  last_name: string;
  current_company?: string;
  interests: string[];
  strengths: string[];
  profile_image_url: File | any;
}
const Title = styled(Typography)(() => ({
  fontSize: 24,
  color: '#071A33',
  fontWeight: 'bold',
  marginTop: '3rem',
  marginBottom: '2rem'
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 100,
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function ProfileForm({
  onSubmit,
  userProfile
}: {
  onSubmit: Function;
  userProfile?: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image_url: string;
    current_company: string;
    strengths: string[];
    interests: string[];
  };
}) {
  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: userProfile || {
      email: '',
      first_name: '',
      last_name: '',
      current_company: '',
      profile_image_url: null,
      interests: [],
      strengths: []
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('profile_image_url', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <Title>Build your profile</Title>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.profile_image_url}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.profile_image_url && errors.profile_image_url)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.profile_image_url && errors.profile_image_url}
                </FormHelperText>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      {...getFieldProps('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      {...getFieldProps('last_name')}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <StyledLoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Save
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
