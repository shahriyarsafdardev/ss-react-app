import react from 'react';
import { Card, Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function CurrentCreditAmount() {
  const classes = useStyles();
  return (
    <Card
      className={classes.greyBackground}
      sx={{ textAlign: 'center', maxWidth: { xs: '100%', md: '350px' } }}
    >
      <Typography className={classes.greyBGFont22Bold}>You've earned</Typography>
      <Typography className={classes.greyBGHeading40} sx={{ mt: '15px' }}>
        $300
      </Typography>
      <Typography className={classes.greyBGFont22}>to use towards Sphere Courses</Typography>
    </Card>
  );
}
