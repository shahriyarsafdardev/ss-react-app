import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import axios from 'utils/axios';
import { updateSubscription } from 'redux/slices/accountSubscription';
import { useDispatch } from 'redux/store';
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

  const [credit, setCredit] = useState(subscription ? subscription?.yearly_credit_amount : 2000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const currentDate = () => `${new Date().toDateString()}`;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await axios
      .post(`/account_subscriptions/${accountID}/update_subscription.json`, {
        amount: credit
      })
      .then((response) => {
        dispatch(updateSubscription(response.data));
        enqueueSnackbar('Subscription plan updated!', { variant: 'success' });
        setIsSubmitting(false);
        setModal(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Ops! Something went wrong', { variant: 'error' });
      });
  };

  return (
    <Card>
      <Stack spacing={4} sx={{ padding: '50px 20px', textAlign: 'center', fontWeight: '500' }}>
        <Typography variant="h5">How many credits would you like per year?</Typography>
        <Stack>
          <Typography>
            You are on a Yearly Plan for {subscription?.yearly_credit_amount || 0} Sphere credits.
          </Typography>
          <Typography>
            You currently have {account?.credit_balance || 0} credits remaining.
          </Typography>
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
          loading={isSubmitting}
          onClick={handleSubmit}
          sx={{ margin: 'auto !important', marginTop: '32px !important' }}
        >
          Update Subscription
        </StyledButton>
      </Stack>
    </Card>
  );
}
