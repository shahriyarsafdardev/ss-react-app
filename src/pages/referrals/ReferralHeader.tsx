import { Card, Typography, Stack } from '@material-ui/core';
import { useStyles } from './Common';
import CurrentCreditAmount from './CurrentCreditAmount';

export default function ReferralHeader() {
  const classes = useStyles();

  return (
    <Card className={classes.greyBackground} sx={{ padding: '20px' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center">
        <CurrentCreditAmount />
        <Stack spacing={2} sx={{ margin: 'auto', mt: { xs: '30px', md: 'auto' } }}>
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
    </Card>
  );
}
