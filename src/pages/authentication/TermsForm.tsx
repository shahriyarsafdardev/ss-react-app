import axios from 'utils/axios';
import { useState, useEffect } from 'react';
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
  Link,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';

const StyledParagraph = styled('p')(() => ({
  cursor: 'pointer',
  fontSize: '11px',
  textAlign: 'center',
  textDecoration: 'underline'
}));

const StyledBox = styled(Box)(() => ({
  padding: '1.5rem 2.5rem',
  maxWidth: '700px'
}));

const StyledButton = styled(Button)(() => ({
  marginRight: '0.5rem',
  marginLeft: '0.5rem',
  marginBottom: '1rem'
}));

export default function TermsForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile, logout } = useAuth();
  const newUser: any = { ...user };
  const [step, setStep] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && !user?.accepted_terms) {
      setOpen(true);
    }
  }, [user]);
  const [loading, setLoading] = useState(!user);

  const handleSubmit = async (value: boolean) => {
    setLoading(true);
    if (value) {
      await axios
        .post(`/users/accept_terms.json`)
        .then((res) => {
          updateProfile({ ...newUser, accepted_terms: true });
          enqueueSnackbar(res.data.message, { variant: 'success' });
          setLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    } else {
      await axios
        .delete(`/users/${user?.id}.json`)
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          logout();
          setLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  };
  return (
    <>
      <Dialog open={open} maxWidth={false}>
        <StyledBox>
          <DialogTitle sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
            {step === 0 ? (
              <>👋 Hi {user?.first_name}, we wanted to keep you in the loop!</>
            ) : (
              <>⚠️ Are you sure? You will loose your access?</>
            )}
          </DialogTitle>
          <DialogContent>
            <Typography align="center" sx={{ fontSize: '15px', mt: 2 }}>
              {step === 0 ? (
                <>
                  We’re focused on improving our services and your experience as a user. To address
                  some of the changes in our services, and to make our policies more transparent and
                  understandable for you, we’re updating our{' '}
                  <Link
                    noWrap
                    target="_blank"
                    sx={{ textDecoration: 'underline', fontWeight: '600' }}
                    href="https://drive.google.com/file/d/13U6OfPHszRJZZ_chqbxzRUhXom4bl4OW/view"
                  >
                    Terms of Use
                  </Link>{' '}
                  and{' '}
                  <Link
                    noWrap
                    target="_blank"
                    sx={{ textDecoration: 'underline', fontWeight: '600' }}
                    href="https://drive.google.com/file/d/1YWShpHXXsyye8RXZDzgRQNEekdVu8ZiN/view"
                  >
                    Privacy Policy.
                  </Link>{' '}
                  Please be sure to read the full set of updated terms.
                </>
              ) : (
                <>
                  Are you sure you want to continue? In respect of your privacy, we will permanently
                  destroy all data and records associated with your account. This means you will no
                  longer have access to session materials, community discussions, and upcoming
                  events. To use ScholarSite’s services again, you will have to start with a fresh
                  account.
                </>
              )}
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
                  {step === 0 ? (
                    <>
                      <StyledButton
                        fullWidth
                        href="https://www.scholarsite.io/pages/get-in-touch"
                        variant="outlined"
                      >
                        Contact ScholarSite
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        fullWidth
                        onClick={() => handleSubmit(true)}
                      >
                        Accept and Continue
                      </StyledButton>
                    </>
                  ) : (
                    <>
                      <StyledButton
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => handleSubmit(false)}
                      >
                        Delete My Account
                      </StyledButton>
                      <StyledButton variant="contained" fullWidth onClick={() => setStep(0)}>
                        Back
                      </StyledButton>
                    </>
                  )}
                </Stack>
                {step == 0 && (
                  <StyledParagraph onClick={() => setStep(1)}>
                    If you are not comfortable with these updates you can delete your ScholarSite
                    account
                  </StyledParagraph>
                )}
              </Stack>
            )}
          </DialogActions>
        </StyledBox>
      </Dialog>
    </>
  );
}
