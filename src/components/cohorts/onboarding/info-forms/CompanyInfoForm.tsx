import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';

import CreatableSelect from 'react-select/creatable';

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

export default function CompanyInfoForm({
  onSubmit,
  companyProfile,
  onPrevHandler
}: {
  onSubmit: Function;
  companyProfile: CompanyProfileType;
  onPrevHandler: Function;
}) {
  const [companies, setCompanies] = useState<string[]>();
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

  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.companies && setCompanies(payload.companies);
      });
  }, []);

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid data-testid="company-logo" item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <UploadAvatar
              accept="image/*"
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
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="company-name">Select or create company name</label>
                <CreatableSelect
                  defaultValue={{ value: infoObject?.name, label: infoObject?.name }}
                  options={companies?.map((option) => ({ value: option, label: option }))}
                  isClearable={false}
                  backspaceRemovesValue={true}
                  placeholder="Company Name"
                  isSearchable
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  onChange={(e) => onUpdateAttribute('name', e?.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Company Industries</InputLabel>
                <MaterialSelect
                  data-testid="company-industry"
                  fullWidth
                  label="Company Industries"
                  onChange={(e: any) => onUpdateAttribute('industries', e.target.value)}
                  defaultValue={infoObject.industries}
                  multiple
                  renderValue={(selected: any) => selected.join(', ')}
                >
                  {industry_options?.map((name: any) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Number of Employees</InputLabel>
                <MaterialSelect
                  data-testid="company-employees"
                  fullWidth
                  label="Number of Employees"
                  onChange={(e) => onUpdateAttribute('number_of_employees', e.target.value)}
                  defaultValue={infoObject.number_of_employees}
                >
                  {numberOfEmployeesList.map((item: any) => (
                    <MenuItem key={item} value={item}>
                      <ListItemText primary={item} />
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
        disabled={false}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
