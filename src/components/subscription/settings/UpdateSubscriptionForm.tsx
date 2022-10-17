import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import axios from 'utils/axios';
import { StyledButton } from './Common';
import CreditCounter from './CreditCounter';
import { SubscriptionDetail } from '../../../@types/cohorts';

export default function UpdateSubscriptionForm({
  setModal,
  accountID,
  accountDetails
}: {
  setModal: Function;
  accountID: string | undefined;
  accountDetails: SubscriptionDetail | undefined;
}) {
  const subscription = accountDetails?.subscription;
  const account = accountDetails?.account;

  const [credit, setCredit] = useState(subscription ? subscription?.amount : 0);
  const { enqueueSnackbar } = useSnackbar();

  const currentDate = () => `${new Date().toDateString()}`;

  const handleSubmit = async () => {
    await axios
      .post(`/account_subscriptions/${accountID}/update_subscription.json`, {
        amount: credit
      })
      .then((response) => {
        enqueueSnackbar('Subscription plan updated!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });

    setModal(false);
  };

  return (
    <Card>
      <Stack spacing={4} sx={{ padding: '50px 20px', textAlign: 'center', fontWeight: '500' }}>
        <Typography variant="h5">How many credits would you like per year?</Typography>
        <Stack>
          <Typography>
            You are on a Yearly Plan for {subscription?.amount} Sphere credits.
          </Typography>
          <Typography>You currently have {account?.credit_balance} credits remaining.</Typography>
        </Stack>
        <Stack spacing={1}>
          <CreditCounter credit={credit} setCredit={setCredit} />
          <Typography>credits per year</Typography>
        </Stack>
        <Typography>
          Starting {currentDate()} you will be billed ${credit} for {credit} credits per year.
        </Typography>
        <StyledButton
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: 'auto !important', marginTop: '32px !important' }}
        >
          Update Subscription
        </StyledButton>
      </Stack>
    </Card>
  );
}
