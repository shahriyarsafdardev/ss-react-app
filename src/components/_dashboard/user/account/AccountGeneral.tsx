// hooks
import { useState, useEffect } from 'react';

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

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  enrollment_id: string;
  intro_video_url: string;
  discord_invitation_link: string;
  last_recorded_step: number;
  participant_profile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: string;
    current_company: string;
    strengths: string[];
    interests: string[];
  };
};

// ----------------------------------------------------------------------
export default function AccountGeneral() {
  const { user } = useAuth();
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);

  useEffect(() => {
    axios
      .get('/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/home.json', {
        params: { cohort_id: '9550cc85-305a-438c-a115-e791a16c91f0', participant_id: user?.id }
      })
      .then((res) => res.data)
      .then((payload) => {
        setHomeConfig(payload);
      });
  }, [user?.id]);

  const onFormSubmitHandler = async (values: UserProfileProps) => {
    console.log(values);
  };
  return (
    <ProfileForm userProfile={homeConfig?.participant_profile} onSubmit={onFormSubmitHandler} />
  );
}
