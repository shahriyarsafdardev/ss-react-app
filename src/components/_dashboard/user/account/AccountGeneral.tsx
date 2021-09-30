import { useSnackbar } from 'notistack5';

// components
import ProfileForm from 'pages/dashboard/cohorts/Home/ProfileForm';

import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type UserProfileProps = {
  email: string;
  firstName: string;
  lastName: string;
  currentComapny: string;
  photoURL: string;
  interests: [];
  strengths: [];
};

type ParticipantProfile = {
  first_name: string;
  last_name: string;
  linkedin_url: string;
  profile_image_url: File | any;
  current_company: string;
  strengths: string[] | any;
  interests: string[] | any;
};

// ----------------------------------------------------------------------
export default function AccountGeneral() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  console.log(user);
  const participantProfileConfig: ParticipantProfile | undefined = {
    linkedin_url: user?.linkedin_url || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    current_company: user?.current_company || '',
    profile_image_url: user?.profile_image_url || '',
    interests: user?.interests || [],
    strengths: user?.strengths || []
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();

    uploadData.append('first_name', values.first_name);
    uploadData.append('last_name', values.last_name);
    uploadData.append('linkedin_url', values.linkedin_url);
    uploadData.append('current_company', values.current_company);
    uploadData.append('strengths', values.strengths);
    uploadData.append('interests', values.interests);
    uploadData.append('image', values.profile_image_url.image);
    console.log(values.profile_image_url);
    console.log(values);
    await axios
      .post(`users/update_user_profile.json`, uploadData)
      .then((res) => enqueueSnackbar(res.data.message, { variant: res.data.variant }));
  };
  return <ProfileForm userProfile={participantProfileConfig} onSubmit={onFormSubmitHandler} />;
}
