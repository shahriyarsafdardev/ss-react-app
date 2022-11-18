import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useContext, useState } from 'react';
import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import { useDispatch } from 'redux/store';
import { updateSubscription } from 'redux/slices/accountSubscription';
import { StyledButton } from './Common';
import CreditCounter from './CreditCounter';
import { SubscriptionDetail } from '../../../@types/cohorts';

export default function AddCreditsForm({
  setModal,
  accountID,
  accountDetails
}: {
  setModal: Function;
  accountID: string | undefined;
  accountDetails: SubscriptionDetail | undefined;
}) {
  const [credit, setCredit] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const subscription = accountDetails?.subscription;
  const account = accountDetails?.account;
  const dispatch = useDispatch();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const currentDate = () => `${new Date().toDateString()}`;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await axios
      .post(`/credit_subscriptions/${accountID}/add_credit.json`, {
        amount: credit
      })
      .then((response) => {
        dispatch(updateSubscription(response.data));
        sendAnalyticsData('Balance Page - Subscription Tab - Top Up Modal - Credits added', {
          'Credit Amount Before': account?.credit_balance || 0,
          'Credit Amount Added': credit,
          'Credit Amount After': response?.data?.account?.credit_balance
        });
        enqueueSnackbar('Credits Added to your account!', { variant: 'success' });
        setIsSubmitting(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Ops! Something went wrong', { variant: 'error' });
      });

    setModal(false);
  };

  return (
    <Card>
      <Stack spacing={4} sx={{ padding: '50px 20px', textAlign: 'center', fontWeight: '500' }}>
        <Typography variant="h5">Top up your Sphere subscription</Typography>
        <Stack>
          <Typography>
            You are on a Yearly Plan of ${subscription?.yearly_credit_amount || 0}. You currently
            have ${account?.credit_balance || 0} remaining.
          </Typography>
          <Typography />
        </Stack>
        <Stack spacing={1}>
          <Typography>Add</Typography>
          <CreditCounter credit={credit} setCredit={setCredit} />
          <Typography>today</Typography>
        </Stack>
        <Typography>
          This will bring your current balance to ${account && account?.credit_balance + credit}
        </Typography>
        <Stack>
          <Typography>You will be charged ${credit} today.</Typography>
          <Typography>
            Starting {currentDate()} you will be billed $
            {subscription && subscription?.yearly_credit_amount + credit} per year.
          </Typography>
        </Stack>
        <StyledButton
          variant="contained"
          onClick={handleSubmit}
          loading={isSubmitting}
          sx={{ margin: 'auto !important', marginTop: '32px !important' }}
        >
          Top Up
        </StyledButton>
      </Stack>
    </Card>
  );
}
