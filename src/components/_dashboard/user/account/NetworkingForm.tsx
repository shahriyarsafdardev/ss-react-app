import { useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
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

interface InitialState {
  interests: string[];
  current_role_category_selections: string[];
  current_industry_category_selections: string[];
  strengths: string[];
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[];
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
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
  };
}) {
  const [strengths, setStrengths] = useState<string[]>();
  const [interests, setInterests] = useState<string[]>([]);

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: userProfile || {
      interests: [],
      current_role_category_selections: [],
      current_industry_category_selections: [],
      strengths: [],
      opted_in_for_matching_suggestions: false,
      networking_matching_preferences: []
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
                  <Stack spacing={1}>
                    <FormControl fullWidth>
                      <InputLabel>
                        Are you interested in recieving networking suggestions based on
                        commonalities and interests?
                      </InputLabel>
                      <MaterialSelect
                        label="Are you interested in recieving networking suggestions based on commonalities
                        and interests?"
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
                          Yes
                        </MenuItem>
                        <MenuItem
                          value="No"
                          onClick={() => {
                            setFieldValue('opted_in_for_matching_suggestions', false);
                          }}
                        >
                          {' '}
                          No
                        </MenuItem>
                      </MaterialSelect>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column' }} spacing={1}>
                    <MultiSelect
                      options={strengths}
                      values={values.strengths}
                      onChange={(e: any) => setFieldValue('strengths', e)}
                      label="What topics can fellow cohort members ask you question on?"
                      isCreatable={true}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column' }} spacing={1}>
                    <MultiSelect
                      options={[
                        'Work in the same role',
                        'Work in the same industry',
                        'That I can be mentored by',
                        'That I can mentor',
                        'Who are investors',
                        'Who are founders',
                        'Who live near me',
                        'I’m not interested in connecting with cohort members'
                      ]}
                      values={values.networking_matching_preferences}
                      onChange={(e: any) => setFieldValue('networking_matching_preferences', e)}
                      maxLimit={3}
                      label="I am most interested in connecting with cohort members who:"
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
