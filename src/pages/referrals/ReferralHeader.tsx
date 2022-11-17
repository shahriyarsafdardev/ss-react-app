import { Card, Typography, Stack } from '@material-ui/core';
import { useStyles } from './Common';
import CurrentCreditAmount from './CurrentCreditAmount';

export default function ReferralHeader() {
  const classes = useStyles();

  return (
    <Card className={classes.greyBackground} sx={{ padding: '20px' }}>
      <Stack direction="row" alignItems="center">
        <CurrentCreditAmount />
        <Stack spacing={2} sx={{ marginLeft: '10%' }}>
          <Typography className={classes.font18Bold}>Increase your balance</Typography>
          <ul style={{ textDecoration: 'underline' }}>
            <li>
              <Typography>Top up your Sphere subscription</Typography>
            </li>
            <li>
              <Typography>Send more referrals</Typography>
            </li>
          </ul>
        </Stack>
      </Stack>
      {/* <Typography variant="h3" sx={{ fontSize: '32px', mb: '20px' }}>
        Give $100, Get $100
      </Typography>
      <Typography sx={{ mb: '5px' }}>
        Invite a friend or colleague to Sphere and they will receive $100 to use towards a course.
      </Typography>
      <Typography>
        Once they have enrolled, you will also receive $100 credit to use towards Sphere courses.
      </Typography> */}
    </Card>
  );
}
