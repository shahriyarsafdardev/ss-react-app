import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Select as MaterialSelect
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
// axios
import axios from '../../../../utils/axios';
import MultiSelect from '../../../MultiSelect';

const customStyles = {
  placeholder: (provided: any, state: any) => ({
    display: state.isFocused ? 'none' : 'block'
    // color: 'rgb(128, 128, 128)'
  }),
  multiValue: (provided: any, state: any) => ({
    backgroundColor: 'rgba(77, 77, 205, 0.16)',
    padding: '1px 2px 1px 8px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '6px',
    color: 'rgba(77, 77, 205, 1)',
    margin: '5px 5px 5px 0px',
    fontWeight: 700,
    fontSize: '14px'
  }),
  multiValueLabel: (provided: any, state: any) => ({
    color: 'rgba(77, 77, 205, 1)'
  })
};
interface InitialState {
  interests: string[];
  current_role_category_selections: string[];
  current_industry_category_selections: string[];
  strengths: string[];
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[];
  is_interested_in_mentoring: boolean;
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const getOptions = (options: any) =>
  options.map((option: any) => ({
    value: option,
    label: option
  }));

export default function NetworkingForm({
  onSubmit,
  showSubmitButton = true,
  userProfile
}: {
  showSubmitButton?: boolean;
  onSubmit: Function;
  userProfile?: {
    strengths: string[];
    current_role_category_selections: string[];
    current_industry_category_selections: string[];
    interests: string[];
    opted_in_for_matching_suggestions: boolean;
    networking_matching_preferences: string[];
    is_interested_in_mentoring: boolean;
  };
}) {
  const [strengths, setStrengths] = useState<string[]>();
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = interests?.map((interest) => ({ value: interest, label: interest }));
  const strengthsOptions = strengths?.map((strength) => ({ value: strength, label: strength }));

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: userProfile || {
      interests: [],
      current_role_category_selections: [],
      current_industry_category_selections: [],
      strengths: [],
      opted_in_for_matching_suggestions: false,
      networking_matching_preferences: [],
      is_interested_in_mentoring: false
    },
    onSubmit: async (values) => {
      await onSubmit(values);
    }
  });

  const { values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;
  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.strengths && setStrengths(payload.strengths);
        payload?.interests && setInterests(payload.interests);
      });
  }, []);

  return (
    <>
      <br />
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column' }} spacing={1}>
                    <Typography>Fellow cohort members can ask me questions on</Typography>
                    <CreatableSelect
                      defaultValue={getOptions(values.strengths)}
                      styles={customStyles}
                      placeholder={<div>Start typing whatever comes to mind!</div>}
                      options={strengthsOptions}
                      isClearable={false}
                      backspaceRemovesValue={true}
                      isMulti
                      isSearchable
                      id="strength-multiselect"
                      onChange={(selected) => {
                        setFieldValue(
                          'strengths',
                          Array.isArray(selected) ? selected.map((s) => s.value) : []
                        );
                      }}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column' }} spacing={1}>
                    <Typography>I am interested in connecting with </Typography>
                    <MultiSelect
                      options={[
                        'Work in the same role',
                        'Work in the same industry',
                        'Can mentor me',
                        'I can mentor',
                        'Are investors',
                        'Are founders',
                        'Live near me',
                        'I’m not interested in connecting with cohort members'
                      ]}
                      values={values.networking_matching_preferences}
                      onChange={(e: any) => setFieldValue('networking_matching_preferences', e)}
                      maxLimit={3}
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <FormControl fullWidth>
                      <InputLabel>
                        I am interested in recieving networking suggestions based on commonalities
                        and interests
                      </InputLabel>

                      <MaterialSelect
                        label="I am interested in recieving networking suggestions based on commonalities and
                    interests"
                        fullWidth
                        data-testid="opt-for-networking"
                        defaultValue={
                          values.opted_in_for_matching_suggestions === true ? 'Yes' : 'No'
                        }
                      >
                        <MenuItem
                          value="Yes"
                          onClick={() => {
                            setFieldValue('opted_in_for_matching_suggestions', true);
                          }}
                        >
                          {' '}
                          Yes Please
                        </MenuItem>
                        <MenuItem
                          value="No"
                          onClick={() => {
                            setFieldValue('opted_in_for_matching_suggestions', false);
                          }}
                        >
                          {' '}
                          No thanks
                        </MenuItem>
                      </MaterialSelect>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column' }} spacing={1}>
                    <TextField
                      label="Linkedin URL"
                      fullWidth
                      {...getFieldProps('linkedin_url')}
                      inputProps={{
                        'data-testid': 'user-introduction'
                      }}
                      onChange={(e: any) => setFieldValue('linkedin_url', e.target.value)}
                    />
                  </Stack>
                </Stack>
                {showSubmitButton && (
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <StyledLoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      id="btn-submit"
                    >
                      Save Changes
                    </StyledLoadingButton>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
