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
  FormControl,
  MenuItem,
  ListItemText,
  Select as MaterialSelect
} from '@material-ui/core';
import { NetworkInfoType, NavigationButtons, checkFormValidity } from './dataTypes';

const YES_NO_OPTIONS = ['Yes', 'No'];

export default function NetworkingForm({
  onSubmit,
  infoDetails,
  onPrevHandler
}: {
  onPrevHandler: Function;
  onSubmit: Function;
  infoDetails: NetworkInfoType;
}) {
  const { role_options, industry_options } = useSelector(
    (state: RootState) => state.profileOptions
  );

  const [infoObject, setInfoObject] = useState<NetworkInfoType>(infoDetails);

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
              <FormControl fullWidth>
                <label>Which roles are you interested in connecting with?</label>
                <MultiSelect
                  options={role_options}
                  values={infoObject.networking_roles_categories}
                  onChange={(value: string[]) =>
                    onUpdateAttribute('networking_roles_categories', value)
                  }
                  data-testid="network-roles"
                />
              </FormControl>
              <FormControl fullWidth>
                <label>Which industries are you interested in connecting with?</label>

                <MultiSelect
                  data-testid="network-fellow-member-dropdown"
                  options={industry_options}
                  values={infoObject.networking_industries_categories}
                  onChange={(value: string[]) =>
                    onUpdateAttribute('networking_industries_categories', value)
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>
                  Are you interested in being matched with a fellow cohort member via email based on
                  interests?
                </InputLabel>
                <MaterialSelect
                  fullWidth
                  label="Are you interested in being matched with a fellow cohort member via email based on interests?"
                  onChange={(e) =>
                    onUpdateAttribute('interested_in_being_matched', e.target.value === 'Yes')
                  }
                  value={infoObject.interested_in_being_matched === true ? 'Yes' : 'No'}
                  inputProps={{ 'data-testid': 'network-fellow-member' }}
                >
                  {YES_NO_OPTIONS?.map((name: any) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>
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
