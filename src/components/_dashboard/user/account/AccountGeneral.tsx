import { useSnackbar } from 'notistack5';

// components
import ProfileForm from 'pages/dashboard/cohorts/Home/ProfileForm';
import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type ParticipantProfile = {
  first_name: string;
  last_name: string;
  linkedin_url: string;
  discord_url: string;
  profile_image_url: File | any;
  current_company: string;
  current_position: string;
  strengths: string[] | any;
  interests: string[] | any;
  introduction: string;
};

// ----------------------------------------------------------------------
export default function AccountGeneral() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const participantProfileConfig: ParticipantProfile | undefined = {
    linkedin_url: user?.linkedin_url || '',
    discord_url: user?.discord_url || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    current_company: user?.current_company || '',
    current_position: user?.current_position || '',
    profile_image_url: user?.profile_image_url || '',
    interests: user?.interests || [],
    strengths: user?.strengths || [],
    introduction: user?.introduction || ''
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();

    uploadData.append('first_name', values.first_name);
    uploadData.append('last_name', values.last_name);
    uploadData.append('linkedin_url', values.linkedin_url);
    uploadData.append('discord_url', values.discord_url);
    uploadData.append('current_company', values.current_company);
    uploadData.append('current_position', values.current_position);
    uploadData.append('strengths', values.strengths);
    uploadData.append('interests', values.interests);
    uploadData.append('image', values.profile_image_url.image);
    uploadData.append('introduction', values.introduction);
    await axios.post(`users/update_user_profile.json`, uploadData).then((res) => {
      enqueueSnackbar(res.data.message, { variant: res.data.variant });
      updateProfile({ ...res.data.user });
    });
  };
  return (
    <ProfileForm
      userProfile={participantProfileConfig}
      isOnboardingModal={false}
      onSubmit={onFormSubmitHandler}
    />
  );
}
