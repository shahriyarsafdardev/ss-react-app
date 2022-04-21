import { styled } from '@material-ui/core/styles';
import { Divider, Typography, Stack } from '@material-ui/core';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

const StyledLabel = styled('p')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary
}));

export default function PaymentSummary({ payment }: { payment: any }) {
  return (
    <RootStyle>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Payment Details
      </Typography>

      <Stack spacing={2}>
        <Stack direction="column" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Cohort:
          </Typography>
          <StyledLabel>{payment?.cohort}</StyledLabel>
        </Stack>

        <Stack direction="column" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Seat Price:
          </Typography>
          <StyledLabel>${payment?.amount}</StyledLabel>
        </Stack>

        <Stack direction="column" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            No. of Seats:
          </Typography>
          <StyledLabel>{payment?.count}</StyledLabel>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Amount
          </Typography>
          <Typography variant="h6" component="p">
            ${payment.amount * payment.count}
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
