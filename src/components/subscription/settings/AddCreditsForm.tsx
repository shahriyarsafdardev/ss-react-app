import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import axios from 'utils/axios';
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
  const { enqueueSnackbar } = useSnackbar();
  const subscription = accountDetails?.subscription;
  const account = accountDetails?.account;

  const currentDate = () => `${new Date().toDateString()}`;

  const handleSubmit = async () => {
    await axios
      .post(`/account_subscriptions/${accountID}/add_credit.json`, {
        amount: credit
      })
      .then((response) => {
        enqueueSnackbar('Credits Added to your account!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });

    setModal(false);
  };

  return (
    <Card>
      <Stack spacing={4} sx={{ padding: '50px 20px', textAlign: 'center', fontWeight: '500' }}>
        <Typography variant="h5">How many credits would you like to add?</Typography>
        <Stack>
          <Typography>
            You are on a Yearly Plan for {subscription?.amount} Sphere credits.
          </Typography>
          <Typography>You currently have {account?.credit_balance} credits remaining.</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography>Add</Typography>
          <CreditCounter credit={credit} setCredit={setCredit} />
          <Typography>credits today</Typography>
        </Stack>
        <Typography>
          This will bring your current balance to {account && account?.credit_balance + credit}{' '}
          credits.
        </Typography>
        <Stack>
          <Typography>You will be charged ${credit} today.</Typography>
          <Typography>
            Starting {currentDate()} you will be billed $
            {subscription && subscription?.amount + credit} for{' '}
            {subscription && subscription?.amount + credit} credits per year.
          </Typography>
        </Stack>
        <StyledButton
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: 'auto !important', marginTop: '32px !important' }}
        >
          Add Credits
        </StyledButton>
      </Stack>
    </Card>
  );
}
