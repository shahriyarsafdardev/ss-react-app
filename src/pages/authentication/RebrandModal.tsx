import { Modal } from 'components/animate';
import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { makeStyles } from '@material-ui/styles';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack5';
import { styled, Theme } from '@material-ui/core/styles';
import { CircularProgress, Typography, Stack, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  rebrandModal: {
    width: '450px !important',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '70% !important'
    },
    [theme.breakpoints.down('sm')]: {
      width: '95% !important'
    }
  }
}));

const StyledBox = styled(Stack)(() => ({
  minHeight: '510px',
  padding: '25px',
  borderRadius: '5px',
  backgroundColor: 'white'
}));

const StyledText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontsize: '16px',
  lineHeight: '24px',
  color: '#94A3B8'
}));

export default function RebrandModal() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const newUser: any = { ...user };
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user && !user?.popup_viewed) {
      setOpen(true);
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(`/users/popup_viewed.json`)
      .then((res) => {
        updateProfile({ ...newUser, popup_viewed: true });
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleSubmit();
        }}
        zIndex={1400}
        className={classes.rebrandModal}
      >
        <StyledBox alignItems="center" justifyContent="space-between">
          <Stack width="100%" spacing={3} alignItems="center" justifyContent="center">
            <img src="/static/rebrand.png" alt="rebrandModal" width="100%" />
            <Typography variant="h6" align="center" sx={{ my: 3, color: '#1E293B' }}>
              ScholarSite is now Sphere!
            </Typography>
            <StyledText>
              A new brand identity is our next step toward becoming the largest decentralized
              corporate university.
            </StyledText>
            <StyledText>
              Sphere is a modern iteration of the university for working professionals — virtual,
              accessible, and revolutionary.
            </StyledText>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSubmit()}
                data-testid="explore-btn"
              >
                Start Exploring
              </Button>
            )}
          </Stack>
        </StyledBox>
      </Modal>
    </>
  );
}
