import { useState, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

// material
import { Box, Grid, Card, Stack, Typography, InputLabel, FormControl } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import { UploadAvatar } from 'components/upload';
// axios
import axios from 'utils/axios';
import { CompanyProfileType } from './dataTypes';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const customStyles = {
  placeholder: (provided: any, state: any) => ({
    display: state.isFocused ? 'none' : 'block',
    color: 'rgb(128, 128, 128)'
  })
};

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
  companyProfile
}: {
  onSubmit: Function;
  companyProfile: CompanyProfileType;
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
        <Grid item xs={12} md={4}>
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
              <FormControl fullWidth>
                <InputLabel>Company Name</InputLabel>
                <CreatableSelect
                  defaultValue={{ value: infoObject?.name, label: infoObject?.name }}
                  options={companies?.map((option) => ({ value: option, label: option }))}
                  isClearable={false}
                  styles={customStyles}
                  backspaceRemovesValue={true}
                  placeholder={<div>Company Name</div>}
                  isSearchable
                  onChange={(e) => onUpdateAttribute('name', e?.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <CreatableSelect
                  defaultValue={infoObject.industries.map((option) => ({
                    value: option,
                    label: option
                  }))}
                  options={industry_options?.map((option) => ({ value: option, label: option }))}
                  isClearable={false}
                  styles={customStyles}
                  isMulti
                  backspaceRemovesValue={true}
                  placeholder={<div>Company Industries</div>}
                  isSearchable
                  onChange={(e) =>
                    onUpdateAttribute(
                      'industries',
                      e.map((item) => item.value)
                    )
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <Select
                  options={numberOfEmployeesList?.map((option) => ({
                    value: option,
                    label: option
                  }))}
                  isClearable={false}
                  backspaceRemovesValue={true}
                  placeholder="Number of Employees"
                  onChange={(e) => onUpdateAttribute('number_of_employees', e?.value)}
                />
              </FormControl>
            </Stack>
            {false && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <StyledLoadingButton type="submit" variant="contained" id="btn-submit">
                  Save Changes
                </StyledLoadingButton>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
