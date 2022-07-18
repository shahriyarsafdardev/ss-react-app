import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Container, Typography, useMediaQuery } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import axios from 'utils/axios';
// components
import Page from '../components/Page';
import { PaymentSummary, PaymentCardDetails } from '../components/_external-pages/payment';

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

export default function Payment() {
  const theme = useTheme();
  const navigate = useNavigate();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [link, setLink] = useState<any>(null);
  // const [navigate, setNavigate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const url = new URLSearchParams(useLocation().search);
  const linkID = url.get('link_id');
  const cohort_code: string = url.get('cohort_code') || '';
  const intake_name: string = url.get('intake_name') || '';
  const email: string = url.get('email') || '';
  const isUserPayment: boolean = !!(cohort_code && email && intake_name);

  useEffect(() => {
    const fetchLinkDetails = async (endpoint: string) => {
      await axios
        .get(endpoint)
        .then((res) => {
          setLink(res.data);
          setLoading(false);
        })
        .catch((error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
          navigate('/');
        });
    };
    if (isUserPayment) {
      fetchLinkDetails(
        `/payments/payment_details.json?cohort_code=${cohort_code}&intake_name=${intake_name}&email=${email}`
      );
    } else if (linkID) {
      fetchLinkDetails(`/payments/${linkID}.json`);
    } else {
      navigate('/');
    }
  }, []);

  const onSuccess = () => {
    navigate('/');
    enqueueSnackbar('Payment Completed Successfully', { variant: 'success' });
  };

  const onFailure = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  if (loading || !link) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <RootStyle title="Sphere Cohort Payment">
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Sphere Checkout.
          </Typography>
        </Box>

        <Card>
          <Grid container spacing={upMd ? 5 : 2}>
            <Grid item xs={12} md={4}>
              <PaymentSummary payment={link} />
            </Grid>
            <Grid item xs={12} md={8}>
              <PaymentCardDetails
                linkID={isUserPayment ? link?.enrollment_id : linkID}
                onFailure={onFailure}
                onSuccess={onSuccess}
                isUserPayment={isUserPayment}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </RootStyle>
  );
}
