import axios from 'utils/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
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

export default function UnsubscribeRegistration() {
  const url = new URLSearchParams(useLocation().search);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribed_from_emails = async (enrollment_id: string) => {
      await axios
        .post(`/enrollments/${enrollment_id}/unsubscribe.json`)
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar('Please try again', { variant: 'error' });
        });
    };
    const enrollment_id = url.get('enrollment_id');
    if (enrollment_id) {
      unsubscribed_from_emails(enrollment_id);
    }
  }, []);
  return (
    <>
      <RootStyle title="Sphere Unsubscribe Registration">
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
            <Typography variant="h3" align="center" sx={{ color: 'black' }} paragraph>
              👋 We’re sorry to see you go
            </Typography>
            <Typography align="center" color="text.secondary">
              We will stop all email communication post this point
            </Typography>
          </Container>
        )}
      </RootStyle>
    </>
  );
}
