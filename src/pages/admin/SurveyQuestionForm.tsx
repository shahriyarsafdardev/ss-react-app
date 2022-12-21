import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Grid,
  Card,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Select as MaterialSelect,
  FormControlLabel,
  Checkbox,
  TextField,
  Button
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { uniq } from 'lodash';
import { useEffect, useState } from 'react';
import { getSessions } from 'redux/slices/cohort';
import LoadingScreen from 'components/LoadingScreen';
import Page from 'components/Page';
import { dispatch, RootState, useSelector } from '../../redux/store';
import axios from '../../utils/axios';
import { ExampleQuestionModal, LoadingContainer } from './Common';

interface Survey {
  cohortCode: string;
  cohortIntake: string;
  sessionNumber: string;
  isOnboardedQuestion: boolean;
  questionsJSON: string;
}

const StyledForm = styled(Form)(({ theme }) => ({
  width: '80%',
  maxHeight: '80vh',
  maxWidth: '1232px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  }
}));

export default function SurveyQuestionForm() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { enqueueSnackbar } = useSnackbar();
  const [currentCode, setCurrentCode] = useState('');
  const [intakeList, setIntakeList] = useState<any>([]);

  const SurveySchema = Yup.object().shape({
    cohortCode: Yup.string().required('Cohort Code is required'),
    cohortIntake: Yup.string().required('cohort Intake is required'),
    questionsJSON: Yup.string().required('Questions are required'),
    sessionNumber: Yup.string().test(
      'oneOfRequired',
      'Select session or check is Onboarding question.',
      (item, inputValue) => inputValue.parent.sessionNumber || inputValue.parent.isOnboardedQuestion
    ),
    isOnboardedQuestion: Yup.string().test(
      'oneOfRequired',
      'Select session or check is onboarding question.',
      (item, inputValue) => inputValue.parent.sessionNumber || inputValue.parent.isOnboardedQuestion
    )
  });

  const formik = useFormik<Survey>({
    enableReinitialize: true,
    initialValues: {
      cohortCode: '',
      cohortIntake: '',
      sessionNumber: '',
      isOnboardedQuestion: false,
      questionsJSON: ''
    },
    validationSchema: SurveySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const uploadData = new FormData();
      uploadData.append('cohort_code', values.cohortCode);
      uploadData.append('cohort_intake', values.cohortIntake);
      uploadData.append('session_number', values.sessionNumber);
      uploadData.append('questions_json', values.questionsJSON);
      uploadData.append('is_onboarded_question', values.isOnboardedQuestion.toString());
      await axios
        .post('/cohorts/add_survey_questions.json', uploadData)
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          // resetForm();
          // setCurrentCode('');
          // setIntakeList([]);
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
      setSubmitting(false);
    }
  });

  const {
    values,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    isValid,
    touched,
    errors
  } = formik;
  const cohort = useSelector(
    (state: RootState) =>
      state?.cohort?.cohorts?.filter(
        (cohort) => cohort.code === currentCode && cohort.intake_name === values.cohortIntake
      )[0]
  );

  const { sessions } = cohort || [];

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  const cohortCodes = () =>
    uniq(cohorts.map((cohort) => cohort.code)).sort((a, b) => a.localeCompare(b));

  const setIntakes = (code: string) => {
    setCurrentCode(code);
    if (code) {
      setIntakeList(
        uniq(
          cohorts.filter((cohort) => cohort.code === code).map((cohort) => cohort.intake_name)
        ).sort((a, b) => a.localeCompare(b))
      );
    } else {
      setIntakeList([]);
    }
  };
  if (cohorts.length <= 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Survey Form">
      <br />
      <FormikProvider value={formik}>
        <StyledForm autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Cohort Code</InputLabel>
                      <MaterialSelect
                        label="Cohort Code"
                        fullWidth
                        data-testid="cohortCode"
                        defaultValue={values.cohortCode}
                        value={values.cohortCode}
                        error={Boolean(touched.cohortCode && errors.cohortCode)}
                      >
                        {cohortCodes().map((code: any, index: any) => (
                          <MenuItem
                            key={index}
                            value={code}
                            onClick={() => {
                              setFieldValue('cohortCode', code);
                              setFieldValue('cohortIntake', '');
                              setFieldValue('sessionNumber', '');
                              setIntakes(code);
                            }}
                          >
                            {code}
                          </MenuItem>
                        ))}
                      </MaterialSelect>
                    </FormControl>
                  </Stack>

                  {currentCode && (
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel>Cohort Intake</InputLabel>
                        <MaterialSelect
                          label="Cohort Intake"
                          fullWidth
                          data-testid="cohort-intake"
                          defaultValue={values.cohortIntake}
                          value={values.cohortIntake}
                          error={Boolean(touched.cohortIntake && errors.cohortIntake)}
                          disabled={intakeList.length <= 0}
                        >
                          {intakeList.map((intakeName: any, index: any) => (
                            <MenuItem
                              key={index}
                              value={intakeName}
                              onClick={() => {
                                setFieldValue('cohortIntake', intakeName);
                                setFieldValue('sessionNumber', '');
                              }}
                            >
                              {intakeName}
                            </MenuItem>
                          ))}
                        </MaterialSelect>
                      </FormControl>

                      <FormControl
                        fullWidth
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={!values.cohortIntake}
                              defaultValue={values.isOnboardedQuestion ? 1 : 0}
                              value={values.isOnboardedQuestion}
                              onChange={(e) => {
                                setFieldValue('isOnboardedQuestion', e.target.checked);
                                setFieldValue('sessionNumber', '');
                              }}
                            />
                          }
                          label="Is it onboarding question ?"
                        />
                      </FormControl>
                    </Stack>
                  )}

                  {sessions && !values.isOnboardedQuestion && (
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel>Session Number</InputLabel>
                        <MaterialSelect
                          label="Session Number"
                          fullWidth
                          defaultValue={values.sessionNumber}
                          value={values.sessionNumber}
                          data-testid="session-number"
                          disabled={sessions?.length <= 0 || !cohort}
                          error={Boolean(touched.sessionNumber && errors.sessionNumber)}
                        >
                          {uniq(
                            sessions?.map((session: any) => (
                              <MenuItem
                                key={session.number}
                                value={session.number}
                                onClick={() => {
                                  setFieldValue('sessionNumber', session.number);
                                }}
                              >
                                Session # {session.number} - {session.name}
                              </MenuItem>
                            ))
                          )}
                        </MaterialSelect>
                      </FormControl>
                    </Stack>
                  )}

                  {(values.sessionNumber || values.isOnboardedQuestion) && (
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          label="Add questions JSON, ( Click bellow button to see the format of JSON )"
                          {...getFieldProps('questionsJSON')}
                          error={Boolean(touched.questionsJSON && errors.questionsJSON)}
                          helperText={touched.questionsJSON && errors.questionsJSON}
                          sx={{ mt: 3 }}
                        />
                      </FormControl>
                    </Stack>
                  )}
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                  {(values.sessionNumber || values.isOnboardedQuestion) && <ExampleQuestionModal />}
                  {cohort && values.sessionNumber && (
                    <Button
                      href={`/cohorts/${cohort?.id}/sessions?session=${values.sessionNumber}&student_feedback=true`}
                      variant="outlined"
                      target="_blank"
                    >
                      Open Survey
                    </Button>
                  )}
                  <LoadingButton
                    size="large"
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    loading={isSubmitting}
                    id="btn-submit"
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </StyledForm>
      </FormikProvider>
    </Page>
  );
}
