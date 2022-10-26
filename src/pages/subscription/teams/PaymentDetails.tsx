import { Box, Stack, styled, Typography } from '@material-ui/core';
import { StyledTypography, useStyles } from './Common';
import { Registration } from './TeamRegistration';

const Logo = styled('img')(({ theme }) => ({
  width: '150px',
  paddingTop: '20px',
  paddingLeft: '20px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

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

  return (
    <Box className={classes.paymentInfo}>
      {/* <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" /> */}
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        sx={{ color: 'white' }}
      >
        <Stack alignItems="center" spacing={3}>
          <StyledTypography variant="h4">Your Team Package</StyledTypography>
          <StyledTypography style={{ fontWeight: 500 }}>
            {isSinglePayee
              ? 'Based on the number of people you’ve invited, your team package is:'
              : `${registration?.lead_user_name} has invited you to attend ${registration?.cohort_host_name}’s cohort ‘${registration?.cohort_name}’.`}
          </StyledTypography>
          {!isSinglePayee && (
            <StyledTypography>To attend this course you will be charged:</StyledTypography>
          )}
          <Stack alignItems="center">
            <Typography variant="h4">{`$${totalAmount} USD`}</Typography>
            <StyledTypography>which will recur annually</StyledTypography>
          </Stack>
        </Stack>
        <Box sx={{ mt: 4, maxWidth: '650px' }}>
          <Stack spacing={3} className={classes.mobilePosition}>
            <>
              {isSinglePayee ? (
                <>
                  <StyledTypography>Sphere current subscription provides:</StyledTypography>
                  <Stack spacing={1}>
                    <li>
                      A {Math.floor(teamDiscount * 100)}% discount on the price of all course in our
                      library
                    </li>
                    <li>
                      Ongoing access to the Sphere portal (including all recordings and resources)
                    </li>
                    <li>Access to Sphere alumni events</li>
                    <li>You can adjust or cancel your subscription at any time.</li>
                  </Stack>
                </>
              ) : (
                <>
                  <StyledTypography style={{ fontWeight: 'bold' }}>
                    Your team at Stripe has approved Sphere as a Learning & Development expense
                    meaning they will reimburse the full cost! You can top up or cancel your
                    subscription at any time.
                  </StyledTypography>
                  <StyledTypography>
                    Your balance can be used to attend our live interactive courses that are led by
                    industry experts and joined by likeminded professionals.
                  </StyledTypography>
                </>
              )}
            </>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
