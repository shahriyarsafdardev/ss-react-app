import { useEffect, useState, memo, useCallback } from 'react';
import { RootState, useSelector } from 'redux/store';
import { Modal } from 'components/animate';

import {
  Card,
  Stack,
  TextField,
  MenuItem,
  ListItemText,
  InputLabel,
  FormControl,
  Select as MaterialSelect,
  Typography,
  Avatar
} from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import MultiSelect from 'components/MultiSelect';
import axios from 'utils/axios';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack5';
import { trackEvent } from 'utils/eventTracking';
import { Cohort } from '../../../@types/cohorts';
import { useStyles } from './Common';

type UserNetworkingProfile = {
  preferred_pronoun: string;
  linkedin_url: string;
  industries: string[];
  role_description: string;
};

const NetworkProfileModal = ({
  networkingModalState,
  setNetworkingModalState,
  cohort
}: {
  networkingModalState: boolean;
  setNetworkingModalState: Function;
  cohort: Cohort;
}) => {
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { preferred_pronoun_options } = useSelector((state: RootState) => state.profileOptions);
  const { industry_options } = useSelector((state: RootState) => state.profileOptions);
  const classes = useStyles();

  useEffect(() => {
    networkingModalState && trackEvent(cohort, 'Networking - Profile Form - Modal Opened');
  }, [networkingModalState]);

  const fillUserValues = useCallback(
    () => ({
      preferred_pronoun: user?.preferred_pronoun || '',
      linkedin_url: user?.linkedin_url || '',
      industries: user?.current_role_category_selections || [],
      role_description: user?.bio_text || ''
    }),
    [user]
  );

  const [infoObject, setInfoObject] = useState<UserNetworkingProfile>(fillUserValues());

  const onUpdateAttribute = async (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    trackEvent(cohort, 'Networking - Profile Form - "Save" Selected');
    const uploadData = new FormData();
    uploadData.append('preferred_pronoun', infoObject.preferred_pronoun);
    uploadData.append('linkedin_url', infoObject.linkedin_url);
    uploadData.append('bio_text', infoObject.role_description);
    uploadData.append('current_role_category_selections', infoObject.industries?.join(', '));

    await axios
      .post('/users/update_networking_selections.json', uploadData)
      .then((res) => {
        updateProfile({ ...user, ...res.data.user });
        setNetworkingModalState(false);
        setIsSubmitting(false);
      })
      .catch((error) => {
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        setIsSubmitting(false);
      });
  }, [infoObject, user]);

  const handleModalClose = () => {
    trackEvent(cohort, 'Networking - Profile Form - Modal Closed');
    setNetworkingModalState(false);
  };

  return (
    <Modal open={networkingModalState} onClose={handleModalClose} id="student-modal">
      <Card sx={{ height: 1 }} className={classes.mainCard}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <Stack>
            <Typography variant="h4">Complete Your profile</Typography>
            <Typography>
              Your profile will be visible to other members of the {cohort?.code}{' '}
              {cohort?.intake_name} cohort. You can edit all details again later in profile
              settings.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: 2, md: 4 }} className={classes.userInfo}>
            <Avatar
              alt={user?.first_name}
              src={user?.profile_image_url}
              className={classes.userAvatar}
            />
            <Stack spacing={1}>
              <Typography variant="h6">{user?.full_name}</Typography>
              <Typography>
                {user?.current_position} @ <b>{user?.current_company}</b>
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="multiple-checkbox-pronoun-label">Preferred Pronoun</InputLabel>
              <MaterialSelect
                data-testid="user-pronoun-label"
                fullWidth
                label="Preferred Pronoun"
                labelId="pronoun-label"
                value={infoObject?.preferred_pronoun}
                onChange={(e) => onUpdateAttribute('preferred_pronoun', e.target.value)}
                sx={{ zIndex: 1500 }}
              >
                {preferred_pronoun_options?.map((pronoun: string) => (
                  <MenuItem key={pronoun} value={pronoun}>
                    <ListItemText primary={pronoun} />
                  </MenuItem>
                ))}
              </MaterialSelect>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                inputProps={{ 'data-testid': 'user-linkedin-url' }}
                fullWidth
                label="LinkedIn URL"
                value={infoObject?.linkedin_url}
                onChange={(e) => onUpdateAttribute('linkedin_url', e.target.value)}
              />
            </FormControl>
            <FormControl data-testid="company-industries-dropdown" fullWidth>
              <MultiSelect
                values={infoObject.industries}
                options={industry_options}
                onChange={(value: string[]) => onUpdateAttribute('industries', value)}
                label="Company Industries"
              />
            </FormControl>
          </Stack>
          <FormControl fullWidth>
            <TextField
              inputProps={{ 'data-testid': 'role-responsibilities' }}
              fullWidth
              label="Brief description of your role and responsibilities?"
              value={infoObject?.role_description}
              onChange={(e) => onUpdateAttribute('role_description', e.target.value)}
              multiline
              rows={3}
            />
          </FormControl>
          <LoadingButton
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit}
            className={classes.modalSubmitButton}
            disabled={
              !(
                infoObject?.preferred_pronoun &&
                infoObject?.linkedin_url &&
                infoObject?.industries.length > 0 &&
                infoObject?.role_description
              )
            }
          >
            Save
          </LoadingButton>
        </Stack>
      </Card>
    </Modal>
  );
};

export default memo(NetworkProfileModal);
