import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import useAuth from '../../../../hooks/useAuth';
// utils
import fakeRequest from '../../../../utils/fakeRequest';

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { changePassword } = useAuth();
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      changePassword(values.newPassword);
      setSubmitting(false);
      resetForm();
      enqueueSnackbar('Profile has been updated', { variant: 'success' });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              inputProps={{
                'data-testid': 'new-password'
              }}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
              inputProps={{
                'data-testid': 'confirm-new-password'
              }}
            />

            <StyledButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              data-testid="btn-submit-change-password"
            >
              Save Changes
            </StyledButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
