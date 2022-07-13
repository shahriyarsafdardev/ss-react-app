import { useState } from 'react';

// material
import {
  Grid,
  Card,
  Stack,
  InputLabel,
  TextField,
  FormControl,
  MenuItem,
  ListItemText,
  Select as MaterialSelect
} from '@material-ui/core';
import { HouseKeepingInfoType, NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

const COHORT_UNDERSTADING_OPTIONS = [
  'No Experience',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

const REFERRER_OPTIONS = [
  'Google Search',
  'Email Marketing',
  'Social Media',
  'Recommended by a friend or colleague',
  'Personally invited by someone in the Sphere team',
  'Other'
];

const PAYING_OPTIONS = ['I am', 'My employer', 'Other'];

export default function HouseKeepingForm({
  onSubmit,
  infoDetails,
  phoneNumberValue,
  onPrevHandler,
  isSubmitting = false
}: {
  onSubmit: Function;
  onPrevHandler: Function;
  phoneNumberValue: string;
  infoDetails: HouseKeepingInfoType;
  isSubmitting?: boolean;
}) {
  const [infoObject, setInfoObject] = useState<HouseKeepingInfoType>(infoDetails);
  const [phoneNumber, setPhoneNumber] = useState<any>(phoneNumberValue || '');

  const onUpdateAttribute = (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl data-testid="housekeeping-dob" fullWidth>
                  <DesktopDatePicker
                    label="Date of birth"
                    onChange={(value) => {
                      onUpdateAttribute('date_of_birth', value?.toString());
                    }}
                    value={infoObject?.date_of_birth || null}
                    renderInput={(params) => (
                      <TextField inputProps={{ 'data-testid': 'housekeeping-dob' }} {...params} />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
              </Stack> */}
              <FormControl fullWidth>
                <TextField
                  label="Phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Current understanding of cohort topic</InputLabel>
                <MaterialSelect
                  fullWidth
                  label="Current understanding of cohort topic"
                  onChange={(e) => onUpdateAttribute('current_understanding', e.target.value)}
                  defaultValue={infoObject.current_understanding}
                  inputProps={{ 'data-testid': 'housekeeping-cohort-tpoic' }}
                >
                  {COHORT_UNDERSTADING_OPTIONS?.map((name: any) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>How did you hear about this cohort?</InputLabel>
                <MaterialSelect
                  fullWidth
                  label="How did you hear about this cohort?"
                  onChange={(e) => onUpdateAttribute('referred_by', e.target.value)}
                  defaultValue={infoObject.referred_by}
                  inputProps={{ 'data-testid': 'housekeeping-about-cohort' }}
                >
                  {REFERRER_OPTIONS?.map((name: any) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Who is paying for this cohort ?</InputLabel>
                <MaterialSelect
                  fullWidth
                  label="Who is paying for this cohort ?"
                  onChange={(e) => onUpdateAttribute('payed_by', e.target.value)}
                  defaultValue={infoObject.payed_by}
                  inputProps={{ 'data-testid': 'housekeeping-payment' }}
                >
                  {PAYING_OPTIONS?.map((name: any) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>{' '}
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={true}
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => {
          onSubmit({ ...infoObject, phone_number: phoneNumber });
        }}
        isSubmitBtn={true}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
