import { useSnackbar } from 'notistack5';

// components
import NetworkingForm from './NetworkingForm';
import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type ParticipantProfile = {
  current_role_category_selections: string[] | any;
  current_industry_category_selections: string[] | any;
  strengths: string[] | any;
  interests: string[] | any;
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[] | any;
  is_interested_in_mentoring: boolean;
};

// ----------------------------------------------------------------------
export default function AccountNetworking() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const participantProfileConfig: ParticipantProfile | undefined = {
    current_industry_category_selections: user?.current_industry_category_selections || [],
    current_role_category_selections: user?.current_role_category_selections || [],
    interests: user?.interests || [],
    strengths: user?.strengths || [],
    opted_in_for_matching_suggestions: user?.opted_in_for_matching_suggestions,
    networking_matching_preferences: user?.networking_matching_preferences || [],
    is_interested_in_mentoring: user?.is_interested_in_mentoring
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();
    uploadData.append(
      'opted_in_for_matching_suggestions',
      values.opted_in_for_matching_suggestions ? 'Yes' : 'No'
    );
    uploadData.append('networking_matching_preferences', values.networking_matching_preferences);
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
