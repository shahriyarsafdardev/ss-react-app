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
          <PlanPointStack description={`Access to ${hostName}'s course`} />
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
          <Typography className={classes.planOptionHead}>Individual Subscription</Typography>
          <Typography className={classes.planPriceDetails}>
            Starting at ${Math.floor(price * 0.95)} per year (~1 course)
          </Typography>
        </Stack>
        <Stack className={classes.optionsStack} spacing={1}>
          <PlanPointStack description={`Access to ${hostName}'s course`} />
          <PlanPointStack description="5% discount on all courses" />
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
      window.open('https://calendly.com/d/zhg-vsj-qmc/meeting-with-sphere', '_blank');
    };

    return (
      <Stack className={classes.whiteStackCard} spacing={3}>
        <Stack>
          <Typography className={classes.planOptionHead}>Team Subscription</Typography>
          <Typography className={classes.planPriceDetails}>
            Build your custom training plan
          </Typography>
        </Stack>
        <Stack className={classes.optionsStack} spacing={1}>
          <PlanPointStack description="Individual Subscriptions for all team members" />
          <PlanPointStack description="15%+ discounts on all courses" />
          <PlanPointStack description="Request topics for your business needs" />
          <PlanPointStack description="Get this, or any other course, free if your team subscribes" />
          <PlanPointStack description="Request topics for curriculum" />
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
          Talk To Sphere
        </Button>
      </Stack>
    );
  }
);
