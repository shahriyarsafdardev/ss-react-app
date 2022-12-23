import axios from 'utils/axios';
import { Grid, Card, Stack, Typography, styled } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useEffect, useState, memo, useCallback } from 'react';
import RegistrationPayment from 'pages/RegistrationPayment';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
import { CohortType } from './Registration';
import Header from './Header';

const CohortDetailsCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '24px',
  marginBottom: '12px'
}));

function CardDetails({
  cohort,
  enrollmentID,
  first_name,
  last_name,
  setStep,
  payLaterMessage,
  trackRegistrationEvent,
  paymentData
}: {
  cohort: CohortType;
  first_name?: string;
  last_name?: string;
  enrollmentID?: string;
  setStep: Function;
  payLaterMessage: string;
  trackRegistrationEvent: Function;
  paymentData: any;
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [customerID, setCustomerID] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const paymentSetup = useCallback(() => {
    axios.get(`/enrollments/${enrollmentID}/payment_intent.json`).then((res) => {
      setClientSecret(res.data.clientSecret);
      setCustomerID(res.data.customerID);
    });
  }, [enrollmentID]);

  useEffect(() => {
    trackRegistrationEvent('Cohort Registration - Payment Info Page - Page Loaded');
    paymentSetup();
  }, []);

  const handleSubmit = useCallback(
    async (paymentMethod: string) => {
      if (enrollmentID && cohort?.id) {
        await axios
          .post(`/cohorts/${cohort?.id}/enrollments/${enrollmentID}/add_payment_details.json`, {
            customerID,
            paymentMethod
          })
          .then((res) => {
            enqueueSnackbar('Card Details submitted', { variant: 'success' });
            trackRegistrationEvent('Cohort Registration - Payment Info Page - Submitted Card');
            setStep(4);
          })
          .catch((error: any) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          });
      } else {
        enqueueSnackbar('Invalid user credentials', { variant: 'error' });
      }
    },
    [enrollmentID, customerID, cohort?.id]
  );

  if (clientSecret === '') {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  const InfoRow = memo(({ title, value }: { title: string; value: string }) => (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={{ mb: 1 }}>
      <Typography sx={{ color: 'text.secondary', fontWeight: 'bolder' }}>{title}:&nbsp;</Typography>
      <Typography>{value}</Typography>
    </Stack>
  ));

  const CohortInfo = () => (
    <CohortDetailsCard>
      <InfoRow title="Course" value={cohort?.name || ''} />
      <InfoRow title="Instructor" value={cohort?.instructor || ''} />
      <InfoRow title="Dates" value={cohort?.dates || 'TBD'} />
      <InfoRow title="Price" value={cohort?.price ? `$${cohort?.price}` : 'TBD'} />
    </CohortDetailsCard>
  );

  return (
    <>
      <Header
        company={paymentData?.company}
        account={paymentData?.account}
        activeStep={paymentData?.activeStep}
        waitlist={paymentData?.wait_listed}
        preRelease={paymentData?.pre_release}
        userName={first_name}
        cohort={cohort}
      />
      <Stack alignContent="center" width={{ xs: '100%', md: '50%' }} alignItems="center">
        <CohortInfo />
        <Grid container spacing={1}>
          <Grid item sx={{ m: 'auto', width: '100%' }}>
            <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <RegistrationPayment
                  clientSecret={clientSecret}
                  cohortCode={cohort?.code}
                  payLaterMessage={payLaterMessage}
                  setStep={setStep}
                  handleSubmit={handleSubmit}
                  trackRegistrationEvent={trackRegistrationEvent}
                  userFullName={`${first_name} ${last_name}`}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default memo(CardDetails);
