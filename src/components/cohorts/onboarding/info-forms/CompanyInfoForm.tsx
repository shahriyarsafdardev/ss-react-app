/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';
import MultiSelect from 'components/MultiSelect';
import MUICreatableSelect from 'components/MUICreatableSelect';

import {
  Grid,
  Card,
  Stack,
  Typography,
  FormControl,
  MenuItem,
  ListItemText,
  InputLabel,
  Select as MaterialSelect
} from '@material-ui/core';

import { UploadAvatar } from 'components/upload';
import axios from 'utils/axios';

import { CompanyProfileType, NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

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
    const companyObject = companies.find((company) => company.name === e);
    if (!companyObject) {
      onUpdateAttributeGroup({
        logo_url: null,
        name: e,
        number_of_employees: null,
        industries: []
      });
    } else {
      onUpdateAttributeGroup({
        logo_url: companyObject.logo_url,
        name: companyObject.name,
        number_of_employees: companyObject.number_of_employees,
        industries: companyObject.industries
      });
    }
  };

  const renderButtons = () => (
    <NavigationButtons
      isSubmitting={isSubmitting}
      isSubmitBtn={isSubmitable}
      showPrevButton={showPrevButton}
      disabled={checkFormValidity(infoObject)}
      onPreviousHandler={onPrevHandler}
      onNextHandler={() => onSubmit(infoObject)}
    />
  );

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Card data-testid="company-logo" sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <UploadAvatar
              accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
              file={infoObject?.logo_url}
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
                  Company Logo
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <FormControl data-testid="company-name" fullWidth>
                <MUICreatableSelect
                  options={companies?.map((company: CompanyData) => company.name)}
                  value={infoObject?.name || ''}
                  onChange={(value: any) => onCompanyChange(value)}
                  label="Select or create company name"
                />
              </FormControl>

              <FormControl data-testid="company-industries-dropdown" fullWidth>
                <MultiSelect
                  values={infoObject.industries}
                  options={industry_options}
                  onChange={(value: string[]) => onUpdateAttribute('industries', value)}
                  label="Company Industries"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Number of Employees</InputLabel>
                <MaterialSelect
                  fullWidth
                  label="Number of Employees"
                  onChange={(e) => onUpdateAttribute('number_of_employees', e.target.value)}
                  value={infoObject.number_of_employees}
                  inputProps={{ 'data-testid': 'company-employees' }}
                >
                  {numberOfEmployeesList.map((item: any) => (
                    <MenuItem key={item} value={item}>
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>
              {!showPrevButton && renderButtons()}
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {showPrevButton && renderButtons()}
    </>
  );
}
