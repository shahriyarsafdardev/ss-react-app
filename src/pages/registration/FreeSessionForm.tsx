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
import axios from 'utils/axios';
import { useStyles } from './styles';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function FreeSessionForm({
  email,
  cohort_id
}: {
  email: string;
  cohort_id: string;
}) {
  const classes = useStyles();

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: '',
      last_name: '',
      current_company: '',
      current_role: '',
      email,
      cohort_id
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      console.log(values);
      await axios
        .post('/free-session-info', { values })
        .then((res) => {
          if (res.data.status === 'saved') {
            document.location.href = '/free-session-message';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, values } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          id="free-session-form"
          noValidate
          onSubmit={handleSubmit}
          className={classes.freeSessionForm}
        >
          <Grid container spacing={1}>
            <Grid item sx={{ m: 'auto', width: '100%' }}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
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
                      id="current_company"
                      {...getFieldProps('current_company')}
                      label="Company Name"
                      inputProps={{
                        'data-testid': 'company-name'
                      }}
                    />
                    <TextField
                      fullWidth
                      id="current_role"
                      label="Current Role"
                      {...getFieldProps('current_role')}
                      inputProps={{
                        'data-testid': 'current-role'
                      }}
                    />
                  </Stack>
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    id="btn-submit"
                    className={classes.btnSubmit}
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
