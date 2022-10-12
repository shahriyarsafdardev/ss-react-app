import { FormControl, TextField, Box } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'utils/axios';
import * as Yup from 'yup';
import TeamMembersList from '../../../components/subscription/teams/TeamMembersList';
import { StyledLoadingButton, StyledStack, StyledMembersList, StyledButton } from './Common';

export type TeamMember = {
  email: string;
  fullName: string;
  courseName: string;
};

function InviteMembersForm({
  setStep,
  isSinglePayee,
  email,
  team,
  setClientSecret,
  teamMembers,
  setTeamMembers
}: {
  setStep: Function;
  isSinglePayee: boolean;
  email: string;
  team: string;
  setClientSecret: Function;
  teamMembers: TeamMember[];
  setTeamMembers: Function;
}) {
  const buttonText = () => (isSinglePayee ? 'Add Team Member' : 'Send Invite');

  const nextHandler = async () => {
    if (isSinglePayee) {
      const uploadData = new FormData();
      uploadData.append('email', email);
      uploadData.append('team', team);
      uploadData.append('team_members', JSON.stringify(teamMembers));
      await axios.post(`team_registrations/payment_intent.json`, uploadData).then((res) => {
        setClientSecret(res.data.clientSecret);
        setStep();
        console.log(res);
      });
    } else {
      setStep();
    }
  };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required'),
    courseName: Yup.string().required('Course Name is required')
  });

  const formik = useFormik<TeamMember>({
    initialValues: {
      email: '',
      fullName: '',
      courseName: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!isSinglePayee) {
        const uploadData = new FormData();
        uploadData.append('email', values.email);
        uploadData.append('fullName', values.fullName);
        uploadData.append('courseName', values.courseName);
        await axios.post(`team_registrations/team_member_invite.json`, uploadData).then((res) => {
          console.log(res);
        });
      }
      setTeamMembers([
        ...teamMembers,
        { email: values.email, fullName: values.fullName, courseName: values.courseName }
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
                inputProps={{ 'data-testid': 'role-title' }}
                fullWidth
                label="Email"
                error={Boolean(touched.email && errors.email)}
                {...getFieldProps('email')}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'role-title' }}
                fullWidth
                label="Full Name"
                error={Boolean(touched.fullName && errors.fullName)}
                {...getFieldProps('fullName')}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'role-title' }}
                fullWidth
                label="Course Name"
                error={Boolean(touched.courseName && errors.courseName)}
                {...getFieldProps('courseName')}
              />
            </FormControl>
            <StyledLoadingButton
              data-testid="purchase-button"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !values.email || !values.fullName || !values.courseName}
              onClick={() => submitForm()}
            >
              {buttonText()}
            </StyledLoadingButton>
          </StyledStack>
          {teamMembers && teamMembers.length > 0 && (
            <StyledMembersList>
              <TeamMembersList teamMembers={teamMembers} isSinglePayee={isSinglePayee} />
            </StyledMembersList>
          )}
        </Form>
      </FormikProvider>
      <StyledButton
        fullWidth
        variant="contained"
        onClick={nextHandler}
        disabled={teamMembers.length === 0}
      >
        Next
      </StyledButton>
    </Box>
  );
}

export default InviteMembersForm;
