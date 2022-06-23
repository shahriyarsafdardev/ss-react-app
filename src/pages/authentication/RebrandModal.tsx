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
    width: '500px !important',
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
    color: 'white',
    borderRadius: '8px'
  }
}));

const StyledBox = styled(Stack)(() => ({
  minHeight: '522px',
  padding: '25px',
  borderRadius: '5px',
  backgroundColor: 'white'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '188px',
  height: '48px',
  marginTop: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
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
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ m: 3 }}
                >
                  <img src="/static/scholarsite.png" alt="scholarsite logo" />
                  <ArrowRightAlt
                    fontSize="large"
                    {...ICON_SIZE}
                    sx={{ ml: 3, mr: 3, color: '#E2E8F0' }}
                  />
                  <img src="/static/sphere.png" alt="sphere logo" />
                </Stack>
              </>
            )}
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              ScholarSite now is Sphere
            </Typography>
            <Typography className={classes.modalText}>
              {step === 0
                ? 'We’ve updated our brand to better reflect our vision and product'
                : 'Description of the brand meaning'}
            </Typography>
          </Stack>
          <Stack width="100%">
            {step === 0 ? (
              <Stack justifyContent="center" direction={{ md: 'row' }}>
                <Typography className={classes.blackDot} sx={{ marginRight: '12px' }} />
                <Typography className={classes.whiteDot} />
              </Stack>
            ) : (
              <Stack justifyContent="center" direction={{ md: 'row' }}>
                <Typography className={classes.whiteDot} sx={{ marginRight: '12px' }} />
                <Typography className={classes.blackDot} />
              </Stack>
            )}
            {loading ? (
              <Stack width="100%" height="20%" alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              <Stack
                width="100%"
                alignItems="center"
                justifyContent="space-between"
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ mt: '32px' }}
              >
                {step === 0 ? (
                  <>
                    <StyledButton variant="outlined" onClick={() => handleSubmit()}>
                      Skip
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      className={classes.coloredButton}
                      onClick={() => setStep(1)}
                    >
                      Learn More
                    </StyledButton>
                  </>
                ) : (
                  <Button
                    className={classes.coloredButton}
                    variant="contained"
                    sx={{ width: '100%' }}
                    onClick={() => handleSubmit()}
                  >
                    Finish
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </StyledBox>
      </Modal>
    </>
  );
}
