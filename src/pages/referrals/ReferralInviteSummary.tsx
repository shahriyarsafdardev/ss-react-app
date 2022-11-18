import { Card, Typography, Stack } from '@material-ui/core';
import { RootState, useSelector } from 'redux/store';
import { useStyles, StyledDiv } from './Common';
import ReferralProgress from './ReferralProgress';

export default function ReferralInviteSummary() {
  const classes = useStyles();
  const { referrals_count } = useSelector((state: RootState) => state.referral.referral);

  const headText = () => {
    const remainingReferralsCount =
      7 - referrals_count?.enrolled_referrals_count < 0
        ? 0
        : 7 - referrals_count?.enrolled_referrals_count;
    return referrals_count?.total_referrals_count === 0
      ? 'Start sending referrals to earn a free Sphere course'
      : `You're only ${remainingReferralsCount} accepted referrals away from earning a free course`;
  };

  return (
    <Card className={classes.greyBackground} sx={{ width: '100%', padding: '40px 50px' }}>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack style={{ marginLeft: '-30px' }}>
          <ReferralProgress
            enrolled={referrals_count?.enrolled_referrals_count}
            referralsSent={referrals_count?.total_referrals_count}
            requiredReferrees={7}
          />
        </Stack>
        <Stack>
          <Typography className={classes.font22Bold} sx={{ marginTop: { xs: '2rem', md: '15px' } }}>
            {headText()}
          </Typography>
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv
              style={{
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(135deg, #5BE584 0%, #007B55 100%)'
              }}
            />
            <Typography className={classes.font16}>
              <span className={classes.font18Bold}>
                {referrals_count?.total_referrals_count - referrals_count?.enrolled_referrals_count}
              </span>{' '}
              sent referrals are awaiting acceptance
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv
              style={{ background: 'linear-gradient(135deg, #5BE584 0%, #007B55 100%)' }}
            />
            <Typography className={classes.font16}>
              <span className={classes.font18Bold}>
                {referrals_count?.enrolled_referrals_count}
              </span>{' '}
              referees have enrolled in a Sphere course
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv style={{ background: '#EDEFF2' }} />
            <Typography className={classes.font16}>
              <span className={classes.font18Bold}>7</span> enrolled referrees = $700 = enough to
              cover a free Sphere course!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
