import { Stack, Typography, Avatar, useTheme, useMediaQuery } from '@material-ui/core';
import Page from 'components/Page';
import { Logo, useStyles } from './Common';
import {
  IndividualMembershipPaymentDetails,
  OneTimePaymentDetails,
  TeamMembershipPaymentDetails
} from './PaymentOptionDetails';

export default function PaymentSelectionPage() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Page
      width="100%"
      height={`${isDesktop && '100vh'}`}
      title="Sphere Payment"
      className={classes.purpleBackground}
    >
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack
        className={classes.wrapperStack}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        padding={{ xs: '10px', md: '50px', lg: '112px' }}
      >
        <Avatar src="" alt="Logo" className={classes.paymentSelectionAvatar} />
        <Typography className={`${classes.heading} ${classes.whiteFont}`}>
          Pay now to secure your seat
        </Typography>
        <Typography
          textAlign="center"
          className={classes.whiteFont}
          width={{ xs: '100%', md: '80%', lg: '60%' }}
        >
          Stripe has already approved Sphere courses as an L&D expense for teams and individuals at
          Stripe. We provide an invoice for expense purposes. You can get a full refund up to 72
          hours before the date of the first session.
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          width="100%"
          spacing={3}
          justifyContent="space-around"
          alignItems={`${!isDesktop && 'center'}`}
          marginTop={`${isDesktop && '50px'}`}
        >
          <OneTimePaymentDetails />
          <IndividualMembershipPaymentDetails />
          <TeamMembershipPaymentDetails />
        </Stack>
      </Stack>
    </Page>
  );
}
