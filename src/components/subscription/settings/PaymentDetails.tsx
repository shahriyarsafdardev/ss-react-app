import { Stack, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import iconEdit from '@iconify/icons-ic/edit';
import CardDetails from './CardDetails';
import { StyledHeading, useStyles } from './Common';

export default function PaymentDetails({
  setPaymentMethodModal
}: {
  setPaymentMethodModal: Function;
}) {
  const classes = useStyles();

  return (
    <>
      <Stack spacing={1} padding="50px 0px">
        <StyledHeading>Payment Method</StyledHeading>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <CardDetails />
          <Stack
            spacing={1}
            className={classes.updateCardBox}
            onClick={() => {
              setPaymentMethodModal(true);
            }}
          >
            <Icon icon={iconEdit} width={30} height={30} />
            <Typography>Update Payment Method</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
