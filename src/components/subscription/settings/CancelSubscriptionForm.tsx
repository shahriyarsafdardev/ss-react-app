import { Card, Stack, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { StyledButton, useStyles } from './Common';

export default function CancelSubscriptionForm({
  setModal,
  setAddCreditModal,
  setModalType
}: {
  setModal: Function;
  setAddCreditModal: Function;
  setModalType: Function;
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handleEditSubscription = () => {
    setModal(false);
    setModalType('update');
    setAddCreditModal(true);
  };

  const handleSubmit = () => {
    enqueueSnackbar('Subscription plan canceled!', { variant: 'success' });
    setModal(false);
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
