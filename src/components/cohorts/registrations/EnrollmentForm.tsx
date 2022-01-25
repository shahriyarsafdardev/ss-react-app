import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  FormControl,
  MenuItem,
  ListItemText,
  InputLabel,
  Select as MaterialSelect
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import { Enrollment, ReferralCode } from '../../../@types/cohorts';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function EnrollmentForm({
  enrollment,
  codes,
  onClose,
  onSubmit
}: {
  onClose: Function;
  codes: ReferralCode[];
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
    linkedin_url: Yup.string().url('Must be a valid URL'),
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

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, values } = formik;

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
                    <FormControl fullWidth>
                      <InputLabel>Referral Code</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label="Referral Code"
                        sx={{ zIndex: 1500 }}
                        {...getFieldProps('coupon_code')}
                      >
                        {codes?.map((code: ReferralCode) => (
                          <MenuItem key={code.code} value={code.code}>
                            <ListItemText primary={code.code} />
                          </MenuItem>
                        ))}
                      </MaterialSelect>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      id="referrer_benefit"
                      label="Referrer Benefit"
                      value={
                        codes.filter((code) => code.code === values.coupon_code)[0]
                          ?.referrer_benefit
                      }
                      defaultValue={
                        codes.filter((code) => code.code === values.coupon_code)[0]
                          ?.referrer_benefit
                      }
                      inputProps={{
                        readOnly: true,
                        'data-testid': 'referrer_benefit'
                      }}
                    />
                    <TextField
                      fullWidth
                      id="referee_benefit"
                      label="Referee Benefit"
                      value={
                        codes.filter((code) => code.code === values.coupon_code)[0]?.referee_benefit
                      }
                      defaultValue={
                        codes.filter((code) => code.code === values.coupon_code)[0]
                          ?.referrer_benefit
                      }
                      inputProps={{
                        readOnly: true,
                        'data-testid': 'referee_benefit'
                      }}
                    />
                  </Stack>
                  <Stack width="100%" spacing={2}>
                    <TextField
                      fullWidth
                      id="notes"
                      multiline
                      minRows={3}
                      label="Notes"
                      {...getFieldProps('notes')}
                      error={Boolean(touched.notes && errors.notes)}
                      helperText={touched.notes && errors.notes}
                      inputProps={{
                        'data-testid': 'notes'
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
