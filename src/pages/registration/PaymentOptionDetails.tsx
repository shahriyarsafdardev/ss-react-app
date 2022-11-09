import { Button, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useStyles } from './Common';

export function OneTimePaymentDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">One Time Payment</Typography>
        <Typography fontSize="14px" color="#828282">
          $800
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack}>
        <Typography>✅ Access to Ronny Kohavi’s course</Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => navigate('/registration/course-payment')}
      >
        Select
      </Button>
    </Stack>
  );
}

export function IndividualMembershipPaymentDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">Sphere Membership </Typography>
        <Typography fontSize="14px" color="#828282">
          Starting at $760 per year
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack}>
        <Typography>✅ Access to Ronny Kohavi’s course</Typography>
        <Typography>✅ Access to Alumni events</Typography>
        <Typography>✅ 5% discount on all Sphere courses</Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => navigate('/registration/subscription-payment')}
      >
        Select
      </Button>
    </Stack>
  );
}

export function TeamMembershipPaymentDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Stack className={classes.whiteStackCard} spacing={3}>
      <Stack>
        <Typography fontWeight="bold">Sphere Membership </Typography>
        <Typography fontSize="14px" color="#828282">
          Starting at $760 per year
        </Typography>
      </Stack>
      <Stack className={classes.optionsStack}>
        <Typography>✅ Access to Ronny Kohavi’s course</Typography>
        <Typography>✅ Access to Alumni events</Typography>
        <Typography>✅ Free access to a course of your choosing</Typography>
        <Typography>✅ 10%+ discount on all Sphere courses</Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.submitButton} ${classes.paymentOptionButton}`}
        onClick={() => {}}
      >
        Select
      </Button>
    </Stack>
  );
}
