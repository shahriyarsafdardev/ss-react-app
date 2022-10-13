import { Button, Stack, styled, Typography } from '@material-ui/core';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-outline';
import Icon from '@iconify/react';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  border: '1px solid #B1B8BF',
  color: '#B1B8BF',
  cursor: 'pointer',
  minWidth: '45px',
  minHeight: '45px',
  boxShadow: '0 0 10px #7a8ef880'
}));

export default function CreditCounter({
  modalType,
  credit,
  setCredit,
  currentPlan,
  currentBalance
}: {
  modalType: string;
  credit: number;
  setCredit: Function;
  currentPlan: number;
  currentBalance: number;
}) {
  return (
    <>
      <Stack spacing={1}>
        {modalType === 'add' && <Typography>Add</Typography>}
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <StyledButton
            sx={{}}
            onClick={() => setCredit(credit - 50)}
            disabled={modalType === 'add' ? credit <= 0 : credit + currentPlan <= 0}
          >
            <Icon icon={minusFill} style={{ width: '100%', height: '100%' }} />
          </StyledButton>
          <Typography variant="h2">
            {modalType === 'add' ? credit : credit + currentPlan}
          </Typography>
          <StyledButton onClick={() => setCredit(credit + 50)}>
            <Icon icon={plusFill} style={{ width: '100%', height: '100%' }} />
          </StyledButton>
        </Stack>
        <Typography>{modalType === 'add' ? 'credits today' : 'credits per year'}</Typography>
      </Stack>
    </>
  );
}
