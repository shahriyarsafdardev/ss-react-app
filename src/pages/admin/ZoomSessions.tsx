import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import {
  Grid,
  Card,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Select as MaterialSelect
} from '@material-ui/core';
import { uniq } from 'lodash';
import LoadingScreen from 'components/LoadingScreen';
import { getSessions } from 'redux/slices/cohort';
import { styled } from '@material-ui/core/styles';
import { LoadingContainer, StyledForm } from './Common';
import { dispatch, RootState, useSelector } from '../../redux/store';

const LabelStyled = styled('label')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '20px',
  '&.blue': {
    color: theme.palette.primary.main
  },
  '&.gray': {
    color: theme.palette.text.primary
  }
}));

export default function ZoomSessions() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const [currentCode, setCurrentCode] = useState('');
  const [intakeList, setIntakeList] = useState<any>([]);
  const [included, setIncluded] = useState(true);

  const SessionSchema = Yup.object().shape({
    cohortCode: Yup.string().required('Cohort Code is required'),
    cohortIntake: Yup.string().required('cohort Intake is required'),
    sessionNumber: Yup.string().test(
      'oneOfRequired',
      'Select session or check is Onboarding question.',
      (item, inputValue) => inputValue.parent.sessionNumber || inputValue.parent.isOnboardedQuestion
    )
  });

  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues: {
      cohortCode: '',
      cohortIntake: '',
      sessionNumber: ''
    },
    validationSchema: SessionSchema,
    onSubmit: () => {}
  });

  const { values, setFieldValue, touched, errors } = formik;

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
    <FormikProvider value={formik}>
      <StyledForm autoComplete="off" id="profile-form" noValidate>
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
                {values.sessionNumber && (
                  <Stack alignItems="center" direction="row">
                    <LabelStyled className={!included ? 'blue' : 'gray'}>Not Included</LabelStyled>
                    <Switch checked={included} onChange={() => setIncluded(!included)} />
                    <LabelStyled className={included ? 'blue' : 'gray'}>Included</LabelStyled>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </StyledForm>
    </FormikProvider>
  );
}
