import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Stack } from '@material-ui/core';
import { useContext } from 'react';
import {
  ActiveSubscriptionDetails,
  NonActiveSubscriptionDetails,
  StyledStack,
  useStyles
} from './Common';

export default function SubscriptionDetails({
  setAddCreditModal,
  setCancelSubscriptionModal,
  accountDetails
}: {
  setAddCreditModal: Function;
  setCancelSubscriptionModal: Function;
  accountDetails: any;
}) {
  const classes = useStyles();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const subscription = accountDetails?.subscription;

  return (
    <Stack className={classes.gradientBackground}>
      <StyledStack direction={{ xs: 'column', md: 'row' }} className={classes.subscriptionDetail}>
        <Stack spacing={5}>
          {subscription?.is_active ? (
            <ActiveSubscriptionDetails
              subscription={subscription}
              accountDetails={accountDetails}
              setAddCreditModal={setAddCreditModal}
              setCancelSubscriptionModal={setCancelSubscriptionModal}
              sendAnalyticsData={sendAnalyticsData}
            />
          ) : (
            <NonActiveSubscriptionDetails sendAnalyticsData={sendAnalyticsData} />
          )}
        </Stack>
      </StyledStack>
    </Stack>
  );
}
