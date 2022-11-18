import { Card, Typography, Stack, Link } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { useStyles } from './Common';
import CurrentCreditAmount from './CurrentCreditAmount';

export default function ReferralHeader({ setActiveTab }: { setActiveTab: Function }) {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Card className={classes.greyBackground} sx={{ padding: '20px', paddingBottom: '40px' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center">
        <CurrentCreditAmount />
        <Stack spacing={2} sx={{ margin: 'auto', mt: { xs: '30px', md: 'auto' } }}>
          <Typography className={classes.font18Bold}>Increase your balance</Typography>
          <ul style={{ textDecoration: 'underline' }}>
            <li>
              <Typography sx={{ cursor: 'pointer' }} onClick={() => setActiveTab(1)}>
                {user?.credit_account_id
                  ? 'Top up your Sphere subscription'
                  : 'Start a Sphere subscription'}
              </Typography>
            </li>
            <li>
              <Link
                sx={{ cursor: 'pointer', color: '#000' }}
                onClick={() => {
                  setActiveTab(0);
                }}
                href="#referral-invite-form"
              >
                Send more referrals
              </Link>
            </li>
          </ul>
        </Stack>
      </Stack>
    </Card>
  );
}
