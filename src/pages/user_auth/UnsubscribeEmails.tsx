import axios from 'utils/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Container, Link, Button, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useSnackbar } from 'notistack5';
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export default function UnsubscribeEmails() {
  const url = new URLSearchParams(useLocation().search);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribed_from_emails = async (email: string) => {
      await axios
        .post('/users/unsubscribed_emails.json', { email })
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          setLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    };
    const email = url.get('email');
    if (email) {
      unsubscribed_from_emails(email);
    }
  }, []);
  return (
    <>
      <RootStyle title="Sphere Unlock account">
        {loading ? (
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
              👋 You have successfully unsubscribed from Sphere emails
            </Typography>
            <Typography align="center" paragraph>
              Note that you will still receive any necessary transactional emails (for example if
              you register for a new cohort!)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="https://www.getsphere.com/pages/contact-us"
              align="center"
            >
              Any questions? Click here to contact Sphere
            </Button>
          </Container>
        )}
      </RootStyle>
    </>
  );
}
