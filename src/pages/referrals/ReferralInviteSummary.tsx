import react from 'react';
import { Card, Typography, Stack } from '@material-ui/core';
import { useStyles, StyledDiv } from './Common';

export default function ReferralInviteSummary() {
  const classes = useStyles();

  return (
    <Card className={classes.greyBackground} sx={{ width: '100%' }}>
      <Stack direction="row">
        <Stack>
          <Typography className={classes.greyBGFont22Bold}>
            You're only 4 accepted referrals away from earning a free course 🎉
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv
              style={{ background: 'linear-gradient(135deg, #5BE584 0%, #007B55 100%)' }}
            />
            <Typography className={classes.greyBGFont18}>3</Typography>
            <Typography className={classes.greyBGFont16}>
              referrees have enrolled in a Sphere course
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv
              style={{
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(135deg, #5BE584 0%, #007B55 100%)'
              }}
            />
            <Typography className={classes.greyBGFont18}>5</Typography>
            <Typography className={classes.greyBGFont16}>referrals sent</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: '15px' }}>
            <StyledDiv style={{ background: '#EDEFF2' }} />
            <Typography className={classes.greyBGFont18}>7</Typography>
            <Typography className={classes.greyBGFont16}>
              enrolled referrees = $700 = enough to cover a free Sphere course!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
