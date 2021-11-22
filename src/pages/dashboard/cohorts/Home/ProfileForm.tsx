import { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { RootState, useSelector } from 'redux/store';

import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  MenuItem,
  ListItemText,
  FormHelperText,
  InputLabel,
  FormControl,
  Select as MaterialSelect
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import { UploadAvatar } from '../../../../components/upload';
// axios
import axios from '../../../../utils/axios';
import MultiSelect from '../../../../components/MultiSelect';

interface InitialState {
  linkedin_url: string;
  discord_url?: string;
  first_name: string;
  last_name: string;
  current_company?: string;
  preferred_pronoun?: string;
  current_position?: string;
  profile_image_url: File | any;
  bio_text: string;
  current_role_category_selections: string[];
  current_industry_category_selections: string[];
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const customStyles = {
  placeholder: (provided: any, state: any) => ({
    display: state.isFocused ? 'none' : 'block',
    color: 'rgb(128, 128, 128)'
  })
};

const greenCustomsStyle = {
  ...customStyles
};

const blueCustomsStyle = {
  ...customStyles
};

const getOptions = (options: any) =>
  options.map((option: any) => ({
    value: option,
    label: option
  }));

export default function ProfileForm({
  onSubmit,
  showSubmitButton = true,
  userProfile,
  isOnboardingModal = false
}: {
  showSubmitButton?: boolean;
  onSubmit: Function;
  isOnboardingModal: boolean;
  userProfile?: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    discord_url: string;
    profile_image_url: File | any;
    current_company: string;
    preferred_pronoun: string;
    current_position: string;
    strengths: string[];
    current_role_category_selections: string[];
    current_industry_category_selections: string[];
    interests: string[];
    bio_text: string;
    opted_in_for_matching_suggestions: boolean;
    networking_matching_preferences: string[];
    is_interested_in_mentoring: boolean;
  };
}) {
  const [companies, setCompanies] = useState<string[]>();
  const { role_options, industry_options, preferred_pronoun_options } = useSelector(
    (state: RootState) => state.profileOptions
  );

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required')
  });

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: userProfile || {
      linkedin_url: '',
      discord_url: '',
      first_name: '',
      last_name: '',
      current_company: '',
      preferred_pronoun: '',
      current_position: '',
      profile_image_url: null,
      interests: [],
      current_role_category_selections: [],
      current_industry_category_selections: [],
      strengths: [],
      bio_text: '',
      opted_in_for_matching_suggestions: false,
      networking_matching_preferences: [],
      is_interested_in_mentoring: false
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

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
        payload?.companies && setCompanies(payload.companies);
      });
  }, []);

  return (
    <>
      <br />
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
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
                      Profile Picture
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.profile_image_url && errors.profile_image_url}
                </FormHelperText>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      {...getFieldProps('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      inputProps={{
                        'data-testid': 'first-name'
                      }}
                    />
                    <TextField
                      fullWidth
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
                    <FormControl fullWidth>
                      <InputLabel id="multiple-checkbox-pronoun-label">
                        Preferred Pronouns
                      </InputLabel>
                      <MaterialSelect
                        fullWidth
                        label="Preferred Pronouns"
                        labelId="pronoun-label"
                        id="multiple-checkbox-pronoun"
                        data-testid="preferred-pronoun"
                        sx={{ zIndex: 1500 }}
                        {...getFieldProps('preferred_pronoun')}
                      >
                        {preferred_pronoun_options?.map((pronoun: string) => (
                          <MenuItem key={pronoun} value={pronoun}>
                            <ListItemText primary={pronoun} />
                          </MenuItem>
                        ))}
                      </MaterialSelect>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="multiple-checkbox-company-label">Current Company</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label="Current Company"
                        labelId="company-label"
                        id="multiple-checkbox-company"
                        data-testid="current-company"
                        {...getFieldProps('current_company')}
                      >
                        {companies?.map((name: any) => (
                          <MenuItem key={name} value={name}>
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </MaterialSelect>
                    </FormControl>
                  </Stack>
                  <TextField
                    fullWidth
                    label="Current role"
                    {...getFieldProps('current_position')}
                    inputProps={{
                      'data-testid': 'current-position'
                    }}
                  />
                  {!isOnboardingModal && (
                    <>
                      <TextField
                        fullWidth
                        label="Personal Bio"
                        {...getFieldProps('bio_text')}
                        error={Boolean(touched.bio_text && errors.bio_text)}
                        helperText={touched.bio_text && errors.bio_text}
                        multiline
                        rows={4}
                        inputProps={{
                          'data-testid': 'user-introduction'
                        }}
                      />
                      <Stack direction={{ xs: 'column' }} spacing={1}>
                        <Typography>Which categories best describe my current role?</Typography>
                        <MultiSelect
                          options={role_options}
                          values={values.current_role_category_selections}
                          onChange={(e: any) =>
                            setFieldValue('current_role_category_selections', e)
                          }
                          maxLimit={2}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column' }} spacing={1}>
                        <Typography>
                          Which categories best describe the industry I currently work in?
                        </Typography>
                        <MultiSelect
                          options={industry_options}
                          values={values.current_industry_category_selections}
                          onChange={(e: any) =>
                            setFieldValue('current_industry_category_selections', e)
                          }
                          maxLimit={5}
                        />
                      </Stack>
                    </>
                  )}
                </Stack>
                {showSubmitButton && (
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
                )}
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
