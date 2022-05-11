/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';

import CreatableSelect from 'react-select/creatable';
import MultiSelect from 'components/MultiSelect';

import {
  Grid,
  Card,
  Stack,
  Typography,
  FormControl,
  MenuItem,
  ListItemText,
  InputLabel,
  Select as MaterialSelect,
  TextField
} from '@material-ui/core';

import { UploadAvatar } from 'components/upload';
import axios from 'utils/axios';

import { CompanyProfileType, NavigationButtons, checkFormValidity } from './dataTypes';

const numberOfEmployeesList = [
  '1-10',
  '10-100',
  '100-500',
  '500-1000',
  '1000-5000',
  '5000-10,000',
  '10,000-100,000',
  '100,000+'
];

type CompanyData = {
  name: string;
  logo_url: string;
  number_of_employees: string;
  industries: string[];
};

export default function CompanyInfoForm({
  onSubmit,
  companyProfile,
  onPrevHandler,
  showPrevButton = true,
  isSubmitable = false,
  isSubmitting = false
}: {
  showPrevButton?: boolean;
  isSubmitable?: boolean;
  isSubmitting?: boolean;
  onSubmit: Function;
  companyProfile: CompanyProfileType;
  onPrevHandler: Function;
}) {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const { industry_options } = useSelector((state: RootState) => state.profileOptions);

  const [infoObject, setInfoObject] = useState<CompanyProfileType>(companyProfile);

  const handleDrop = (files: any) => {
    onUpdateAttribute('logo_url', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

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
        payload?.companies && setCompanies(payload.companies);
      });
  }, []);

  const onCompanyChange = async (e: any) => {
    if (e.__isNew__) {
      onUpdateAttributeGroup({
        logo_url: null,
        name: e.value,
        number_of_employees: null,
        industries: []
      });
    } else {
      const companyObject = companies.find((company) => company.name === e.value);
      if (companyObject) {
        onUpdateAttributeGroup({
          logo_url: companyObject.logo_url,
          name: companyObject.name,
          number_of_employees: companyObject.number_of_employees,
          industries: companyObject.industries
        });
      }
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
              <FormControl fullWidth>
                <TextField
                  inputProps={{ 'data-testid': 'role-title' }}
                  fullWidth
                  label="Company"
                  value={infoObject?.name}
                  onChange={(e) => onUpdateAttribute('role_title', e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  inputProps={{ 'data-testid': 'role-title' }}
                  fullWidth
                  label="Title"
                  value={infoObject?.name}
                  onChange={(e) => onUpdateAttribute('role_title', e.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <TextField
                inputProps={{ 'data-testid': 'company-name' }}
                fullWidth
                label="What are you looking to gain from this cohort?"
                value={infoObject?.name}
                onChange={(e) => onUpdateAttribute('company_name', e.target.value)}
                multiline
                rows={3}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <TextField
                inputProps={{ 'data-testid': 'company-name' }}
                fullWidth
                label="Are there any specific KPIs that your team is hoping to improve using the learning from this course?"
                value={infoObject?.name}
                onChange={(e) => onUpdateAttribute('company_name', e.target.value)}
                multiline
                rows={3}
              />
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <NavigationButtons
        isSubmitting={isSubmitting}
        isSubmitBtn={isSubmitable}
        showPrevButton={showPrevButton}
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
