import { Stack, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { StyledTypography, SubscriptionDetails, useStyles } from './Common';
import { Registration } from './TeamRegistration';

export default function PaymentDetails({
  amount,
  isSinglePayee,
  teamDiscount,
  registration
}: {
  amount: number;
  isSinglePayee: boolean;
  teamDiscount: number;
  registration?: Registration;
}) {
  const classes = useStyles();
  const totalAmount = registration?.cohort_id ? registration?.cohort_price : amount;
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Stack className={`${classes.paymentData} ${classes.purpleBackground}`}>
        <Stack alignItems="center" spacing={3}>
          <StyledTypography variant="h4">Your Team Subscription</StyledTypography>
          <StyledTypography style={{ fontWeight: 500 }}>
            {isSinglePayee
              ? ''
              : `${registration?.lead_user_name} has invited you to attend ${registration?.cohort_host_name}’s cohort ‘${registration?.cohort_name}’.`}
          </StyledTypography>
          {!isSinglePayee && (
            <StyledTypography>To attend this course you will be charged:</StyledTypography>
          )}
          <Stack alignItems="center" sx={{ marginBottom: '30px' }}>
            <Typography variant="h4">{`$${totalAmount} USD`}</Typography>
            <StyledTypography>which will recur annually</StyledTypography>
          </Stack>
        </Stack>
        {desktopView && (
          <SubscriptionDetails isSinglePayee={isSinglePayee} teamDiscount={teamDiscount} />
        )}
      </Stack>
    </>
  );
}
