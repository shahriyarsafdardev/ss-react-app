import { Stack } from '@material-ui/core';
import { useStyles, Logo, StyledTypography } from '../teams/Common';

export default function PaymentPrompt() {
  const styles = useStyles();

  return (
    <Stack spacing={2} className={`${styles.purpleBackground} ${styles.promptContainer}`}>
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <StyledTypography variant="h4">Your Team Subscription has been created</StyledTypography>
      <StyledTypography>The Sphere Team will be in touch shortly!</StyledTypography>
    </Stack>
  );
}
