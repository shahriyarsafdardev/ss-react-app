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

export default function DeferRegistration() {
  const url = new URLSearchParams(useLocation().search);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deferRegistration = async (enrollment_id: string) => {
      await axios
        .post(`/enrollments/${enrollment_id}/defer.json`)
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar('Please try again', { variant: 'error' });
        });
    };
    const enrollment_id = url.get('enrollment_id');
    if (enrollment_id) {
      deferRegistration(enrollment_id);
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
              👋 We’ll make sure to keep you in the loop!
            </Typography>
            <Typography align="center" color="text.secondary">
              You will receive email reminders about future cohorts
            </Typography>
          </Container>
        )}
      </RootStyle>
    </>
  );
}
