import { Stack, Box, Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { trackEvent } from 'utils/eventTracking';
import { PaymentRootStyle, Logo, useStyles } from './Common';
import { Company } from './ExpenseCheckerPage';

export default function NewCompanyPage({
  handleEnroll,
  company,
  cohort
}: {
  handleEnroll: Function;
  company: Company;
  cohort: any;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    trackEvent(cohort, 'L&D Approval Checker - New Company - Page Opened', {
      Company: company?.name
    });
  }, []);

  return (
    <PaymentRootStyle title="Sphere | Expense Approval Checker">
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack direction={{ xs: 'column', md: 'row' }} className={classes.wrapperStack}>
        <Stack
          className={`${classes.paymentData} ${isDesktop && classes.purpleBackground}`}
          alignItems="center"
        >
          <Typography className={`${classes.heading} ${classes.whiteFont}`}>
            🚀 We don’t have any {company?.name} alumni, but you could be the first!
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
