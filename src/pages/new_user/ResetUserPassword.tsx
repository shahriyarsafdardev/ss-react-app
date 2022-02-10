import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { Box, Stack, TextField, Alert, Button, Container, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import { LoadingButton } from '@material-ui/lab';
import useIsMountedRef from 'hooks/useIsMountedRef';
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const isMountedRef = useIsMountedRef();
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
      afterSubmit: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        // api call to update password in backend and update user profile
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle title="ScholarSite Cohort Registration">
      {loading ? (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Stack width="100%" display="flex" flexDirection="column" alignItems="center">
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" align="center" paragraph>
                Reset your password
              </Typography>
              <Typography align="center" sx={{ color: 'text.secondary' }}>
                We review each application in order to ensure a diverse and experienced cohort!
              </Typography>
            </Box>

            <Stack alignContent="center" width="100%" alignItems="center">
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                    <TextField
                      {...getFieldProps('newPassword')}
                      fullWidth
                      autoComplete="on"
                      type="password"
                      label="New Password"
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />

                    <TextField
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
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Reset Password
                    </LoadingButton>
                  </Stack>
                </Form>
              </FormikProvider>
            </Stack>
          </Stack>
        </Container>
      )}
    </RootStyle>
  );
}
