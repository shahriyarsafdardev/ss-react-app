import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';
import { countries, getCitiesByCountryCode } from 'country-city-location';

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
import { NavigationButtons, checkFormValidity } from './dataTypes';

type UserInfoType = {
  profile_image_url: File | any;
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  preferred_pronoun: string;
  linkedin_url: string;
};

export default function UserInfoForm({
  onSubmit,
  userProfile
}: {
  onSubmit: Function;
  userProfile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: File | any;
    preferred_pronoun: string;
    country: string;
    city: string;
  };
}) {
  const { preferred_pronoun_options } = useSelector((state: RootState) => state.profileOptions);
  const [citiesList, setCityList] = useState<string[]>([]);

  useEffect(() => {
    if (userProfile.country) {
      setCities(userProfile.country);
    }
  }, []);

  const setCities = (country: string) => {
    const countryCode = countries.find(
      (countryItem: any) => countryItem.Name === country
    )?.Alpha2Code;
    setCityList(getCitiesByCountryCode(countryCode)?.map((city: any) => city.name) || []);
  };

  const fillUserValues = () => ({
    profile_image_url: userProfile?.profile_image_url,
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    country: userProfile?.country,
    city: userProfile?.city,
    preferred_pronoun: userProfile?.preferred_pronoun || '',
    linkedin_url: userProfile?.linkedin_url || ''
  });

  const [infoObject, setInfoObject] = useState<UserInfoType>(fillUserValues());

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

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Card data-testid="user-avatar-upload" sx={{ py: 10, px: 3, textAlign: 'center' }}>
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
                  <InputLabel>Country</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label="Country"
                    onChange={(e) => {
                      onUpdateAttribute('country', e.target.value);
                      onUpdateAttribute('city', '');
                      setCities(e.target.value);
                    }}
                    defaultValue={userProfile.country}
                    inputProps={{ 'data-testid': 'user-country' }}
                  >
                    {countries.map((country: any) => (
                      <MenuItem key={country.Name} value={country.Name}>
                        <ListItemText primary={country.Name} />
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
                    defaultValue={userProfile.city}
                    inputProps={{ 'data-testid': 'user-city' }}
                  >
                    {citiesList?.length > 0 ? (
                      citiesList.map((city: any) => (
                        <MenuItem key={city} value={city}>
                          <ListItemText primary={city} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        <ListItemText primary="Please select a country first" />
                      </MenuItem>
                    )}
                  </MaterialSelect>
                </FormControl>
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
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
                </FormControl>

                <TextField
                  data-testid="user-linkedIn-url"
                  fullWidth
                  label="LinkedIn URL"
                  value={infoObject?.linkedin_url}
                  onChange={(e) => onUpdateAttribute('linkedin_url', e.target.value)}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={false}
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={() => {}}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
