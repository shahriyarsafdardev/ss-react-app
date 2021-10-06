import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';

// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

type UpdatePasswordFormProps = {
  onSent: VoidFunction;
  onGetPassword: (value: string) => void;
};

export default function UpdatePasswordForm({ onSent, onGetPassword }: UpdatePasswordFormProps) {
  const { updatePassword } = useAuth();
  const url = new URLSearchParams(useLocation().search);

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
        await updatePassword(values.newPassword, url.get('reset_password_token'));
        if (isMountedRef.current) {
          onSent();
          onGetPassword(formik.values.newPassword);
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
  );
}
