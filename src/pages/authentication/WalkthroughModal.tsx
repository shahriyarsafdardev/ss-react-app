import { Modal } from 'components/animate';
import { useState } from 'react';
import axios from 'utils/axios';
import { makeStyles } from '@material-ui/styles';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack5';
import { styled, Theme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  walkthroughModal: {
    width: '70% !important',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '80% !important'
    },
    [theme.breakpoints.down('sm')]: {
      width: '95% !important'
    }
  }
}));

const StyledVideoPreview = styled('video')(({ theme }) => ({
  borderRadius: '20px'
}));

export default function WalkthroughModal() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const newUser: any = { ...user };
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (user && user.new_instructor) {
      setLoading(true);
      walkthroughViewed();
    } else {
      setOpen(false);
    }
  };

  const walkthroughViewed = async () => {
    await axios
      .post(`/users/walkthrough_viewed.json`)
      .then((res) => {
        updateProfile({ ...newUser, new_instructor: false });
        setOpen(false);
        setLoading(false);
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
        className={classes.walkthroughModal}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <StyledVideoPreview
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere_portal_walkthrough.mp4"
            controlsList="nodownload"
            autoPlay={false}
            width="100%"
            controls
          />
        )}
      </Modal>
    </>
  );
}
