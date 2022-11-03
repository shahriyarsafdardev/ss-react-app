/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { Grid, Chip, Stack, FormControl, TextField, Autocomplete } from '@material-ui/core';
import axios from 'utils/axios';
import { GoalsType, NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

export default function CompanyInfoForm({
  onSubmit,
  companyProfile,
  onPrevHandler,
  isSubmitting
}: {
  isSubmitting: boolean;
  onSubmit: Function;
  companyProfile: GoalsType;
  onPrevHandler: Function;
}) {
  const [companies, setCompanies] = useState<string[]>([]);

  const [infoObject, setInfoObject] = useState<GoalsType>(companyProfile);

  const onUpdateAttribute = (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  const onUpdateAttributeGroup = (data: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, ...data };
    setInfoObject(tempInfo);
  };

  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.companies && setCompanies(payload.companies.map((company: any) => company.name));
      });
  }, []);

  const onCompanyChange = async (e: any) => {
    if (e.__isNew__) {
      onUpdateAttributeGroup({
        name: e.value
      });
    } else {
      onUpdateAttributeGroup({
        name: e.value
      });
    }
  };

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Stack
            direction="column"
            sx={{ height: 1, overflow: 'visible' }}
            spacing={2}
            style={{ padding: '10px' }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              style={{ marginBottom: '20px' }}
            >
              <Autocomplete
                fullWidth
                freeSolo
                value={infoObject?.name}
                onChange={(event, newValue) => {
                  onUpdateAttributeGroup({
                    name: newValue
                  });
                }}
                data-testid="company-name-dropdown"
                options={companies?.map((company) => company)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Chip size="small" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField data-testid="company-name-input" label="Company" {...params} />
                )}
              />
              <FormControl fullWidth>
                <TextField
                  inputProps={{ 'data-testid': 'role-title' }}
                  fullWidth
                  label="Title"
                  placeholder="Role Title"
                  value={infoObject?.role_title}
                  onChange={(e) => onUpdateAttribute('role_title', e.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <TextField
                inputProps={{ 'data-testid': 'goals' }}
                fullWidth
                label="What are you looking to gain from this cohort?"
                value={infoObject?.goals}
                onChange={(e) => onUpdateAttribute('goals', e.target.value)}
                multiline
                rows={3}
              />
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={true}
        isSubmitting={isSubmitting}
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
