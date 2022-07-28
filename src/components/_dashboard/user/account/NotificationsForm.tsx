import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  MenuItem,
  FormControl,
  ListItemText,
  InputLabel,
  Select as MaterialSelect
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';

interface InitialState {
  direct_message_notifications: string;
  everyone_tag_notifications: string;
  channel_summary_email: string;
  upcoming_session_email: string;
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const SelectFiled = ({
  value,
  options,
  onChange,
  label
}: {
  value: string;
  options: string[];
  onChange: Function;
  label: string;
}) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <MaterialSelect
      label={label}
      fullWidth
      onChange={(e) => onChange(e.target.value)}
      defaultValue={value}
    >
      {options?.map((value: string) => (
        <MenuItem key={value} value={value}>
          <ListItemText primary={value} />
        </MenuItem>
      ))}
    </MaterialSelect>
  </FormControl>
);

export default function NetworkingForm({
  onSubmit,
  userProfile
}: {
  onSubmit: Function;
  userProfile: {
    direct_message_notifications: boolean;
    everyone_tag_notifications: boolean;
    channel_summary_email: string;
    upcoming_session_email: boolean;
  };
}) {
  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      direct_message_notifications: userProfile.direct_message_notifications
        ? 'Enabled'
        : 'Disabled',
      everyone_tag_notifications: userProfile.everyone_tag_notifications ? 'Enabled' : 'Disabled',
      channel_summary_email: userProfile.channel_summary_email,
      upcoming_session_email: userProfile.upcoming_session_email ? 'Enabled' : 'Disabled'
    },
    onSubmit: async (values) => {
      await onSubmit({
        direct_message_notifications: values.direct_message_notifications === 'Enabled',
        everyone_tag_notifications: values.everyone_tag_notifications === 'Enabled',
        channel_summary_email: values.channel_summary_email,
        upcoming_session_email: values.upcoming_session_email === 'Enabled'
      });
    }
  });
  const { values, isSubmitting, handleSubmit, setFieldValue } = formik;
  const commonOptions = ['Enabled', 'Disabled'];
  const routineOptions = ['Daily', 'Weekly', 'Disabled'];

  return (
    <>
      <br />
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction="column" spacing={2}>
                    <SelectFiled
                      label="Email notifications for direct messages"
                      options={commonOptions}
                      value={values.direct_message_notifications}
                      onChange={(value: string) =>
                        setFieldValue('direct_message_notifications', value)
                      }
                    />
                    <SelectFiled
                      label="Email notifications for @everyone tag"
                      options={commonOptions}
                      value={values.everyone_tag_notifications}
                      onChange={(value: string) =>
                        setFieldValue('direct_message_notifications', value)
                      }
                    />
                    <SelectFiled
                      label="Channel summary email"
                      options={routineOptions}
                      value={values.channel_summary_email}
                      onChange={(value: string) =>
                        setFieldValue('direct_message_notifications', value)
                      }
                    />
                    {/* <SelectFiled
                      label="Upcoming session reminder"
                      options={commonOptions}
                      value={values.upcoming_session_email}
                      onChange={(value: string) =>
                        setFieldValue('direct_message_notifications', value)
                      }
                    /> */}
                  </Stack>
                </Stack>
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
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
