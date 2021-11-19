import { useSnackbar } from 'notistack5';

// components
import NetworkingForm from './NetworkingForm';
import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type ParticipantProfile = {
  roles: string[] | any;
  industries: string[] | any;
  strengths: string[] | any;
  interests: string[] | any;
  is_interested_in_networking: boolean;
  networking_role_preferences: string[] | any;
  is_interested_in_mentoring: boolean;
};

// ----------------------------------------------------------------------
export default function AccountNetworking() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const participantProfileConfig: ParticipantProfile | undefined = {
    industries: user?.industries || [],
    roles: user?.roles || [],
    interests: user?.interests || [],
    strengths: user?.strengths || [],
    is_interested_in_networking: user?.is_interested_in_networking,
    networking_role_preferences: user?.networking_role_preferences || [],
    is_interested_in_mentoring: user?.is_interested_in_mentoring
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();
    uploadData.append(
      'is_interested_in_networking',
      values.is_interested_in_networking ? 'Yes' : 'No'
    );
    uploadData.append('networking_role_preferences', values.networking_role_preferences);
    uploadData.append(
      'is_interested_in_mentoring',
      values.is_interested_in_mentoring ? 'Yes' : 'No'
    );
    uploadData.append('strengths', values.strengths);
    uploadData.append('interests', values.interests);

    await axios.post(`users/update_networking_profile.json`, uploadData).then((res) => {
      enqueueSnackbar(res.data.message, { variant: res.data.variant });
      updateProfile({ ...res.data.user });
    });
  };
  return <NetworkingForm userProfile={participantProfileConfig} onSubmit={onFormSubmitHandler} />;
}
