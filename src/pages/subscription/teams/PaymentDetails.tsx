import { Box, Stack, Typography } from '@material-ui/core';
import { StyledTypography, useStyles, StyledDetailsStack } from './Common';
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
  registration: Registration;
}) {
  const classes = useStyles();

  return (
    <Stack className={classes.paymentInfo}>
      <Box className={classes.grainedBackground}>
        <StyledDetailsStack spacing={3}>
          <StyledTypography variant="h4">Your Team Package</StyledTypography>
          <StyledTypography>
            {isSinglePayee
              ? 'Based on the number of people you’ve invited, your team package is:'
              : `${registration.lead_user_name} has invited you to attend ${registration.cohort_host_name}’s cohort ‘${registration.cohort_name}’.`}
          </StyledTypography>
          {!isSinglePayee && (
            <StyledTypography>To attend this course you will be charged:</StyledTypography>
          )}
          <Stack alignItems="center">
            <Typography variant="h4">{`$${amount} USD = ${amount} credits`}</Typography>
            <StyledTypography>which will recur annually</StyledTypography>
          </Stack>
        </StyledDetailsStack>
      </Box>
      {isSinglePayee ? (
        <Box sx={{ maxWidth: '600px', margin: '0px auto' }}>
          <Stack spacing={3} className={classes.mobilePosition}>
            <StyledTypography className={`${classes.font18} ${classes.fontBold}`}>
              {' '}
              Sphere credits provide:{' '}
            </StyledTypography>
            <Stack spacing={1}>
              <li>
                A {teamDiscount * 100}% discount on the price of all course in our library (our
                discounts are volume-based)
              </li>
              <li>Immunity to price increases</li>
              <li>Ongoing access to the Sphere portal (including all recordings and resources)</li>
              <li>Access to Sphere alumni events</li>
            </Stack>
            <StyledTypography>
              You can top up or cancel your subscription at any time.
            </StyledTypography>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ maxWidth: '600px', margin: '0px auto' }}>
          <Stack spacing={3} className={classes.mobilePosition}>
            <StyledTypography>
              Sphere credits can be used to attend our live interactive courses that are led by
              industry experts and joined by likeminded professionals.
            </StyledTypography>
            <StyledTypography>
              Your team at Stripe has approved Sphere as a Learning & Development expense meaning
              they will reimburse the full cost! You can top up or cancel your subscription at any
              time.
            </StyledTypography>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
