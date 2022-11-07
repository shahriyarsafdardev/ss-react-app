import { Stack, Box, Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { PaymentRootStyle, Logo, useStyles } from './Common';

export default function NewCompanyPage({ handleEnroll }: { handleEnroll: Function }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <PaymentRootStyle title="Sphere | Expense Approval Checker">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} className={classes.wrapperStack}>
        <Stack
          className={`${classes.paymentData} ${isDesktop && classes.purpleBackground}`}
          alignItems="center"
        >
          <Typography className={`${classes.heading} ${classes.whiteFont}`}>
            🚀 We don’t have any Stripe alumni, but you could be the first!
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" className={classes.paymentData}>
          <Box className={classes.fullWidthCenter}>
            <Stack spacing={3}>
              <Typography className={classes.toggleFont}>
                All of our courses start with one employer expensing the cose.{' '}
              </Typography>
              <Button
                variant="contained"
                className={classes.enrollButton}
                onClick={() => handleEnroll()}
              >
                Enroll
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </PaymentRootStyle>
  );
}
