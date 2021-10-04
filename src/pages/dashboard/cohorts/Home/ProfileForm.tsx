import { useState, useCallback, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';

import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  ListItemText,
  FormHelperText,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import Label from 'components/Label';
import { UploadAvatar } from '../../../../components/upload';
// utils
import { fData } from '../../../../utils/formatNumber';

// axios
import axios from '../../../../utils/axios';

interface InitialState {
  linkedin_url: string;
  discord_url?: string;
  first_name: string;
  last_name: string;
  current_company?: string;
  current_position?: string;
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
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const StyledSelect = styled(Select)(({ theme }) => ({
  maxWidth: '48.5%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 'unset'
  }
}));

const customStyles = {
  container: (provided: any, state: any) => ({
    ...provided,
    width: '100%',
    height: '29px',
    marginBottom: '24px !important'
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    height: '55px',
    borderRadius: '6px',
    borderColor: state.isFocused ? '1939B7' : '#CFD8DC',
    ':hover': {
      borderColor: '#071A33',
      borderRadius: 8
    }
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#1939B7',
    fontWeight: 'bold',
    fontSize: '0.75rem'
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none'
  })
};

const greenCustomsStyle = {
  ...customStyles,
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: 'rgba(84, 214, 44, 0.24)',
    height: 22,
    borderRadius: '8px'
  })
};

const blueCustomsStyle = {
  ...customStyles,
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: 'rgba(51, 102, 255, 0.16)',
    height: 22,
    borderRadius: '8px'
  })
};

export default function ProfileForm({
  onSubmit,
  userProfile
}: {
  onSubmit: Function;
  userProfile?: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: File | any;
    current_company: string;
    current_position: string;
    strengths: string[];
    interests: string[];
  };
}) {
  const [strengths, setStrengths] = useState<string[]>();
  const [interests, setInterests] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>();
  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required')
  });

  const interestOptions = interests?.map((interest) => ({ value: interest, label: interest }));
  const strengthsOptions = strengths?.map((strength) => ({ value: strength, label: strength }));

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: userProfile || {
      linkedin_url: '',
      discord_url: '',
      first_name: '',
      last_name: '',
      current_company: '',
      current_position: '',
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

  const defaultInterests = values.interests?.map((interest) => ({
    value: interest,
    label: interest
  }));

  const defaultStrengths = values.strengths?.map((strength) => ({
    value: strength,
    label: strength
  }));

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('profile_image_url', {
          image: file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.strengths && setStrengths(payload.strengths);
        payload?.companies && setCompanies(payload.companies);
        payload?.interests && setInterests(payload.interests);
      });
  }, []);

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
              <Card sx={{ p: 3, height: 1 }}>
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
                    <FormControl fullWidth>
                      <InputLabel id="multiple-checkbox-company-label">Company</InputLabel>
                      <Select
                        fullWidth
                        label="Company"
                        labelId="company-label"
                        id="multiple-checkbox-company"
                        {...getFieldProps('current_company')}
                      >
                        {companies?.map((name: any) => (
                          <MenuItem key={name} value={name}>
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Current position"
                      {...getFieldProps('current_position')}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label="Linkedin Url"
                    {...getFieldProps('linkedin_url')}
                    error={Boolean(touched.linkedin_url && errors.linkedin_url)}
                    helperText={touched.linkedin_url && errors.linkedin_url}
                  />
                  <TextField
                    fullWidth
                    label="Discord Url"
                    {...getFieldProps('discord_url')}
                    error={Boolean(touched.linkedin_url && errors.linkedin_url)}
                    helperText={touched.linkedin_url && errors.linkedin_url}
                  />
                  <CreatableSelect
                    defaultValue={defaultInterests}
                    styles={blueCustomsStyle}
                    options={interestOptions}
                    isClearable={true}
                    backspaceRemovesValue={true}
                    isMulti
                    isSearchable
                    onChange={(selected) => {
                      setFieldValue(
                        'interests',
                        Array.isArray(selected) ? selected.map((s) => s.value) : []
                      );
                    }}
                  />
                  <CreatableSelect
                    defaultValue={defaultStrengths}
                    styles={greenCustomsStyle}
                    options={strengthsOptions}
                    isClearable={true}
                    backspaceRemovesValue={true}
                    isMulti
                    isSearchable
                    onChange={(selected) => {
                      setFieldValue(
                        'strengths',
                        Array.isArray(selected) ? selected.map((s) => s.value) : []
                      );
                    }}
                  />
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
