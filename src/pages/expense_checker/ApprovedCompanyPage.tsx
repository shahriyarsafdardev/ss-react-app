import { Stack, Box, Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RootState, useSelector } from 'redux/store';
import { trackEvent } from 'utils/eventTracking';
import { PaymentRootStyle, Logo, useStyles, StyledImage } from './Common';

export default function ApprovedCompanyPage({ handleEnroll }: { handleEnroll: Function }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohortID === cohort.id)[0]
  );

  useEffect(() => {
    trackEvent(cohort, 'L&D Approval Checker - Approved Company - Page Opened', {
      Company: company
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
          <StyledImage
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-s-logo.png"
            alt="sphere-logo"
          />
          <Typography className={`${classes.heading} ${classes.whiteFont}`}>
            Stripe has approved Sphere courses as an L&D expense
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" className={classes.paymentData}>
          <Box className={classes.fullWidthCenter}>
            <Stack spacing={3}>
              <Typography className={classes.toggleFont}>
                Several Stripe teams & individuals have attended Sphere courses and expensed the
                full cost to their L&D budget.
              </Typography>
              <Typography className={classes.toggleFont}>
                You can secure your seat now by enrolling below.
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
