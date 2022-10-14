import {
  FormControl,
  TextField,
  Box,
  MenuItem,
  ListItemText,
  Select as MaterialSelect,
  InputLabel
} from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import { trackEvent } from 'utils/eventTracking';
import * as Yup from 'yup';
import TeamMembersList from '../../../components/subscription/teams/TeamMembersList';
import { StyledLoadingButton, StyledStack, StyledMembersList, StyledNextButton } from './Common';
import { Cohort } from './TeamRegistration';

export type TeamMember = {
  email: string;
  fullName: string;
  courseID: string;
};

function InviteMembersForm({
  setStep,
  isSinglePayee,
  email,
  team,
  teamMembers,
  setTeamMembers,
  cohorts
}: {
  setStep: Function;
  isSinglePayee: boolean;
  email: string;
  team: string;
  teamMembers: TeamMember[];
  setTeamMembers: Function;
  cohorts: Cohort[];
}) {
  const { enqueueSnackbar } = useSnackbar();

  const buttonText = () => (isSinglePayee ? 'Add Team Member' : 'Send Invite');

  const getCohortName = (cohortID: string) => {
    const cohort = cohorts.filter((c) => c.id === cohortID)[0];
    return cohort?.name;
  };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required'),
    courseID: Yup.string().required('Course Name is required')
  });

  const formik = useFormik<TeamMember>({
    initialValues: {
      email: '',
      fullName: '',
      courseID: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!isSinglePayee) {
        const uploadData = new FormData();
        uploadData.append('email', values.email);
        uploadData.append('fullName', values.fullName);
        uploadData.append('team', team);
        uploadData.append('courseID', values.courseID);
        await axios
          .post('team_registrations/team_member_invite.json', uploadData)
          .then((res) => {
            enqueueSnackbar('Team Member Invited', { variant: 'success' });
            trackEvent(null, 'Testing - Team Registration Invite Sent', {
              'Team Lead Full Name': email.split('@')[0],
              'Invited User First Name': values.fullName,
              'Invited User Email': values.email,
              'Team Name': team,
              'Course ID': values.courseID,
              'Course Name': getCohortName(values.courseID)
            });
          })
          .catch((err) => {
            enqueueSnackbar('Some error occurred!', { variant: 'error' });
          });
      } else {
        enqueueSnackbar('Team Member Added', { variant: 'success' });
      }
      setTeamMembers([
        ...teamMembers,
        { email: values.email, fullName: values.fullName, courseID: values.courseID }
      ]);
      resetForm();
    }
  });

  const { values, errors, touched, isSubmitting, getFieldProps, submitForm, isValid } = formik;
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <StyledStack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 2 }}>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'email' }}
                fullWidth
                label="Email"
                error={Boolean(touched.email && errors.email)}
                {...getFieldProps('email')}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'full-name' }}
                fullWidth
                label="Full Name"
                error={Boolean(touched.fullName && errors.fullName)}
                {...getFieldProps('fullName')}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Course Name</InputLabel>
              <MaterialSelect
                fullWidth
                label="Course Name"
                defaultValue={values.courseID}
                inputProps={{ 'data-test-id': 'course-id' }}
                {...getFieldProps('courseID')}
                error={Boolean(touched.courseID && errors.courseID)}
              >
                {cohorts?.map((cohort: Cohort) => (
                  <MenuItem key={cohort.id} value={`${cohort.id}`}>
                    <ListItemText primary={`${cohort.name} with ${cohort.host_name}`} />
                  </MenuItem>
                ))}
              </MaterialSelect>
            </FormControl>
            <StyledLoadingButton
              data-testid="purchase-button"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !values.email || !values.fullName || !values.courseID}
              onClick={() => submitForm()}
            >
              {buttonText()}
            </StyledLoadingButton>
          </StyledStack>
          {teamMembers && teamMembers.length > 0 && (
            <StyledMembersList>
              <TeamMembersList
                teamMembers={teamMembers}
                isSinglePayee={isSinglePayee}
                cohorts={cohorts}
              />
            </StyledMembersList>
          )}
        </Form>
      </FormikProvider>
      <StyledNextButton
        fullWidth
        variant="contained"
        onClick={() => setStep()}
        disabled={teamMembers.length === 0}
      >
        Next
      </StyledNextButton>
    </Box>
  );
}

export default InviteMembersForm;
