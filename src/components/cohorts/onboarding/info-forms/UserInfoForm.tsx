import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';
import { countries, getCitiesByCountryCode } from 'country-city-location';
import MUICreatableSelect from 'components/MUICreatableSelect';

import {
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

import { UploadAvatar } from 'components/upload';
import { NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

type UserInfoType = {
  profile_image_url: File | any;
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  preferred_pronoun: string;
  linkedin_url: string;
  github_username: string;
};

export default function UserInfoForm({
  cohortCode,
  onSubmit,
  userProfile
}: {
  cohortCode: string;
  onSubmit: Function;
  userProfile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: File | any;
    preferred_pronoun: string;
    country: string;
    city: string;
    github_username: string;
  };
}) {
  const { preferred_pronoun_options } = useSelector((state: RootState) => state.profileOptions);
  const [citiesList, setCityList] = useState<string[]>([]);
  const HUGGING_FACE_COHORT_CODE = 'HPT';
  useEffect(() => {
    if (userProfile.country) {
      setCities(userProfile.country);
    }
  }, []);

  const setCities = (country: string) => {
    const countryCode = countries.find(
      (countryItem: any) => countryItem.Name === country
    )?.Alpha2Code;
    if (countryCode) {
      setCityList(
        getCitiesByCountryCode(countryCode)
          ?.map((city: any) => city.name)
          .sort() || []
      );
    } else {
      setCityList([]);
    }
  };

  const fillUserValues = () => ({
    profile_image_url: userProfile?.profile_image_url,
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    country: userProfile?.country,
    city: userProfile?.city,
    preferred_pronoun: userProfile?.preferred_pronoun || '',
    linkedin_url: userProfile?.linkedin_url || '',
    github_username: userProfile?.github_username || ''
  });

  const [infoObject, setInfoObject] = useState<UserInfoType>(fillUserValues());

  const handleDrop = (files: any) => {
    onUpdateAttribute('profile_image_url', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  const onUpdateAttribute = async (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  const onUpdateAttributeGroup = (data: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, ...data };
    setInfoObject(tempInfo);
  };

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Card data-testid="user-avatar-upload" sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <UploadAvatar
              accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
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
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  inputProps={{ 'data-testid': 'user-first-name' }}
                  fullWidth
                  label="First Name"
                  value={infoObject?.first_name}
                  onChange={(e) => onUpdateAttribute('first_name', e.target.value)}
                />
                <TextField
                  inputProps={{ 'data-testid': 'user-last-name' }}
                  fullWidth
                  label="Last Name"
                  value={infoObject?.last_name}
                  onChange={(e) => onUpdateAttribute('last_name', e.target.value)}
                />
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  {cohortCode === HUGGING_FACE_COHORT_CODE ? (
                    <TextField
                      inputProps={{ 'data-testid': 'github-username' }}
                      fullWidth
                      label="Github Username"
                      value={infoObject?.github_username}
                      onChange={(e) => onUpdateAttribute('github_username', e.target.value)}
                    />
                  ) : (
                    <>
                      <InputLabel id="multiple-checkbox-pronoun-label">Pronouns</InputLabel>
                      <MaterialSelect
                        data-testid="user-pronoun-label"
                        fullWidth
                        label="Pronouns"
                        labelId="pronoun-label"
                        value={infoObject?.preferred_pronoun}
                        onChange={(e) => onUpdateAttribute('preferred_pronoun', e.target.value)}
                        sx={{ zIndex: 1500 }}
                      >
                        {preferred_pronoun_options?.map((pronoun: string) => (
                          <MenuItem key={pronoun} value={pronoun}>
                            <ListItemText primary={pronoun} />
                          </MenuItem>
                        ))}
                      </MaterialSelect>
                    </>
                  )}
                </FormControl>

                <TextField
                  inputProps={{ 'data-testid': 'user-linkedIn-url' }}
                  fullWidth
                  label="LinkedIn URL"
                  value={infoObject?.linkedin_url}
                  onChange={(e) => onUpdateAttribute('linkedin_url', e.target.value)}
                />
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl data-testid="user-country" fullWidth>
                  <MUICreatableSelect
                    options={countries.map((countary: any) => countary.Name)}
                    value={infoObject?.country || ''}
                    onChange={(value: string) => {
                      onUpdateAttributeGroup({ country: value, city: '' });
                      setCities(value || '');
                    }}
                    label="Country"
                    isCreatable={false}
                  />
                </FormControl>

                <FormControl data-testid="user-city" fullWidth>
                  <MUICreatableSelect
                    options={citiesList}
                    value={infoObject?.city || ''}
                    onChange={(value: any) => onUpdateAttribute('city', value)}
                    label="City"
                    isCreatable={false}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={false}
        disabled={checkFormValidity(infoObject, cohortCode)}
        onPreviousHandler={() => {}}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
