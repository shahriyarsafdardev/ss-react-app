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
  const renewalDate = moment(new Date(subscription?.next_billing_date)).format('ll').toString();
  return (
    <Stack className={classes.gradientBackground}>
      <StyledStack direction={{ xs: 'column', md: 'row' }} className={classes.subscriptionDetail}>
        <Stack spacing={5}>
          <Stack spacing={5}>
            <StyledHeading>Sphere Subscription</StyledHeading>
            <StyledText>
              You are on a <b>Yearly Plan</b> for ${subscription?.yearly_credit_amount} of Sphere
              courses on a {Math.floor(accountDetails?.team_discount * 100)}% discount. You
              currently have <b>${account?.credit_balance || 0}</b> remaining for use. Your next
              charge will be on {renewalDate} for ${subscription?.yearly_credit_amount}
            </StyledText>
          </Stack>
          <Stack direction="row" spacing={2}>
            <StyledLink
              onClick={() => {
                setAddCreditModal(true);
              }}
            >
              Top up
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
