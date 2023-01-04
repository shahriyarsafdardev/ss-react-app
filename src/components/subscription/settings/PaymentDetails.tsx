import { memo, useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Stack } from '@material-ui/core';
import { Icon } from '@iconify/react';
import iconEdit from '@iconify/icons-ic/edit';
import CardDetails from './CardDetails';
import { StyledHeading, useStyles, StyledText } from './Common';

function PaymentDetails({ setPaymentMethodModal }: { setPaymentMethodModal: Function }) {
  const classes = useStyles();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const handleUpdatePaymentMethod = () => {
    sendAnalyticsData('Balance Page - Subscription Tab - "Update Payment Method" clicked');
    setPaymentMethodModal(true);
  };

  return (
    <>
      <Stack spacing={1} padding="50px 0px">
        <StyledHeading>Payment Method</StyledHeading>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <CardDetails />
          <Stack
            spacing={1}
            className={classes.updateCardBox}
            onClick={() => handleUpdatePaymentMethod()}
          >
            <Icon icon={iconEdit} width={30} height={30} />
            <StyledText>Update Payment Method</StyledText>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default memo(PaymentDetails);
