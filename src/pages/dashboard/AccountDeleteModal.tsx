import axios from 'utils/axios';
import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import useAuth from 'hooks/useAuth';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';

const StyledBox = styled(Box)(() => ({
  padding: '1.5rem 2.5rem',
  maxWidth: '700px'
}));

const StyledButton = styled(Button)(() => ({
  marginRight: '0.5rem',
  marginLeft: '0.5rem',
  marginBottom: '1rem'
}));

export default function AccountDeleteModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: Function;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(!user);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .delete(`/users/${user?.id}.json`)
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: 'success' });
        logout();
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };
  return (
    <>
      <Dialog open={open} maxWidth={false}>
        <StyledBox>
          <DialogTitle sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
            ⚠️ Are you sure? You will loose your access?
          </DialogTitle>
          <DialogContent>
            <Typography align="center" sx={{ fontSize: '15px', mt: 2 }}>
              Are you sure you want to continue? In respect of your privacy, we will permanently
              destroy all data and records associated with your account. This means you will no
              longer have access to session materials, community discussions, and upcoming events.
              To use ScholarSite’s services again, you will have to start with a fresh account.
            </Typography>
          </DialogContent>
          <DialogActions>
            {loading ? (
              <Stack width="100%" height="20%" alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              <Stack width="100%" spacing={2}>
                <Stack flexDirection={{ xs: 'column', md: 'row' }}>
                  <StyledButton
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={() => handleSubmit()}
                  >
                    Delete My Account
                  </StyledButton>
                  <StyledButton variant="contained" fullWidth onClick={() => onClose()}>
                    Back
                  </StyledButton>
                </Stack>
              </Stack>
            )}
          </DialogActions>
        </StyledBox>
      </Dialog>
    </>
  );
}
