import { Stack, Typography, Avatar } from '@material-ui/core';
import { PaymentRootStyle, Logo, useStyles } from './Common';
import {
  IndividualMembershipPaymentDetails,
  OneTimePaymentDetails,
  TeamMembershipPaymentDetails
} from './PaymentOptionDetails';

export default function PaymentSelectionPage() {
  const classes = useStyles();

  return (
    <PaymentRootStyle title="Sphere Payment" className={classes.purpleBackground}>
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack
        className={classes.wrapperStack}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        paddingX={{ xs: '0px', md: '50px', lg: '112px' }}
      >
        <Avatar
          src=""
          alt="Logo"
          sx={{ width: '72px', height: '72px', border: '1px solid #fff', marginX: 'auto' }}
        />
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
        >
          <OneTimePaymentDetails />
          <IndividualMembershipPaymentDetails />
          <TeamMembershipPaymentDetails />
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
