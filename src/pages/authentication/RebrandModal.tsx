import { Modal } from 'components/animate';
import { useState, useEffect } from 'react';
import { ArrowRightAlt } from '@material-ui/icons';
import axios from 'utils/axios';
import { makeStyles } from '@material-ui/styles';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack5';
import { styled, Theme } from '@material-ui/core/styles';
import { CircularProgress, Typography, Stack, Button } from '@material-ui/core';

const ICON_SIZE = {
  width: 20,
  height: 20
};

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
  },
  modalText: {
    textAlign: 'center',
    fontsize: '16px',
    color: '#94A3B8',
    marginBottom: '32px'
  },
  blackDot: {
    width: '8px',
    height: '8px',
    borderRadius: '10px',
    backgroundColor: 'black'
  },
  whiteDot: {
    width: '8px',
    height: '8px',
    borderRadius: '10px',
    backgroundColor: '#E2E8F0'
  },
  coloredButton: {
    backgroundColor: '#240046',
    color: 'white'
  }
}));

const StyledBox = styled(Stack)(() => ({
  minHeight: '510px',
  padding: '25px',
  borderRadius: '5px',
  backgroundColor: 'white'
}));

const ColoredButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '45px',
  color: theme.palette.getContrastText('#240046'),
  backgroundColor: '#240046',
  '&:hover': {
    backgroundColor: '#5A189A'
  }
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '45px',
  color: '#240046',
  borderColor: '#240046',
  '&:hover': {
    backgroundColor: '#5A189A',
    color: 'white'
  }
}));

export default function RebrandModal() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const newUser: any = { ...user };
  const [step, setStep] = useState<number>(0);
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
          <Stack width="100%">
            {step === 0 ? (
              <>
                <img src="/static/rebrand.png" alt="rebrandModal" width="100%" />
              </>
            ) : (
              <>
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ m: 3 }}>
                  <img src="/static/scholarsite.png" alt="scholarsite logo" height="40" />
                  <ArrowRightAlt
                    fontSize="large"
                    {...ICON_SIZE}
                    sx={{ ml: 3, mr: 3, color: '#E2E8F0' }}
                  />
                  <img src="/static/logo.svg" alt="sphere logo" height="44" />
                </Stack>
              </>
            )}
            <Typography variant="h6" align="center" sx={{ mt: 2, mb: '16px' }}>
              ScholarSite now is Sphere
            </Typography>
            {step === 0 ? (
              <Typography className={classes.modalText}>
                We’ve updated our brand to better reflect our vision and product
              </Typography>
            ) : (
              <>
                <Typography className={classes.modalText}>
                  A new brand identity is our next step toward becoming the largest decentralized
                  corporate university.
                </Typography>
                <Typography className={classes.modalText}>
                  Sphere is a modern iteration of the university for working professionals —
                  virtual, accessible, and revolutionary.
                </Typography>
              </>
            )}
          </Stack>
          <Stack width="100%">
            <Stack justifyContent="center" direction="row" spacing={2}>
              <Typography className={step === 0 ? classes.blackDot : classes.whiteDot} />
              <Typography className={step === 0 ? classes.whiteDot : classes.blackDot} />
            </Stack>
            {loading ? (
              <Stack width="100%" height="20%" alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              <Stack
                width="100%"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ mt: '32px' }}
              >
                {step === 0 ? (
                  <>
                    <OutlinedButton
                      variant="outlined"
                      sx={{ color: '#240046' }}
                      onClick={() => handleSubmit()}
                    >
                      Skip
                    </OutlinedButton>
                    <ColoredButton variant="contained" onClick={() => setStep(1)}>
                      Learn More
                    </ColoredButton>
                  </>
                ) : (
                  <ColoredButton
                    className={classes.coloredButton}
                    variant="contained"
                    sx={{ width: '100%' }}
                    onClick={() => handleSubmit()}
                  >
                    Finish
                  </ColoredButton>
                )}
              </Stack>
            )}
          </Stack>
        </StyledBox>
      </Modal>
    </>
  );
}
