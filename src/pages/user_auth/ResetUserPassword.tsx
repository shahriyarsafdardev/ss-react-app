import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { Box, TextField, Container, Typography, Card } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import { LoadingButton } from '@material-ui/lab';
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export default function ResetUserPassword() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const loading = !user?.new_user;
  const [navigate, setNavigate] = useState(loading);
  const newUser: any = { ...user };

  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string()
      .required('Password Confirmation is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async ({ newPassword }, { setSubmitting, resetForm }) => {
      await axios
        .put('/users/first_password_reset.json', { newPassword })
        .then((res) => {
          updateProfile({ ...newUser, new_user: false });
          enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
          setNavigate(true);
          resetForm();
        })
        .catch((error) => {
          enqueueSnackbar('Error in Updating password', { variant: 'error' });
          setSubmitting(false);
        });
    }
  });

  const { errors, values, touched, isValid, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <RootStyle title="Sphere Password Reset">
        {navigate && <Navigate to="/" replace />}
        {loading ? (
          <Box padding="200px">
            <LoadingScreen />
          </Box>
        ) : (
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ p: 5, width: '70%' }}>
              <Box sx={{ my: 5 }}>
                <Typography variant="h4" align="center" paragraph>
                  Reset your password
                </Typography>
              </Box>

              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <TextField
                    sx={{ mb: 4, mt: 2 }}
                    {...getFieldProps('newPassword')}
                    fullWidth
                    autoComplete="on"
                    type="password"
                    label="New Password"
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />

                  <TextField
                    sx={{ mb: 4 }}
                    {...getFieldProps('confirmNewPassword')}
                    fullWidth
                    autoComplete="on"
                    type="password"
                    label="Confirm New Password"
                    error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                    helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    disabled={!isValid || !values.newPassword || !values.confirmNewPassword}
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Reset Password
                  </LoadingButton>
                </Form>
              </FormikProvider>
            </Card>
          </Container>
        )}
      </RootStyle>
    </>
  );
}
