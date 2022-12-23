import { Stack, Box, Typography, Button, useTheme, useMediaQuery, Avatar } from '@material-ui/core';
import { memo, useEffect } from 'react';
import { trackEvent } from 'utils/eventTracking';
import { PaymentRootStyle, Logo, useStyles } from './Common';
import { Company } from './ExpenseCheckerPage';

function ApprovedCompanyPage({
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
    trackEvent(cohort, 'L&D Approval Checker - Approved Company - Page Opened', {
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
          spacing={3}
        >
          <Avatar src={company?.logo_url} alt={company?.name} sx={{ width: 112, height: 112 }} />
          <Typography className={`${classes.heading} ${classes.whiteFont}`}>
            {company?.name} has approved Sphere courses as an L&D expense
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" className={classes.paymentData}>
          <Box className={classes.fullWidthCenter}>
            <Stack spacing={3}>
              <Typography className={classes.toggleFont}>
                Several {company?.name} teams & individuals have attended Sphere courses and
                expensed the full cost to their L&D budget.
              </Typography>
              <Typography className={classes.toggleFont}>
                You can secure your seat now by enrolling below.
              </Typography>
              <Button
                variant="contained"
                className={classes.enrollButton}
                onClick={() => handleEnroll}
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

export default memo(ApprovedCompanyPage);
