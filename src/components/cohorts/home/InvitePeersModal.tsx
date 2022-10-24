import {
  FormControl,
  TextField,
  Button,
  Stack,
  styled,
  Card,
  Typography,
  Avatar
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import Modal from 'components/animate/Modal';
import useAuth from 'hooks/useAuth';
import { useStyles } from './Common';

export type ReferralTypeUser = {
  email: string;
  fullName: string;
};

const StyledStack = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '39px 28px',
  marginBottom: '20px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  height: '40px',
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const StyledButton = styled(Button)(({ theme }) => ({
  width: '270px',
  height: '40px',
  borderRadius: '30px',
  margin: 'auto !important',
  marginTop: '40px !important',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center'
}));

export default function InvitePeersModal({
  invitePeersModalState,
  setInvitePeersModalState,
  onFinish
}: {
  invitePeersModalState: boolean;
  setInvitePeersModalState: Function;
  onFinish: Function;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    fullName: Yup.string().required('Full Name is required')
  });

  const formik = useFormik<ReferralTypeUser>({
    initialValues: {
      email: '',
      fullName: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await axios
        .post(`/send_referrals_email.json`, {
          referee_email: values.email,
          referee_name: values.fullName,
          source: 'registration-referral'
        })
        .then((res) => {
          setSubmitting(false);
          resetForm();
          enqueueSnackbar('Referral Invite sent!', { variant: 'success' });
        })
        .catch((error: any) => {
          setSubmitting(false);
          console.log(error);
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  });

  const { values, errors, touched, isSubmitting, getFieldProps, submitForm, isValid } = formik;

  return (
    <Modal
      open={invitePeersModalState}
      onClose={() => {
        setInvitePeersModalState(false);
      }}
      id="student-modal"
    >
      <Card className={classes.peersModalCard}>
        <Stack spacing={{ xs: 2, md: 4 }}>
          <Stack spacing={1}>
            <Avatar
              alt={user?.first_name}
              src={user?.profile_image_url}
              className={classes.peerModalAvatar}
            />
            <StyledTypography variant="h4">Learn collaboratively with your team</StyledTypography>
            <StyledTypography>
              and apply the learnings to the problems you're facing
            </StyledTypography>
          </Stack>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <StyledTypography sx={{ marginBottom: '10px' }}>
                Enter your colleague’s email and name and we will send them an invite to the course.
              </StyledTypography>
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
                <StyledLoadingButton
                  data-testid="purchase-button"
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  disabled={!isValid || !values.email || !values.fullName}
                  onClick={() => submitForm()}
                >
                  Send Invite
                </StyledLoadingButton>
              </StyledStack>
            </Form>
          </FormikProvider>
          <StyledButton fullWidth variant="contained" color="primary" onClick={() => onFinish()}>
            Finish
          </StyledButton>
        </Stack>
      </Card>
    </Modal>
  );
}
