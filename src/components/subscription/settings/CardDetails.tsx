import { Stack } from '@material-ui/core';
import { RootState, useSelector } from 'redux/store';
import { useStyles, StyledText } from './Common';

export default function CardDetails() {
  const classes = useStyles();
  const account = useSelector(
    (state: RootState) => state.subscription.subscription_detail
  )?.account;

  return (
    <>
      <Stack className={classes.cardDetailsBox} spacing={1} justifyContent="center">
        <StyledText sx={{ paddingBottom: '5px', borderBottom: '1px solid #E5E8EB' }}>
          Card Details
        </StyledText>
        <Stack direction="row" spacing={5}>
          <Stack spacing={1}>
            <StyledText>Card Number:</StyledText>
            <StyledText>{account?.cardNumber || '**** **** **** ****'}</StyledText>
          </Stack>
          <Stack spacing={1}>
            <StyledText>Expiration Date:</StyledText>
            <StyledText>{account?.cardExpiry || '**/**'}</StyledText>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
