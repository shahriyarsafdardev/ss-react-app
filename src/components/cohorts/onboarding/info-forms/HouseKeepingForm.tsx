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
import { DesktopDatePicker } from '@material-ui/lab';
import { HouseKeepingInfoType, NavigationButtons } from './dataTypes';

const COHORT_UNDERSTADING_OPTIONS = [
  '1 (Complete Beginner)',
  '2 (Mediocre)',
  '3 (Well Expirenced)'
];

const REFERRER_OPTIONS = [
  'Google Search',
  'Email Marketing',
  'Social Media',
  'Recommended by a friend or colleague',
  'Personally invited by someone in the Scholarsite team',
  'Other'
];

const PAYING_OPTIONS = ['I am', 'My employer', 'Other'];

export default function HouseKeepingForm({
  onSubmit,
  infoDetails,
  onPrevHandler
}: {
  onSubmit: Function;
  onPrevHandler: Function;
  infoDetails: HouseKeepingInfoType;
}) {
  const [infoObject, setInfoObject] = useState<HouseKeepingInfoType>(infoDetails);

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
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <DesktopDatePicker
                    label="Date of birth"
                    onChange={(value) => onUpdateAttribute('role_category', value)}
                    value={new Date()}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Current understanding of cohort topic</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label="Current understanding of cohort topic"
                    onChange={(e) => onUpdateAttribute('do_manage_team', e.target.value)}
                    defaultValue={infoObject.current_understanding}
                  >
                    {COHORT_UNDERSTADING_OPTIONS?.map((name: any) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
              </Stack>
              <FormControl fullWidth>
                <InputLabel>How did you hear about this cohort?</InputLabel>
                <MaterialSelect
                  fullWidth
                  label="How did you hear about this cohort?"
                  onChange={(e) => onUpdateAttribute('do_manage_team', e.target.value)}
                  defaultValue={infoObject.referred_by}
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
                  onChange={(e) => onUpdateAttribute('do_manage_team', e.target.value)}
                  defaultValue={infoObject.payed_by}
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
        disabled={false}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
