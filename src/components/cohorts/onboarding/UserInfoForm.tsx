import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';

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
  InputLabel,
  FormControl,
  Select as MaterialSelect
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import { UploadAvatar } from 'components/upload';
// axios
import axios from 'utils/axios';

type UserInfoType = {
  profile_image_url: File | any;
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  preferred_pronoun: string;
  linkedin_url: string;
};

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

const getOptions = (options: any) =>
  options.map((option: any) => ({
    value: option,
    label: option
  }));

export default function UserInfoForm({
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
  };
}) {
  const [companies, setCompanies] = useState<string[]>();
  const { role_options, industry_options, preferred_pronoun_options } = useSelector(
    (state: RootState) => state.profileOptions
  );

  const fillUserValues = () => ({
    profile_image_url: userProfile?.profile_image_url,
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    country: '',
    city: '',
    preferred_pronoun: userProfile?.preferred_pronoun || '',
    linkedin_url: userProfile?.linkedin_url || ''
  });

  const [infoObject, setInfoObject] = useState<UserInfoType>(fillUserValues());

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       setFieldValue('profile_image_url', {
  //         image: file,
  //         preview: URL.createObjectURL(file)
  //       });
  //     }
  //   },
  //   [setFieldValue]
  // );

  const handleDrop = (files: any) => {
    onUpdateAttribute('profile_image_url', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  const onUpdateAttribute = (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

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
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <UploadAvatar
              accept="image/*"
              file={infoObject?.profile_image_url}
              maxSize={3145728}
              onDrop={handleDrop}
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
            {/* <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {touched.profile_image_url && errors.profile_image_url}
            </FormHelperText> */}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={infoObject?.first_name}
                  onChange={(e) => onUpdateAttribute('first_name', e.target.value)}
                  // error={Boolean(touched.first_name && errors.first_name)}
                  // helperText={touched.first_name && errors.first_name}

                  // inputProps={{
                  //   'data-testid': 'first-name'
                  // }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={infoObject?.last_name}
                  onChange={(e) => onUpdateAttribute('last_name', e.target.value)}

                  // error={Boolean(touched.last_name && errors.last_name)}
                  // helperText={touched.last_name && errors.last_name}
                  // inputProps={{
                  //   'data-testid': 'last-name'
                  // }}
                />
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label="Country"
                    onChange={(e) => onUpdateAttribute('country', e.target.value)}
                  >
                    {companies?.map((name: any) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label="City"
                    onChange={(e) => onUpdateAttribute('city', e.target.value)}
                  >
                    {companies?.map((name: any) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="multiple-checkbox-pronoun-label">Pronouns</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label="Pronouns"
                    labelId="pronoun-label"
                    value={infoObject?.preferred_pronoun}
                    onChange={(e) => onUpdateAttribute('preferred_pronoun', e.target.value)}
                    // id="multiple-checkbox-pronoun"
                    // data-testid="preferred-pronoun"
                    sx={{ zIndex: 1500 }}
                  >
                    {preferred_pronoun_options?.map((pronoun: string) => (
                      <MenuItem key={pronoun} value={pronoun}>
                        <ListItemText primary={pronoun} />
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>

                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  value={infoObject?.linkedin_url}
                  onChange={(e) => onUpdateAttribute('linkedin_url', e.target.value)}
                  // inputProps={{
                  //   'data-testid': 'current-position'
                  // }}
                />
              </Stack>
            </Stack>
            {showSubmitButton && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <StyledLoadingButton type="submit" variant="contained" id="btn-submit">
                  Save Changes
                </StyledLoadingButton>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
