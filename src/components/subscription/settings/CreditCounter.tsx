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
  credit,
  setCredit
}: {
  credit: number;
  setCredit: Function;
}) {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <StyledButton onClick={() => setCredit(credit - 50)} disabled={credit <= 0}>
          <Icon icon={minusFill} style={{ width: '100%', height: '100%' }} />
        </StyledButton>
        <Typography variant="h2">${credit}</Typography>
        <StyledButton onClick={() => setCredit(credit + 50)}>
          <Icon icon={plusFill} style={{ width: '100%', height: '100%' }} />
        </StyledButton>
      </Stack>
    </>
  );
}
