import { Button, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { StyledCheckIcon, useStyles } from './Common';

export function OneTimePaymentDetails({
  cohortID,
  hostName,
  price,
  enrollmentID
}: {
  cohortID: string;
  hostName: string;
  price: number;
  enrollmentID: string;
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">One Time Payment</Typography>
        <Typography fontSize="14px" color="#828282">
          ${Math.floor(price)}
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack} spacing={1}>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>Access to {hostName}’s course</Typography>
        </Stack>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => {
          sendAnalyticsData('Cohort Registration - Payment Choice - Course Payment Selected', {});
          navigate(
            `/registration/course-payment?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`
          );
        }}
      >
        Select
      </Button>
    </Stack>
  );
}

export function IndividualMembershipPaymentDetails({
  cohortID,
  hostName,
  price,
  enrollmentID
}: {
  cohortID: string;
  hostName: string;
  price: number;
  enrollmentID: string;
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">Sphere Membership </Typography>
        <Typography fontSize="14px" color="#828282">
          Starting at ${Math.floor(price * 0.95)} per year
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack} spacing={1}>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>Access to {hostName}’s course</Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>Access to Alumni events</Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>5% discount on all Sphere courses</Typography>
        </Stack>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => {
          sendAnalyticsData(
            'Cohort Registration - Payment Choice - Subscription Payment Selected',
            {}
          );
          navigate(
            `/registration/subscription-payment?cohort_id=${cohortID}&enrollment_id=${enrollmentID}&amount=${Math.floor(
              price * 0.95
            )}`
          );
        }}
      >
        Select
      </Button>
    </Stack>
  );
}

export function TeamMembershipPaymentDetails({
  cohortID,
  hostName,
  price,
  enrollmentID
}: {
  cohortID: string;
  hostName: string;
  price: number;
  enrollmentID: string;
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">Sphere Team Membership </Typography>
        <Typography fontSize="14px" color="#828282">
          Flexible for your team
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack} spacing={1}>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>Access to {hostName}’s course</Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>Access to Alumni events</Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>Free access to a course of your choosing</Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start">
          <StyledCheckIcon
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/check-box-icon.png"
            alt="check icon"
          />
          <Typography>10%+ discount on all Sphere courses</Typography>
        </Stack>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => {
          sendAnalyticsData('Cohort Registration - Payment Choice - Team Package Selected', {});
          navigate(
            `/registration/team-package-inquiry?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`
          );
        }}
      >
        Select
      </Button>
    </Stack>
  );
}
