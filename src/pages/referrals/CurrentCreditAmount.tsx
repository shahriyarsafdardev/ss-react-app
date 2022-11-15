import { Card, Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function CurrentCreditAmount() {
  const classes = useStyles();
  return (
    <Card
      className={classes.greyBackground}
      sx={{
        textAlign: 'center',
        maxWidth: { xs: '100%', md: '350px' },
        padding: '60px 55px'
      }}
    >
      <Typography className={classes.font22Bold}>You've earned</Typography>
      <Typography className={classes.greyBGHeading40} sx={{ mt: '15px' }}>
        $300
      </Typography>
      <Typography className={classes.font22}>to use towards Sphere Courses</Typography>
    </Card>
  );
}
