import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Grid,
  Card,
  Stack,
  FormControl,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import { styled } from '@material-ui/core/styles';
import { memo } from 'react';

interface InitialState {
  marketing_emails: boolean;
  direct_message_notifications: boolean;
  everyone_tag_notifications: boolean;
  session_reminder_emails: boolean;
  channel_summary_email: string;
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const OptionStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '-11px !important'
}));

const OptionHeading = styled(Typography)(({ theme }) => ({
  color: '#071A33'
}));

const OptionText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#637381',
  marginLeft: '10px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0px'
  }
}));

function NotificationsForm({
  onSubmit,
  userProfile
}: {
  onSubmit: Function;
  userProfile: {
    marketing_emails: boolean;
    direct_message_notifications: boolean;
    everyone_tag_notifications: boolean;
    session_reminder_emails: boolean;
    channel_summary_email: string;
  };
}) {
  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      marketing_emails: userProfile.marketing_emails,
      direct_message_notifications: userProfile.direct_message_notifications,
      everyone_tag_notifications: userProfile.everyone_tag_notifications,
      session_reminder_emails: userProfile.session_reminder_emails,
      channel_summary_email: userProfile.channel_summary_email
    },
    onSubmit: async (values, { resetForm }) => {
      await onSubmit({
        marketing_emails: values.marketing_emails,
        direct_message_notifications: values.direct_message_notifications,
        everyone_tag_notifications: values.everyone_tag_notifications,
        session_reminder_emails: values.session_reminder_emails,
        channel_summary_email: values.channel_summary_email
      });
    }
  });
  const { isSubmitting, handleSubmit, getFieldProps, values } = formik;

  return (
    <>
      <br />
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="profile-form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1} sx={{ marginBottom: '40px' }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 4 }}>
                  <Typography sx={{ fontWeight: '600', color: '#071A33' }}>
                    Which email notifications would you like to receive from Sphere?
                  </Typography>
                  <Stack spacing={2}>
                    <OptionStack>
                      <Checkbox
                        color="primary"
                        {...getFieldProps('marketing_emails')}
                        checked={values.marketing_emails}
                        disabled={!userProfile.marketing_emails}
                      />
                      <Stack direction={{ xs: 'column', md: 'row' }}>
                        <OptionHeading>Marketing</OptionHeading>
                        <OptionText>(Information about upcoming cohorts)</OptionText>
                      </Stack>
                    </OptionStack>
                    <OptionStack>
                      <Checkbox
                        color="primary"
                        {...getFieldProps('direct_message_notifications')}
                        checked={values.direct_message_notifications}
                      />
                      <Stack direction={{ xs: 'column', md: 'row' }}>
                        <OptionHeading>Direct messages</OptionHeading>
                        <OptionText>
                          (Sent from instructors, assistants and peers directly to you)
                        </OptionText>
                      </Stack>
                    </OptionStack>
                    <OptionStack>
                      <Checkbox
                        color="primary"
                        {...getFieldProps('everyone_tag_notifications')}
                        checked={values.everyone_tag_notifications}
                      />
                      <Stack direction={{ xs: 'column', md: 'row' }}>
                        <OptionHeading>Messaging @everyone tag</OptionHeading>
                        <OptionText>
                          (If someone tags everyone in a channel you are a part of)
                        </OptionText>
                      </Stack>
                    </OptionStack>
                    <OptionStack>
                      <Checkbox
                        color="primary"
                        {...getFieldProps('session_reminder_emails')}
                        checked={values.session_reminder_emails}
                      />
                      <Stack direction={{ xs: 'column', md: 'row' }}>
                        <OptionHeading>Session reminders</OptionHeading>
                        <OptionText>
                          (Reminders 24 hours and 1 hour before, as well as after the recording has
                          been released)
                        </OptionText>
                      </Stack>
                    </OptionStack>
                    <FormControl component="fieldset">
                      <Stack direction={{ xs: 'column', md: 'row' }}>
                        <OptionHeading>What you missed</OptionHeading>
                        <OptionText>
                          (A summary you will receive if you have unread messages)
                        </OptionText>
                      </Stack>
                      <RadioGroup defaultValue="daily" {...getFieldProps('channel_summary_email')}>
                        <FormControlLabel
                          sx={{ paddingLeft: '20px !important' }}
                          control={<Radio />}
                          value="Daily (if you have unread messages)"
                          label="Daily"
                        />
                        <FormControlLabel
                          sx={{ paddingLeft: '20px !important' }}
                          control={<Radio />}
                          value="Monday, Wednesday & Friday (if you have unread messages)"
                          label="Monday, Wednesday & Friday"
                        />
                        <FormControlLabel
                          sx={{ paddingLeft: '20px !important' }}
                          control={<Radio />}
                          value="Weekly"
                          label="Weekly"
                        />
                        <FormControlLabel
                          sx={{ paddingLeft: '20px !important' }}
                          control={<Radio />}
                          value="Disabled"
                          label="Disabled"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  <StyledLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    id="btn-submit"
                  >
                    Save Changes
                  </StyledLoadingButton>
                  <Typography sx={{ fontWeight: '600', color: '#071A33' }}>
                    Need more help? Contact us{' '}
                    <a
                      href="https://www.getsphere.com/pages/contact-us"
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                    .
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}

export default memo(NotificationsForm);
