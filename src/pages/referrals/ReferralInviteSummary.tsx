import { Card, Typography, Stack } from '@material-ui/core';
import { useStyles, StyledDiv } from './Common';
import ReferralProgress from './ReferralProgress';

export default function ReferralInviteSummary() {
  const classes = useStyles();

  return (
    <Card className={classes.greyBackground} sx={{ width: '100%', padding: '40px 50px' }}>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack style={{ marginLeft: '-30px' }}>
          <ReferralProgress enrolled={3} referralsSent={2} requiredReferrees={7} />
        </Stack>
        <Stack>
          <Typography className={classes.font22Bold} sx={{ marginTop: { xs: '2rem', md: '15px' } }}>
            You're only 4 accepted referrals away from earning a free course
          </Typography>
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv
              style={{
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(135deg, #5BE584 0%, #007B55 100%)'
              }}
            />
            <Typography className={classes.font16}>
              <span className={classes.font18Bold}>2</span> sent referrals are awaiting acceptance
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv
              style={{ background: 'linear-gradient(135deg, #5BE584 0%, #007B55 100%)' }}
            />
            <Typography className={classes.font16}>
              <span className={classes.font18Bold}>3</span> referrees have enrolled in a Sphere
              course
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
