/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Grid, Card, Stack, FormControl, TextField } from '@material-ui/core';
import axios from 'utils/axios';
import { GoalsType, NavigationButtons, checkFormValidity } from './dataTypes';

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
          <Card sx={{ height: 1, overflow: 'visible' }} style={{ padding: '20px' }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              style={{ marginBottom: '20px' }}
            >
              <FormControl data-testid="company-name" fullWidth>
                {/* eslint-disable-nex-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="company-name">Company</label>
                <CreatableSelect
                  defaultValue={{ value: infoObject?.name, label: infoObject?.name }}
                  options={companies?.map((company: string) => ({
                    value: company,
                    label: company
                  }))}
                  isClearable={false}
                  backspaceRemovesValue={true}
                  placeholder="Company Name"
                  isSearchable
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  onChange={(e) => onCompanyChange(e)}
                />
              </FormControl>
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
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <TextField
                inputProps={{ 'data-testid': 'improvements' }}
                fullWidth
                label="Are there any specific KPIs that your team is hoping to improve using the learning from this course?"
                value={infoObject?.improvements}
                onChange={(e) => onUpdateAttribute('improvements', e.target.value)}
                multiline
                rows={3}
              />
            </FormControl>
          </Card>
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
