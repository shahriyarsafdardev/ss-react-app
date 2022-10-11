import { FormControl, TextField, Box } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState } from 'react';
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
  isSinglePayee
}: {
  setStep: Function;
  isSinglePayee: boolean;
}) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const buttonText = () => (isSinglePayee ? 'Add Team Member' : 'Send Invite');

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
    onSubmit: (values, { resetForm }) => {
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
        onClick={() => {
          setStep();
        }}
      >
        Next
      </StyledButton>
    </Box>
  );
}

export default InviteMembersForm;
