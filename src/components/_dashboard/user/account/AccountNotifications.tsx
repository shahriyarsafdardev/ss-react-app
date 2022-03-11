import { useSnackbar } from 'notistack5';

// components
import NotificationsForm from './NotificationsForm';
import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type ParticipantProfile = {
  direct_message_notifications: boolean;
  everyone_tag_notifications: boolean;
  channel_summary_email: string;
  upcoming_session_email: boolean;
};

// ----------------------------------------------------------------------
export default function AccountNotifications() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const participantProfileConfig: ParticipantProfile | undefined = {
    direct_message_notifications: user?.direct_message_notifications,
    everyone_tag_notifications: user?.everyone_tag_notifications,
    channel_summary_email: user?.channel_summary_email,
    upcoming_session_email: user?.upcoming_session_email
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
