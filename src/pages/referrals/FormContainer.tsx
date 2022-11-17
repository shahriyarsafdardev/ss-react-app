import { Card, Typography } from '@material-ui/core';
import { useStyles } from './Common';
import SendReferralInviteForm from './SendReferralInviteForm';

export default function FormContainer() {
  const classes = useStyles();

  return (
    <Card className={classes.purpleContainer}>
      <Typography variant="h3" sx={{ fontSize: '32px', mb: '20px' }}>
        Give $100, Get $100
      </Typography>
      <Typography sx={{ mb: '5px' }}>
        Invite a friend or colleague to Sphere and they will receive $100 to use towards a course.
      </Typography>
      <Typography>
        Once they have enrolled, you will also receive $100 credit to use towards Sphere courses.
      </Typography>
      <SendReferralInviteForm />
    </Card>
  );
}
