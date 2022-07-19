import { Button, Box } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LinkedinLogin() {
  const redirectUri = 'http://localhost:3001/linkedin-test';
  const scope = 'r_1st_connections_size r_basicprofile r_emailaddress';
  const clientID = '86w0b57g9npjv5';
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const url = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const getUrl = () => {
    const scopeParam = scope ? `&scope=${encodeURI(scope)}` : '';
    const linkedInAuthenLink = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}${scopeParam}&state=34232424`;
    return linkedInAuthenLink;
  };

  useEffect(() => {
    const error = url.get('error');
    const code = url.get('code');
    const getUserProfile = async (code: string) => {
      await axios
        .post('/users/accessToken.json', {
          code
        })
        .then((res: any) => {
          enqueueSnackbar('User data fetched', { variant: 'success' });
          enqueueSnackbar(res?.data?.connections, { variant: 'error' });
          navigate('/linkedin-profile', {
            state: {
              profile: res?.data?.profile
            }
          });
        })
        .catch((error) => {
          enqueueSnackbar(error, {
            variant: 'error'
          });
        });
    };
    if (error) {
      const errorMessage =
        url.get('error_description') || 'Authentication failed. Please try again.';
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
    if (code) {
      getUserProfile(code);
    }
  }, []);

  return (
    <Box
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button variant="contained" href={getUrl()} sx={{ padding: '10px' }}>
        Login With Linkedin
      </Button>
    </Box>
  );
}
