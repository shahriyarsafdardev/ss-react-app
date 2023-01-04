import { Stack } from '@material-ui/core';
import { memo } from 'react';
import { useStyles, Logo, StyledTypography } from '../Common';

function SuccessPage({ subscriptionExist }: { subscriptionExist: boolean }) {
  const styles = useStyles();

  return (
    <Stack spacing={2} className={`${styles.purpleBackground} ${styles.promptContainer}`}>
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <StyledTypography variant="h4">
        {subscriptionExist
          ? 'You have already subscribed!'
          : 'Your Team Subscription has been created! 🎉'}
      </StyledTypography>
      {!subscriptionExist && (
        <StyledTypography>The Sphere Team will be in touch shortly!</StyledTypography>
      )}
    </Stack>
  );
}

export default memo(SuccessPage);
