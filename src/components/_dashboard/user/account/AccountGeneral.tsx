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
  preferred_pronoun: string;
  current_position: string;
  current_role_category_selections: string[] | any;
  current_industry_category_selections: string[] | any;
  strengths: string[] | any;
  interests: string[] | any;
  bio_text: string;
  new_user: boolean;
  accepted_terms: boolean;
  popup_viewed: boolean;
  new_instructor: boolean;
  opened_announcement: boolean;
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[] | any;
  company_image_url: string;
  number_of_employees: string;
  email: string;
};

// ----------------------------------------------------------------------
export default function AccountGeneral() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const participantProfileConfig: ParticipantProfile | undefined = {
    linkedin_url: user?.linkedin_url || '',
    email: user?.email || '',
    discord_url: user?.discord_url || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    current_company: user?.current_company || '',
    preferred_pronoun: user?.preferred_pronoun || '',
    current_position: user?.current_position || '',
    profile_image_url: user?.profile_image_url || '',
    current_industry_category_selections: user?.current_industry_category_selections || [],
    current_role_category_selections: user?.current_role_category_selections || [],
    interests: user?.interests || [],
    strengths: user?.strengths || [],
    bio_text: user?.bio_text || '',
    new_user: user?.new_user || false,
    accepted_terms: user?.accepted_terms || true,
    popup_viewed: user?.popup_viewed || true,
    opened_announcement: user?.opened_announcement || true,
    new_instructor: user?.new_instructor || false,
    opted_in_for_matching_suggestions: user?.opted_in_for_matching_suggestions,
    networking_matching_preferences: user?.networking_matching_preferences || [],
    company_image_url: user?.company_image_url,
    number_of_employees: user?.number_of_employees
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();

    uploadData.append('first_name', values.first_name);
    uploadData.append('last_name', values.last_name);
    uploadData.append('linkedin_url', values.linkedin_url);
    uploadData.append('discord_url', values.discord_url);
    uploadData.append('current_company', values.current_company);
    uploadData.append('preferred_pronoun', values.preferred_pronoun);
    uploadData.append('current_position', values.current_position);
    uploadData.append('email', values.email);
    uploadData.append('current_role_category_selections', values.current_role_category_selections);
    uploadData.append(
      'opted_in_for_matching_suggestions',
      values.opted_in_for_matching_suggestions ? 'Yes' : 'No'
    );
    uploadData.append('networking_matching_preferences', values.networking_matching_preferences);
    uploadData.append(
      'current_industry_category_selections',
      values.current_industry_category_selections
    );
    uploadData.append('strengths', values.strengths);
    uploadData.append('interests', values.interests);
    uploadData.append('image', values.profile_image_url.image);
    uploadData.append('bio_text', values.bio_text);

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
