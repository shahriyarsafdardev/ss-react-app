import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { useState } from 'react';
import axios from 'utils/axios';
import { StyledButton } from './Common';
import CreditCounter from './CreditCounter';
import { SubscriptionDetail } from '../../../@types/cohorts';

export default function AddCreditsForm({
  modalType,
  setModal,
  accountID,
  accountDetails
}: {
  modalType: string;
  setModal: Function;
  accountID: string | undefined;
  accountDetails: SubscriptionDetail | undefined;
}) {
  const [credit, setCredit] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const CURRENT_PLAN = 2000;
  const CURRENT_BALANCE = 1500;

  const headerText = () =>
    modalType === 'add'
      ? 'How many credits would you like to add?'
      : 'How many credits would you like per year?';

  const buttonText = () => (modalType === 'add' ? 'Add Credits' : 'Update Subscription');

  const currentDate = () => `${new Date().toDateString()}`;

  const handleSubmit = async () => {
    const api = modalType === 'add' ? 'add_credit' : 'update_subscription';
    await axios
      .post(`/account_subscriptions/${accountID}/${api}.json`, {
        amount: credit
      })
      .then((response) => {
        enqueueSnackbar(
          modalType === 'add' ? 'Credits Added to your account!' : 'Subscription plan updated!',
          { variant: 'success' }
        );
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });

    setModal(false);
  };

  return (
    <Card>
      <Stack spacing={4} sx={{ padding: '50px 20px', textAlign: 'center', fontWeight: '500' }}>
        <Typography variant="h5">{headerText()}</Typography>
        <Stack>
          <Typography>You are on a Yearly Plan for {CURRENT_PLAN} Sphere credits.</Typography>
          <Typography>You currently have {CURRENT_BALANCE} credits remaining.</Typography>
        </Stack>
        <CreditCounter
          modalType={modalType}
          credit={credit}
          setCredit={setCredit}
          currentPlan={CURRENT_PLAN}
          currentBalance={CURRENT_BALANCE}
        />
        {modalType === 'add' && (
          <Typography>
            This will bring your current balance to {CURRENT_BALANCE + credit} credits.
          </Typography>
        )}
        <Stack>
          {modalType === 'add' && <Typography>You will be charged ${credit} today.</Typography>}
          <Typography>
            Starting {currentDate()} you will be billed ${CURRENT_PLAN + credit} for{' '}
            {CURRENT_PLAN + credit} credits per year.
          </Typography>
        </Stack>
        <StyledButton
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: 'auto !important', marginTop: '32px !important' }}
        >
          {buttonText()}
        </StyledButton>
      </Stack>
    </Card>
  );
}
