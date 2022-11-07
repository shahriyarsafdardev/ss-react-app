import { Stack, Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function ExpenseCheckerDetails() {
  const classes = useStyles();

  return (
    <>
      <Stack className={classes.paymentData} alignItems="center" spacing={3}>
        <Typography className={`${classes.heading} ${classes.toggleFont}`}>
          Check whether your employer has approved Sphere courses
        </Typography>
        <Typography className={`${classes.toggleFont} ${classes.textCenter}`}>
          Sphere courses are certified and expensed by over 800 companies
        </Typography>
      </Stack>
    </>
  );
}
