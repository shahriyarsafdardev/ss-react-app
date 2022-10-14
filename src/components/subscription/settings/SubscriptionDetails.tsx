import { Avatar, Stack } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { StyledHeading, StyledLink, StyledStack, StyledText, BoldText, useStyles } from './Common';

export default function SubscriptionDetails({
  setModalType,
  setAddCreditModal,
  setCancelSubscriptionModal
}: {
  setModalType: Function;
  setAddCreditModal: Function;
  setCancelSubscriptionModal: Function;
}) {
  const { user } = useAuth();
  const classes = useStyles();
  return (
    <>
      <StyledStack direction={{ xs: 'column', md: 'row' }}>
        <Avatar
          alt={`${user?.name} Company Logo`}
          src={user?.company_image_url}
          className={classes.avatar}
        />
        <Stack spacing={3}>
          <Stack spacing={1}>
            <StyledHeading>Sphere Credit Subscription</StyledHeading>
            <StyledText>
              You are on a <b>Yearly Plan</b> for 2,000 Sphere credits. Your next charge will be on
              Jan 14, 2024 for $1800
            </StyledText>
          </Stack>
          <Stack spacing={1}>
            <BoldText>Benefits</BoldText>
            <StyledText>
              <li>
                2,000 Sphere Credits per year (credits can be used to register for live courses at a
                15% discount)
              </li>
            </StyledText>
          </Stack>
          <Stack spacing={1}>
            <BoldText>Credits</BoldText>
            <StyledText>
              You currently have <b>400 credits remaining for use.</b> (1 Sphere Credit = $1 USD).
            </StyledText>
          </Stack>
          <Stack direction="row" spacing={2}>
            <StyledLink
              onClick={() => {
                setAddCreditModal(true);
                setModalType('add');
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
    </>
  );
}
