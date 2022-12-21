import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Grid,
  Card,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  Select as MaterialSelect
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { uniq } from 'lodash';
import Page from 'components/Page';
import { RootState, useSelector } from '../../redux/store';
import axios from '../../utils/axios';

interface Waitlist {
  firstName: string;
  lastName: string;
  email: string;
  cohortCode: string;
}

const StyledForm = styled(Form)(({ theme }) => ({
  width: '80%',
  maxHeight: '80vh',
  maxWidth: '1232px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  }
}));

function WaitlistForm() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { enqueueSnackbar } = useSnackbar();

  const cohortCodes = () =>
    uniq(cohorts.map((cohort) => cohort.code)).sort((a, b) => a.localeCompare(b));

  const WaitlistSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    cohortCode: Yup.string().required('CohortCode is required')
  });

  const formik = useFormik<Waitlist>({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      cohortCode: ''
    },
    validationSchema: WaitlistSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const uploadData = new FormData();
        uploadData.append('first_name', values.firstName);
        uploadData.append('last_name', values.lastName);
        uploadData.append('email', values.email);
        uploadData.append('cohort_code', values.cohortCode);
        await axios.post('/enrollments/add_waitlist.json', uploadData);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('User added to waitlist', { variant: 'success' });
      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    }
  });

  const { isSubmitting, handleSubmit, getFieldProps, setFieldValue, isValid, touched, errors } =
    formik;

  return (
    <Page title="Sphere | Waitlist Form">
      <br />
      <FormikProvider value={formik}>
        <StyledForm autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      label="First Name"
                      fullWidth
                      {...getFieldProps('firstName')}
                      inputProps={{
                        'data-testid': 'firstName'
                      }}
                      error={Boolean(touched.firstName && errors.firstName)}
                      onChange={(e: any) => setFieldValue('firstName', e.target.value)}
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      {...getFieldProps('lastName')}
                      inputProps={{
                        'data-testid': 'lastName'
                      }}
                      error={Boolean(touched.lastName && errors.lastName)}
                      onChange={(e: any) => setFieldValue('lastName', e.target.value)}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      label="Email"
                      fullWidth
                      type="email"
                      {...getFieldProps('email')}
                      inputProps={{
                        'data-testid': 'email'
                      }}
                      error={Boolean(touched.email && errors.email)}
                      onChange={(e: any) => setFieldValue('email', e.target.value)}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Cohort Code</InputLabel>
                      <MaterialSelect
                        label="Cohort Code"
                        fullWidth
                        data-testid="cohortCode"
                        error={Boolean(touched.cohortCode && errors.cohortCode)}
                      >
                        {cohortCodes().map((code, index) => (
                          <MenuItem
                            key={index}
                            value={code}
                            onClick={() => {
                              setFieldValue('cohortCode', code);
                            }}
                          >
                            {' '}
                            {code}
                          </MenuItem>
                        ))}
                      </MaterialSelect>
                    </FormControl>
                  </Stack>
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton
                    size="large"
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    loading={isSubmitting}
                    id="btn-submit"
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </StyledForm>
      </FormikProvider>
    </Page>
  );
}

export default WaitlistForm;
