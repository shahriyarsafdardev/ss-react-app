import { useSnackbar } from 'notistack5';

// components
import ProfileForm from 'pages/dashboard/business/ProfileForm';
import useAuth from '../../../../hooks/useAuth';

// axios
import axios from '../../../../utils/axios';

type ParticipantProfile = {
  first_name: string;
  last_name: string;
  profile_image_url: File | any;
};

// ----------------------------------------------------------------------
export default function AccountGeneral() {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();

    uploadData.append('first_name', values.first_name);
    uploadData.append('last_name', values.last_name);
    values?.profile_image_url?.image && uploadData.append('image', values.profile_image_url.image);

    await axios.post(`users/update_business_user.json`, uploadData).then((res) => {
      enqueueSnackbar(res.data.message, { variant: res.data.variant });
      updateProfile({ ...res.data.user });
    });
  };

  return (
    <ProfileForm
      userProfile={{
        first_name: user?.first_name,
        last_name: user?.last_name,
        profile_image_url: user?.profile_image_url
      }}
      onSubmit={onFormSubmitHandler}
    />
  );
}
