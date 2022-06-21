import axios from 'utils/axios';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Container, Button, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useSnackbar } from 'notistack5';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export default function UnblockUser() {
  const url = new URLSearchParams(useLocation().search);
  const { enqueueSnackbar } = useSnackbar();
  const [lock, setLock] = useState(true);

  useEffect(() => {
    const unlock_user = async (token: string) => {
      await axios
        .post('/users/unlock_user_account.json', { token })
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          setLock(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    };
    const token = url.get('reset_password_token');
    if (token) {
      unlock_user(token);
    }
  }, []);
  return (
    <>
      <RootStyle title="Sphere Unlock account">
        {lock ? (
          <Box padding="200px">
            <LoadingScreen />
          </Box>
        ) : (
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant="h3" align="center" paragraph>
              🎉 Congratulations
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Your account has been unlocked successfully.
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              You can now login into your account.
            </Typography>
            <Button variant="contained" color="primary" component={RouterLink} to={PATH_AUTH.login}>
              Continue to Login
            </Button>
          </Container>
        )}
      </RootStyle>
    </>
  );
}
