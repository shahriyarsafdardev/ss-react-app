import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useContext, useState } from 'react';
import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
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
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const currentDate = () => `${new Date().toDateString()}`;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await axios
      .post(`/credit_subscriptions/${accountID}/update_subscription.json`, {
        amount: credit
      })
      .then((response) => {
        const eventName =
          response?.data?.subscription.yearly_credit_amount >
          (subscription?.yearly_credit_amount || 0)
            ? 'increased'
            : 'decreased';
        dispatch(updateSubscription(response.data));
        sendAnalyticsData(
          `Balance Page - Subscription Tab - Edit Subscription Modal - Subscription ${eventName}`,
          {
            'Subscription Amount Before': subscription?.yearly_credit_amount || 0,
            'Subscription Amount Added': credit,
            'Subscription Amount After':
              subscription?.yearly_credit_amount && subscription?.yearly_credit_amount + credit
          }
        );
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
        <Typography variant="h5">Edit your Sphere subscription</Typography>
        <Stack>
          <Typography>
            You are on a Yearly Plan for ${subscription?.yearly_credit_amount || 0}. You currently
            have ${account?.credit_balance || 0} remaining.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <CreditCounter credit={credit} setCredit={setCredit} />
          <Typography>per year</Typography>
        </Stack>
        <Typography>
          Starting {currentDate()} you will be billed ${credit} per year.
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
