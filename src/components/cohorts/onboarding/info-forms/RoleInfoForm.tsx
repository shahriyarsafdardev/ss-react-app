/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { RootState, useSelector } from 'redux/store';
import MultiSelect from 'components/MultiSelect';

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
import { InfoType, NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

const YES_NO_OPTIONS = ['Yes', 'No'];

export default function RoleInfoForm({
  onSubmit,
  infoDetails,
  onPrevHandler
}: {
  onSubmit: Function;
  onPrevHandler: Function;
  infoDetails: InfoType;
}) {
  const { role_options } = useSelector((state: RootState) => state.profileOptions);

  const [infoObject, setInfoObject] = useState<InfoType>(infoDetails);

  const onUpdateAttribute = (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  return (
    <>
      <Grid container spacing={1} style={{ maxHeight: '350px', overflow: 'scroll' }}>
        <Grid item xs={12} md={12}>
          <br />
          <Card sx={{ height: 1, overflow: 'visible' }} style={{ padding: '20px' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <FormControl fullWidth>
                <TextField
                  inputProps={{ 'data-testid': 'role-title' }}
                  fullWidth
                  label="Role Title"
                  value={infoObject?.role_title}
                  onChange={(e) => onUpdateAttribute('role_title', e.target.value)}
                />
              </FormControl>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl data-testid="role-categories-dropdown" fullWidth>
                  <MultiSelect
                    values={infoObject.role_category}
                    options={role_options}
                    onChange={(value: string[]) => onUpdateAttribute('role_category', value)}
                    label="Role Categories"
                    maxLimit={2}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Do you manage a team or division?</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label="Do you manage a team or division?"
                    onChange={(e) => onUpdateAttribute('do_manage_team', e.target.value === 'Yes')}
                    defaultValue={infoObject.do_manage_team === true ? 'Yes' : 'No'}
                    inputProps={{ 'data-testid': 'role-manage' }}
                  >
                    {YES_NO_OPTIONS?.map((name: any) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
              </Stack>
              <FormControl fullWidth>
                <TextField
                  inputProps={{ 'data-testid': 'role-responsibilities' }}
                  fullWidth
                  label="Brief description of your role and responsibilities?"
                  value={infoObject?.role_description}
                  onChange={(e) => onUpdateAttribute('role_description', e.target.value)}
                  multiline
                  rows={3}
                />
              </FormControl>{' '}
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={true}
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
