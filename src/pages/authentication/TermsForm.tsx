import axios from 'utils/axios';
import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import useAuth from 'hooks/useAuth';
import { Container, Card, CircularProgress, Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import TermsCheckBox from 'components/TermsCheckBox';

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20%'
}));

export default function TermsForm({ onClose }: { onClose: Function }) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const newUser: any = { ...user };

  const [loading, setLoading] = useState(!user);

  const handleSubmit = async (value: boolean) => {
    if (value) {
      setLoading(true);
      await axios
        .post(`/users/accept_terms.json`)
        .then((res) => {
          updateProfile({ ...newUser, accepted_terms: true });
          enqueueSnackbar(res.data.message, { variant: 'success' });
          setLoading(false);
          onClose();
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  };
  return (
    <>
      <Card sx={{ p: 4, height: 1, overflow: 'visible' }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h3" align="center" paragraph>
            Terms and Conditions have been updated
          </Typography>
          {loading ? (
            <StyledCircularLoader>
              <CircularProgress />
            </StyledCircularLoader>
          ) : (
            <TermsCheckBox value={false} onChange={(value: boolean) => handleSubmit(value)} />
          )}
        </Container>
      </Card>
    </>
  );
}
