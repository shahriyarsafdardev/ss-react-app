import { Stack } from '@material-ui/core';
import { memo } from 'react';
import { useStyles, Logo, StyledTypography } from '../teams/Common';

function PaymentPrompt({ topup }: { topup: boolean }) {
  const styles = useStyles();

  return (
    <Stack spacing={2} className={`${styles.purpleBackground} ${styles.promptContainer}`}>
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <StyledTypography variant="h4">
        {topup
          ? 'Your Team Subscription has been successfully updated'
          : 'Your Team Subscription has been created'}
      </StyledTypography>
      {!topup && <StyledTypography>The Sphere Team will be in touch shortly!</StyledTypography>}
    </Stack>
  );
}

export default memo(PaymentPrompt);
