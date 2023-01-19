import { Button, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { memo, useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { StyledCheckIcon, useStyles } from './Common';

const PlanPointStack = ({ description }: { description: string }) => (
  <Stack direction="row" alignItems="flex-start">
    <StyledCheckIcon
      src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
      alt="check icon"
    />
    <Typography>{description}</Typography>
  </Stack>
);

export const OneTimePaymentDetails = memo(
  ({
    cohortID,
    hostName,
    price,
    enrollmentID
  }: {
    cohortID: string;
    hostName: string;
    price: number;
    enrollmentID: string;
  }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { sendAnalyticsData } = useContext(AnalyticsContext);

    const handleCoursePaymentSelected = () => {
      sendAnalyticsData('Cohort Registration - Payment Choice - Course Payment Selected', {});
      navigate(`/registration/course-payment?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`);
    };

    return (
      <Stack className={classes.whiteStackCard} spacing={3}>
        <Stack>
          <Typography className={classes.planOptionHead}>One Time Payment</Typography>
          <Typography className={classes.planPriceDetails}>${Math.floor(price)}</Typography>
        </Stack>
        <Stack className={classes.optionsStack} spacing={1}>
          <PlanPointStack description="Access to live sessions" />
          <PlanPointStack description="Lifetime access to course materials and community" />
        </Stack>
        <Button
          variant="contained"
          className={`${classes.submitButton} ${classes.paymentOptionButton}`}
          onClick={handleCoursePaymentSelected}
        >
          Select
        </Button>
      </Stack>
    );
  }
);

export const IndividualMembershipPaymentDetails = memo(
  ({
    cohortID,
    hostName,
    price,
    enrollmentID
  }: {
    cohortID: string;
    hostName: string;
    price: number;
    enrollmentID: string;
  }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { sendAnalyticsData } = useContext(AnalyticsContext);

    const handleSubscriptionPaymentSelected = () => {
      sendAnalyticsData('Cohort Registration - Payment Choice - Subscription Payment Selected', {});
      navigate(
        `/registration/subscription-payment?cohort_id=${cohortID}&enrollment_id=${enrollmentID}&amount=${Math.floor(
          price * 0.95
        )}`
      );
    };

    return (
      <Stack className={classes.whiteStackCard} spacing={3}>
        <Stack>
          <Typography className={classes.planOptionHead}>Individual Subscriptions</Typography>
          <Typography className={classes.planPriceDetails}>
            Starting at ${Math.floor(price * 0.95)} per year
          </Typography>
        </Stack>
        <Stack className={classes.optionsStack} spacing={1}>
          <PlanPointStack description="5% discount on all courses" />
          <PlanPointStack description="Access to live sessions" />
          <PlanPointStack description="Lifetime access to course materials and community" />
          <PlanPointStack description="Access to exclusive alumni events" />
          {/* <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography className={classes.blackFridayText}>
            End of Year Deal: $200 towards your next Sphere course
          </Typography>
        </Stack> */}
        </Stack>
        <Button
          variant="contained"
          className={`${classes.submitButton} ${classes.paymentOptionButton}`}
          onClick={handleSubscriptionPaymentSelected}
        >
          Select
        </Button>
      </Stack>
    );
  }
);

export const TeamMembershipPaymentDetails = memo(
  ({
    cohortID,
    hostName,
    price,
    enrollmentID
  }: {
    cohortID: string;
    hostName: string;
    price: number;
    enrollmentID: string;
  }) => {
    const classes = useStyles();
    const { sendAnalyticsData } = useContext(AnalyticsContext);

    const handleTeamPackageSelected = () => {
      sendAnalyticsData('Cohort Registration - Payment Choice - Team Package Selected', {});
      window.open('https://www.getsphere.com/pages/subscriptions', '_blank');
    };

    return (
      <Stack className={classes.whiteStackCard} spacing={3}>
        <Stack>
          <Typography className={classes.planOptionHead}>Team Subscriptions</Typography>
          <Typography className={classes.planPriceDetails}>Flexible for your team</Typography>
        </Stack>
        <Stack className={classes.optionsStack} spacing={1}>
          <PlanPointStack description="15%+ discounts on all courses" />
          <PlanPointStack description="Access to live sessions" />
          <PlanPointStack description="Ongoing access to course materials and alumni community" />
          <PlanPointStack description="Access to exclusive alumni events" />
          <PlanPointStack description="Request topics for curriculum" />
          <Typography className={classes.planPriceDetails}>
            If you get your team to sign up for a subscription you’ll receive a free course
          </Typography>
          {/* <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography className={classes.blackFridayText}>
            End of Year Deal: $200 towards your next Sphere course
          </Typography>
        </Stack> */}
        </Stack>
        <Button
          variant="contained"
          className={`${classes.submitButton} ${classes.paymentOptionButton}`}
          onClick={handleTeamPackageSelected}
        >
          Select
        </Button>
      </Stack>
    );
  }
);
