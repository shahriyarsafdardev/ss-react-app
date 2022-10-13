import { Card, Stack, Typography } from '@material-ui/core';
import { useState } from 'react';
import { StyledButton } from './Common';
import CreditCounter from './CreditCounter';

export default function AddCreditsForm({
  modalType,
  setModal
}: {
  modalType: string;
  setModal: Function;
}) {
  const [credit, setCredit] = useState(0);
  const CURRENT_PLAN = 2000;
  const CURRENT_BALANCE = 1500;

  const headerText = () =>
    modalType === 'add'
      ? 'How many credits would you like to add?'
      : 'How many credits would you like per year?';

  const buttonText = () => (modalType === 'add' ? 'Add Credits' : 'Update Subscription');

  return (
    <Card>
      <Stack spacing={4} sx={{ padding: '50px 20px', textAlign: 'center', fontWeight: '500' }}>
        <Typography variant="h5">{headerText()}</Typography>
        <Stack>
          <Typography>You are on a Yearly Plan for ${CURRENT_PLAN} Sphere credits.</Typography>
          <Typography>You currently have ${CURRENT_BALANCE} credits remaining.</Typography>
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
            This will bring your current balance to ${CURRENT_BALANCE + credit} credits.
          </Typography>
        )}
        <Stack>
          {modalType === 'add' && <Typography>You will be charged ${credit} today.</Typography>}
          <Typography>
            Starting Jan 14, 2024 you will be billed $ {CURRENT_PLAN + credit} for{' '}
            {CURRENT_PLAN + credit} credits per year.
          </Typography>
        </Stack>
        <StyledButton
          variant="contained"
          onClick={() => setModal(false)}
          sx={{ margin: 'auto !important', marginTop: '32px !important' }}
        >
          {buttonText()}
        </StyledButton>
      </Stack>
    </Card>
  );
}
