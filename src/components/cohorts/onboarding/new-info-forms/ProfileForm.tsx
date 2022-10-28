import { useState, useEffect } from 'react';
import { Stack, TextField, FormControl, Typography, styled } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { UploadAvatar } from 'components/upload';
import axios from 'utils/axios';
import MUICreatableSelect from 'components/MUICreatableSelect';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { updateOnboardingData } from 'redux/slices/cohort';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack5';

type BasicProfile = {
  first_name: string;
  last_name: string;
  role: string;
  company: string;
  profile_image: any;
};

const StyledStack = styled(Stack)(({ theme }) => ({
  margin: 'auto',
  padding: '20px',
  width: '35%',
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  }
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px'
}));

export default function ProfileForm({
  setProfileFormSubmitted,
  cohortID
}: {
  setProfileFormSubmitted: Function;
  cohortID: string;
}) {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const fillUserValues = () => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    role: user?.current_position || '',
    company: user?.current_company || '',
    profile_image: { preview: user?.profile_image_url || '' }
  });

  const [infoObject, setInfoObject] = useState<BasicProfile>(fillUserValues());
  const [companies, setCompanies] = useState<any[]>([]);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const roleOptions = useSelector((state: RootState) => state?.profileOptions?.role_options);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onUpdateAttribute = async (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  useEffect(() => {
    axios
      .get('/cohorts/select_fields_data.json')
      .then((res) => res.data)
      .then((payload) => {
        payload?.companies && setCompanies(payload.companies);
      });
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const uploadData = new FormData();
    uploadData.append('first_name', infoObject.first_name);
    uploadData.append('last_name', infoObject.last_name);
    uploadData.append('current_company', infoObject.company);
    uploadData.append('current_position', infoObject.role);
    uploadData.append('cohort_id', cohortID);
    infoObject?.profile_image?.image &&
      uploadData.append('image', infoObject?.profile_image?.image);

    await axios
      .post('/users/update_profile.json', uploadData)
      .then((res) => {
        dispatch(updateOnboardingData(cohort_id, res.data.onboarding_data));
        updateProfile({ ...user, ...res.data.user });
        setProfileFormSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        setIsSubmitting(false);
      });
  };

  const handleDrop = (files: any) => {
    onUpdateAttribute('profile_image', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  return (
    <StyledStack spacing={{ xs: 2, md: 4 }}>
      <UploadAvatar
        accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
        file={infoObject?.profile_image}
        maxSize={3145728}
        onDrop={handleDrop}
        caption={
          <Typography
            variant="caption"
            sx={{
              mx: 'auto',
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            Profile Picture
          </Typography>
        }
      />
      <Stack spacing={3}>
        <TextField
          inputProps={{ 'data-testid': 'user-first-name' }}
          fullWidth
          label="First Name"
          value={infoObject?.first_name}
          onChange={(e) => onUpdateAttribute('first_name', e.target.value)}
        />
        <TextField
          inputProps={{ 'data-testid': 'user-last-name' }}
          fullWidth
          label="Last Name"
          value={infoObject?.last_name}
          onChange={(e) => onUpdateAttribute('last_name', e.target.value)}
        />
        <FormControl data-testid="user-role" fullWidth>
          <MUICreatableSelect
            options={roleOptions}
            value={infoObject?.role || ''}
            onChange={(value: any) => onUpdateAttribute('role', value)}
            label="Role"
            isCreatable={false}
          />
        </FormControl>
        <FormControl data-testid="company-name" fullWidth>
          <MUICreatableSelect
            options={companies?.map((company: any) => company?.name)}
            value={infoObject?.company || ''}
            onChange={(value: any) => onUpdateAttribute('company', value)}
            label="Company Name"
          />
        </FormControl>
      </Stack>
      <StyledLoadingButton
        variant="contained"
        onClick={() => handleSubmit()}
        loading={isSubmitting}
        disabled={
          !(
            infoObject?.first_name &&
            infoObject?.last_name &&
            infoObject?.role &&
            infoObject?.company &&
            infoObject?.profile_image
          )
        }
      >
        Save Details
      </StyledLoadingButton>
    </StyledStack>
  );
}
