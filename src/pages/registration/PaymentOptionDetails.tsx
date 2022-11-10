import { Button, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useStyles } from './Common';

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

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">One Time Payment</Typography>
        <Typography fontSize="14px" color="#828282">
          ${Math.floor(price)}
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack} spacing={1}>
        <Typography>✅ Access to {hostName}’s course</Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() =>
          navigate(
            `/registration/course-payment?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`
          )
        }
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

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">Sphere Membership </Typography>
        <Typography fontSize="14px" color="#828282">
          Starting at ${Math.floor(price - price * 0.05)} per year
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack} spacing={1}>
        <Typography>✅ Access to {hostName}’s course</Typography>
        <Typography>✅ Access to Alumni events</Typography>
        <Typography>✅ 5% discount on all Sphere courses</Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() =>
          navigate(
            `/registration/subscription-payment?cohort_id=${cohortID}&enrollment_id=${enrollmentID}`
          )
        }
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

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">Sphere Membership </Typography>
        <Typography fontSize="14px" color="#828282">
          Flexible for your team
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack} spacing={1}>
        <Typography>✅ Access to {hostName}’s course</Typography>
        <Typography>✅ Access to Alumni events</Typography>
        <Typography>✅ Free access to a course of your choosing</Typography>
        <Typography>✅ 10%+ discount on all Sphere courses</Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => {
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
