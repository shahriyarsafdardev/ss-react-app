import { Card, Stack, Typography } from '@material-ui/core';
import { StyledButton, useStyles } from './Common';

export default function CancelSubscriptionForm({ setModal }: { setModal: Function }) {
  const classes = useStyles();
  return (
    <Card>
      <Stack spacing={3} sx={{ padding: '50px 20px', textAlign: 'center' }}>
        <Typography variant="h5">Are you sure you want to cancel your subscription?</Typography>
        <Stack>
          <Typography>
            You will lose access to your current credits and Sphere’s exclusive content.
          </Typography>
          <Typography>Instead you, can decrease the size of your subscription.</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <StyledButton
            variant="outlined"
            className={classes.cancelButton}
            onClick={() => setModal(false)}
          >
            Cancel Subscription
          </StyledButton>
          <StyledButton variant="contained" onClick={() => setModal(false)}>
            Edit Subscription
          </StyledButton>
        </Stack>
      </Stack>
    </Card>
  );
}
