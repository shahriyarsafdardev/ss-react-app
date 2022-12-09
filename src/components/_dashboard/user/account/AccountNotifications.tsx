import { useSnackbar } from 'notistack5';

// components
import NotificationsForm from './NotificationsForm';
import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type ParticipantProfile = {
  marketing_emails: boolean;
  direct_message_notifications: boolean;
  everyone_tag_notifications: boolean;
  session_reminder_emails: boolean;
  channel_summary_email: string;
};

// ----------------------------------------------------------------------
export default function AccountNotifications() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const participantProfileConfig: ParticipantProfile | undefined = {
    marketing_emails: user?.marketing_emails,
    direct_message_notifications: user?.direct_message_notifications,
    everyone_tag_notifications: user?.everyone_tag_notifications,
    session_reminder_emails: user?.session_reminder_emails,
    channel_summary_email: user?.channel_summary_email
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    await axios
      .post(`users/update_notifications_options.json`, values)
      .then((res) => {
        enqueueSnackbar('Notifications Settings Saved', { variant: 'success' });
        updateProfile({ ...res.data.user });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
        enqueueSnackbar('Please try submitting again', { variant: 'error' });
      });
  };
  return (
    <NotificationsForm userProfile={participantProfileConfig} onSubmit={onFormSubmitHandler} />
  );
}
