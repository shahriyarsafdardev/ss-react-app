import { Stack } from '@material-ui/core';
import moment from 'moment';
import { StyledHeading, StyledLink, StyledStack, StyledText, BoldText, useStyles } from './Common';

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

  const subscription = accountDetails?.subscription;
  const account = accountDetails?.account;
  const renewalDate = moment(new Date(subscription?.start_date))
    ?.add(1, 'y')
    .format('ll')
    .toString();
  return (
    <Stack className={classes.gradientBackground}>
      <StyledStack direction={{ xs: 'column', md: 'row' }} style={{ width: '80%' }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <StyledHeading>Sphere Credit Subscription</StyledHeading>
            <StyledText>
              You are on a <b>{subscription?.name} Plan</b> for {subscription?.amount} Sphere
              credits. Your next charge will be on {renewalDate} for ${subscription?.amount}
            </StyledText>
          </Stack>
          <Stack spacing={1}>
            <BoldText>Benefits</BoldText>
            <StyledText>
              <li>
                {subscription?.amount} Sphere Credits per year (credits can be used to register for
                live courses at a 15% discount)
              </li>
            </StyledText>
          </Stack>
          <Stack spacing={1}>
            <BoldText>Credits</BoldText>
            <StyledText>
              You currently have <b>{account?.credit_balance || 0} credits remaining for use.</b> (1
              Sphere Credit = $1 USD).
            </StyledText>
          </Stack>
          <Stack direction="row" spacing={2}>
            <StyledLink
              onClick={() => {
                setAddCreditModal(true);
              }}
            >
              Add more Credits
            </StyledLink>
            <StyledLink onClick={() => setCancelSubscriptionModal(true)}>
              Cancel Subscription
            </StyledLink>
          </Stack>
        </Stack>
      </StyledStack>
    </Stack>
  );
}
