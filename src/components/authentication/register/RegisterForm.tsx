import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import MUICreatableSelect from 'components/MUICreatableSelect';
import axios from 'utils/axios';
// material
import {
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Link,
  Box,
  FormControl
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AUTH } from '../../../routes/paths';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  afterSubmit?: string;
  role: string;
  company: string;
};

type CompanyData = {
  name: string;
  logo_url: string;
  number_of_employees: string;
  industries: string[];
};

export default function RegisterForm({ setFormType }: { setFormType: Function }) {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [companies, setCompanies] = useState<CompanyData[]>([]);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
    role: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Role is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .required('Please retype your password.')
      .oneOf([Yup.ref('password')], 'Your passwords do not match.')
  });

  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.companies && setCompanies(payload.companies);
      });
  }, []);

  const formik = useFormik<InitialValues>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      role: '',
      company: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(values.email, values.password, values.fullName, values.role, values.company);
        enqueueSnackbar('Register success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setFormType('registrationSuccess');
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error: any) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: 'error' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      }
    }
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
    setFieldValue,
    isValid
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4} alignItems="center">
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5">Looks like you’re not logged into Sphere!</Typography>
            <Typography variant="h5">
              Please create an account or log in to add this event to your calendar.
            </Typography>
          </div>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Full Name"
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Role"
              fullWidth
              {...getFieldProps('role')}
              error={Boolean(touched.role && errors.role)}
              helperText={touched.role && errors.role}
            />
            <FormControl data-testid="company-name" fullWidth>
              <MUICreatableSelect
                options={companies?.map((company: CompanyData) => company.name)}
                value={values.company || ''}
                onChange={(value: any) => setFieldValue('company', value)}
                label="Company"
              />
            </FormControl>
          </Stack>
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="on"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              {...getFieldProps('confirmPassword')}
              fullWidth
              autoComplete="on"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isValid}
            sx={{ borderRadius: '35px' }}
          >
            Register
          </LoadingButton>
          <Box>
            Already have an account?&nbsp;
            <Link
              component={RouterLink}
              variant="subtitle2"
              to={PATH_AUTH.login}
              sx={{ textDecoration: 'underline' }}
            >
              Sign in here
            </Link>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
