/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { RootState, useSelector } from 'redux/store';
import { Modal } from 'components/animate';
import { CompanyInfoForm } from 'components/cohorts/onboarding/info-forms';
import { useSnackbar } from 'notistack5';

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
import useAuth from 'hooks/useAuth';
import { UploadAvatar } from '../../../../components/upload';
// axios
import axios from '../../../../utils/axios';
import MultiSelect from '../../../../components/MultiSelect';

const CompanyModalContainer = styled('div')(() => ({
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  display: 'flex',
  alignItems: 'center',
  img: {
    height: '30px',
    width: '30px',
    borderRadius: '25px',
    marginRight: '10px'
  },
  div: {
    marginLeft: 'auto',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

interface InitialState {
  linkedin_url: string;
  email: string;
  discord_url?: string;
  first_name: string;
  last_name: string;
  current_company?: string;
  preferred_pronoun?: string;
  current_position?: string;
  profile_image_url: File | any;
  bio_text: string;
  current_role_category_selections: string[];
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
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
    email: string;
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
    new_user: boolean;
    opted_in_for_matching_suggestions: boolean;
    networking_matching_preferences: [];
    company_image_url: string;
    number_of_employees: string;
  };
}) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { updateProfile } = useAuth();

  const { role_options, preferred_pronoun_options } = useSelector(
    (state: RootState) => state.profileOptions
  );

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    email: Yup.string().email().required('Email is required')
  });

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: userProfile || {
      linkedin_url: '',
      email: '',
      discord_url: '',
      first_name: '',
      last_name: '',
      current_company: '',
      preferred_pronoun: '',
      current_position: '',
      profile_image_url: null,
      current_role_category_selections: [],
      bio_text: ''
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
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

  const companyLabel = () => (
    <CompanyModalContainer>
      <img src={userProfile?.company_image_url || ''} alt="company-logo" />
      {userProfile?.current_company}
      <div onClick={() => setModal(true)}>Edit</div>
    </CompanyModalContainer>
  );

  const onSaveCompanyInfo = async (data: any) => {
    setLoading(true);
    const companyData = new FormData();
    data?.logo_url?.image && companyData.append('company_logo_image', data?.logo_url?.image);
    companyData.append('current_company', data?.name);
    companyData.append('company_industries', data?.industries);
    companyData.append('number_of_employees', data?.number_of_employees);

    await axios
      .post('/users/update_company_profile', companyData)
      .then((response) => {
        if (response.status === 200) {
          setModal(false);
          enqueueSnackbar(response.data.message, { variant: 'success' });
          updateProfile({ ...response.data.user });
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
        setLoading(false);
      });
  };

  const companySettingsModal = () => (
    <Modal open={modal} onClose={() => setModal(false)}>
      <CompanyInfoForm
        onSubmit={(data: any) => {
          onSaveCompanyInfo(data);
        }}
        showPrevButton={false}
        onPrevHandler={() => {}}
        isSubmitable={true}
        isSubmitting={loading}
        companyProfile={{
          name: userProfile?.current_company || '',
          logo_url: userProfile?.company_image_url || '',
          industries: userProfile?.current_industry_category_selections || [],
          number_of_employees: userProfile?.number_of_employees || ''
        }}
      />
    </Modal>
  );

  return (
    <>
      <br />
      {modal && companySettingsModal()}
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                <UploadAvatar
                  accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
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
                      <InputLabel id="multiple-checkbox-pronoun-label">Pronouns</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label="Pronouns"
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
                    <TextField
                      inputProps={{
                        'data-testid': 'email'
                      }}
                      fullWidth
                      label="Email"
                      type="email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      inputProps={{
                        'data-testid': 'linkedin_url'
                      }}
                      fullWidth
                      label="LinkedIn URL"
                      {...getFieldProps('linkedin_url')}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Current role"
                      {...getFieldProps('current_position')}
                      inputProps={{
                        'data-testid': 'current-position'
                      }}
                    />
                    <FormControl fullWidth>{companyLabel()}</FormControl>
                  </Stack>

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
                        <MultiSelect
                          options={role_options}
                          values={values.current_role_category_selections}
                          onChange={(e: any) =>
                            setFieldValue('current_role_category_selections', e)
                          }
                          maxLimit={2}
                          label="Which categories best describe your current role?"
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
