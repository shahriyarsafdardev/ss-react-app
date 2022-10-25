import { Stack, Box, Typography, styled } from '@material-ui/core';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '33%',
  borderBottom: '1px solid black',
  [theme.breakpoints.down('md')]: {
    width: '22%'
  }
}));

export default function PaymentDivider() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ marginTop: '30px' }}
    >
      <StyledBox />
      <Typography>or pay by card</Typography>
      <StyledBox />
    </Stack>
  );
}
