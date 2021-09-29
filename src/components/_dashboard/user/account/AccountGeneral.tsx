// components
import ProfileForm from 'pages/dashboard/cohorts/Home/ProfileForm';

import useAuth from '../../../../hooks/useAuth';

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
  profile_image_url: string;
  current_company: string;
  strengths: string[];
  interests: string[];
};

// ----------------------------------------------------------------------
export default function AccountGeneral() {
  const { user } = useAuth();
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

  const onFormSubmitHandler = async (values: UserProfileProps) => {
    console.log(values);
  };
  return <ProfileForm userProfile={participantProfileConfig} onSubmit={onFormSubmitHandler} />;
}
