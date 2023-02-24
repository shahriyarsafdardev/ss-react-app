import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Link,
  Stack,
  Alert,
  TextField,
  Checkbox,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// routes
import { GENERIC_EVENTS, ONBOARDING_EVENTS, trackOnboardingEvent } from 'utils/amplitude';
// hooks
import { PATH_AUTH } from 'routes/paths';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------
type InitialValues = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};
export default function ModalLoginForm({ setFormType }: { setFormType: Function }) {
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [color, setColor] = useState<any>('error');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await login(values.email, values.password).then((res) => {
          trackOnboardingEvent(null, ONBOARDING_EVENTS.event_type, {
            [GENERIC_EVENTS.cohort_name]: '',
            [GENERIC_EVENTS.cohort_intake_number]: '',
            [ONBOARDING_EVENTS.event]: 'Onboarding Event',
            [ONBOARDING_EVENTS.category]: 'First Login',
            [ONBOARDING_EVENTS.description]: 'User has logged in on portal.'
          });
        });
        enqueueSnackbar('Login success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error: any) {
        console.error(error);
        values.password = '';
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
        if (error.color) {
          setColor(error.color);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4} alignItems="center">
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5">Log in to Sphere</Typography>
          </div>
          {errors.afterSubmit && <Alert severity={color}>{errors.afterSubmit}</Alert>}

          <Stack width="100%" spacing={2}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              inputProps={{
                'data-testid': 'email'
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              inputProps={{
                'data-testid': 'password',
                endadornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />

            <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
              Forgot password?
            </Link>
          </Stack>
          <LoadingButton
            data-testid="loginBtn"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ width: '100%', height: '46px', borderRadius: '30px' }}
          >
            Login
          </LoadingButton>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
            alignItems="center"
            justifyContent="center"
            sx={{ m: 'auto', cursor: 'pointer' }}
          >
            New to Sphere?&nbsp;
            <Link
              variant="subtitle2"
              sx={{ textDecoration: 'underline' }}
              onClick={() => setFormType()}
            >
              Create a free account
            </Link>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
