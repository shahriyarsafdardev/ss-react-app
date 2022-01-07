import { useState } from 'react';
import { RootState, useSelector } from 'redux/store';

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
import { InfoType, NavigationButtons, checkFormValidity } from './dataTypes';

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
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <br />
          <Card sx={{ height: 1, overflow: 'visible' }} style={{ padding: '20px' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <FormControl data-testid="role-title" fullWidth>
                <TextField
                  fullWidth
                  label="Role Title"
                  value={infoObject?.role_title}
                  onChange={(e) => onUpdateAttribute('role_title', e.target.value)}
                />
              </FormControl>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Role Categories</InputLabel>
                  <MaterialSelect
                    data-testid="role-categories"
                    fullWidth
                    label="Role Categories"
                    onChange={(e) => onUpdateAttribute('role_category', e.target.value)}
                    defaultValue={infoObject.role_category}
                    multiple
                    renderValue={(selected: any) => selected.join(', ')}
                  >
                    {role_options?.map((name: any) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Do you manage a team or division?</InputLabel>
                  <MaterialSelect
                    data-testid="role-manage"
                    fullWidth
                    label="Do you manage a team or division?"
                    onChange={(e) => onUpdateAttribute('do_manage_team', e.target.value === 'Yes')}
                    defaultValue={infoObject.do_manage_team === true ? 'Yes' : 'No'}
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
                  data-testid="role-responsibilities"
                  fullWidth
                  label="Brief description of your role and responsibilities?"
                  value={infoObject?.role_description}
                  onChange={(e) => onUpdateAttribute('role_description', e.target.value)}
                  multiline
                  rows={4}
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
