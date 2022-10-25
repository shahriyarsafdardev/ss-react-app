import { useState, useEffect } from 'react';
import { Stack, TextField, FormControl, Typography, styled } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { UploadAvatar } from 'components/upload';
import axios from 'utils/axios';
import MUICreatableSelect from 'components/MUICreatableSelect';
import { useDispatch } from 'redux/store';
import { markOnboardingStep } from 'redux/slices/cohort';
import { LoadingButton } from '@material-ui/lab';

type BasicProfile = {
  first_name: string;
  last_name: string;
  role: string;
  company: string;
  profile_image_url: string;
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
  setProfileFormSubmitted
}: {
  setProfileFormSubmitted: Function;
}) {
  const { user } = useAuth();

  const fillUserValues = () => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    role: user?.current_position || '',
    company: user?.current_company || '',
    profile_image_url: user?.profile_image_url || ''
  });

  const [infoObject, setInfoObject] = useState<BasicProfile>(fillUserValues());
  const [companies, setCompanies] = useState<any[]>([]);
  const cohort_id = window.location.pathname.split('/')[2] || '';
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

  const handleSubmit = () => {
    setIsSubmitting(true);
    dispatch(markOnboardingStep(cohort_id, 'onboarding_messaging_step_completed'));
    setProfileFormSubmitted(true);
    setIsSubmitting(false);
  };

  const handleDrop = (files: any) => {
    onUpdateAttribute('profile_image_url', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  return (
    <StyledStack spacing={{ xs: 2, md: 4 }}>
      <UploadAvatar
        accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
        file={infoObject?.profile_image_url}
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
        <TextField
          inputProps={{ 'data-testid': 'user-role' }}
          fullWidth
          label="Role"
          value={infoObject?.role}
          onChange={(e) => onUpdateAttribute('role', e.target.value)}
        />
        <FormControl data-testid="company-name" fullWidth>
          <MUICreatableSelect
            options={companies?.map((company: any) => company?.name)}
            value={infoObject?.company || ''}
            onChange={(value: any) => onUpdateAttribute('company', value)}
            label="Select or create company name"
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
            infoObject?.profile_image_url
          )
        }
      >
        Save Details
      </StyledLoadingButton>
    </StyledStack>
  );
}
