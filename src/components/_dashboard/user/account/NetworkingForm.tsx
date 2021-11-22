import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Typography, Switch } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
// axios
import axios from '../../../../utils/axios';
import MultiSelect from '../../../MultiSelect';

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
  width: 100,
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
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <Typography>
                    How would you like to engage with the ScholarSite community?
                  </Typography>

                  <CreatableSelect
                    defaultValue={getOptions(values.interests)}
                    styles={customStyles}
                    placeholder={<div>Start typing whatever comes to mind!</div>}
                    options={interestOptions}
                    isClearable={false}
                    backspaceRemovesValue={true}
                    isMulti
                    isSearchable
                    id="interest-multiselect"
                    onChange={(selected) => {
                      setFieldValue(
                        'interests',
                        Array.isArray(selected) ? selected.map((s) => s.value) : []
                      );
                    }}
                  />
                </Stack>

                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <Typography>
                    What topics can fellow cohort members ask you questions on?
                  </Typography>
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
                <Stack
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  spacing={1}
                >
                  <Typography>Interested in receiving networking suggestions:</Typography>
                  <Switch
                    {...getFieldProps('opted_in_for_matching_suggestions')}
                    checked={values.opted_in_for_matching_suggestions}
                  />
                </Stack>
                {values.opted_in_for_matching_suggestions && (
                  <>
                    <Stack direction={{ xs: 'column' }} spacing={1}>
                      <Typography>
                        I'm most interested in matching with someone who: (Make between 1 and 3
                        choices){' '}
                      </Typography>
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
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                      spacing={1}
                    >
                      <Typography>Interested in mentoring juniors: </Typography>
                      <Switch
                        {...getFieldProps('is_interested_in_mentoring')}
                        checked={values.is_interested_in_mentoring}
                      />
                    </Stack>
                  </>
                )}
              </Stack>
              {showSubmitButton && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    id="btn-submit"
                  >
                    Save
                  </StyledLoadingButton>
                </Box>
              )}
            </Card>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
