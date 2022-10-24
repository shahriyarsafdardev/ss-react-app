import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';

import { Card, Stack, TextField, FormControl, Typography, Grid, Button } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { UploadAvatar } from 'components/upload';
import axios from 'utils/axios';
import MUICreatableSelect from 'components/MUICreatableSelect';
import { useStyles } from './Common';

type BasicProfile = {
  first_name: string;
  last_name: string;
  role: string;
  company: string;
  profile_image_url: string;
};

export default function BasicProfileModal({
  profileModalState,
  setProfileModalState
}: {
  profileModalState: boolean;
  setProfileModalState: Function;
}) {
  const { user } = useAuth();
  const classes = useStyles();

  const fillUserValues = () => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    role: user?.current_position || '',
    company: user?.current_company || '',
    profile_image_url: user?.profile_image_url || ''
  });

  const [infoObject, setInfoObject] = useState<BasicProfile>(fillUserValues());
  const [companies, setCompanies] = useState<any[]>([]);

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
    setProfileModalState(false);
  };

  const handleDrop = (files: any) => {
    onUpdateAttribute('profile_image_url', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  return (
    <Modal
      open={profileModalState}
      onClose={() => {
        setProfileModalState(false);
      }}
      id="student-modal"
    >
      <Card sx={{ height: 1 }} className={classes.mainCard}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Before you send a message, add some basic information about yourself so [Instructor] and
            your peers will know who you are.
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Card data-testid="user-avatar-upload" sx={{ py: 10, px: 3, textAlign: 'center' }}>
                <UploadAvatar
                  accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
                  file={infoObject?.profile_image_url}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
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
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onSubmit={handleSubmit}
            className={classes.modalSubmitButton}
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
          </Button>
        </Stack>
      </Card>
    </Modal>
  );
}
