import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { updateSubscription } from 'redux/slices/accountSubscription';
import { useDispatch } from 'redux/store';
import axios from 'utils/axios';
import { StyledButton, useStyles } from './Common';

export default function CancelSubscriptionForm({
  setModal,
  setUpdateSubscriptionModal,
  accountID
}: {
  setModal: Function;
  setUpdateSubscriptionModal: Function;
  accountID: string | undefined;
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleEditSubscription = () => {
    setModal(false);
    setUpdateSubscriptionModal(true);
  };

  const handleSubmit = async () => {
    await axios.post(`/account_subscriptions/${accountID}/cancel_subscription.json`).then((res) => {
      dispatch(updateSubscription(res.data));
      enqueueSnackbar('Subscription plan canceled!', { variant: 'success' });
      setModal(false);
    });
  };

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
          <StyledButton variant="outlined" className={classes.cancelButton} onClick={handleSubmit}>
            Cancel Subscription
          </StyledButton>
          <StyledButton variant="contained" onClick={handleEditSubscription}>
            Edit Subscription
          </StyledButton>
        </Stack>
      </Stack>
    </Card>
  );
}
