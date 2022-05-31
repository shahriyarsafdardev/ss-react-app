import { useState } from 'react';

// material
import {
  Grid,
  Card,
  Stack,
  InputLabel,
  FormControl,
  MenuItem,
  ListItemText,
  Select as MaterialSelect
} from '@material-ui/core';
import { HouseKeepingInfoType, NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

const REFERRER_OPTIONS = [
  'Google Search',
  'Email Marketing',
  'Social Media',
  'Recommended by a friend or colleague',
  'Personally invited by someone in the Scholarsite team',
  'Other'
];
const YES_NO_OPTIONS = ['Yes', 'No'];

export default function HouseKeepingForm({
  onSubmit,
  infoDetails,
  onPrevHandler,
  isSubmitting = false
}: {
  onSubmit: Function;
  onPrevHandler: Function;
  infoDetails: HouseKeepingInfoType;
  isSubmitting?: boolean;
}) {
  const [infoObject, setInfoObject] = useState<HouseKeepingInfoType>(infoDetails);

  const onUpdateAttribute = (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  const booleanValue = (value: any) => {
    if (value === true) {
      return 'Yes';
    }
    if (value === false) {
      return 'No';
    }
    return '';
  };

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Stack direction="column" sx={{ height: 1, padding: '10px 5px' }} spacing={2}>
            <Stack spacing={{ xs: 3, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>
                  Are you interested in networking with other cohort participants?
                </InputLabel>
                <MaterialSelect
                  fullWidth
                  data-testid="fellow-member"
                  label="Are you interested in networking with other cohort participants?"
                  onChange={(e) =>
                    onUpdateAttribute('interested_in_being_matched', e.target.value === 'Yes')
                  }
                  style={{ opacity: '1000' }}
                  value={booleanValue(infoObject?.interested_in_being_matched)}
                  inputProps={{ 'data-testid': 'network-fellow-member' }}
                >
                  {YES_NO_OPTIONS?.map((name: any) => (
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
                  data-testid="about-cohort"
                  label="How did you hear about this cohort?"
                  onChange={(e) => onUpdateAttribute('referred_by', e.target.value)}
                  defaultValue={infoObject.referred_by}
                  inputProps={{ 'data-testid': 'housekeeping-about-cohort' }}
                  style={{ opacity: '1000' }}
                >
                  {REFERRER_OPTIONS?.map((name: any) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={true}
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
