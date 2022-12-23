import { Stack } from '@material-ui/core';
import OnboardingCard from 'components/subscription/teams/OnboardingCard';
import { memo } from 'react';

function OnboardingChoice({
  setStep,
  setIsSinglePayee
}: {
  setStep: Function;
  setIsSinglePayee: Function;
}) {
  return (
    <Stack
      alignContent="center"
      width={{ xs: '100%', md: '70%' }}
      alignItems="center"
      margin="auto"
      marginTop="20px"
      direction={{ xs: 'column-reverse', md: 'row' }}
      spacing={2}
    >
      <OnboardingCard
        iconURL="https://sphere-public.s3.eu-west-2.amazonaws.com/card-icon.svg"
        heading="Pay on one card"
        detail="Charge all seats to one team card "
        onNextHandler={() => {
          setIsSinglePayee(true);
          setStep();
        }}
      />
      <OnboardingCard
        iconURL="https://sphere-public.s3.eu-west-2.amazonaws.com/email-icon.svg"
        heading="Invite your team to pay individually"
        detail="Send invites to team members to pay on their individual cards / charge their L&D stipends"
        onNextHandler={() => {
          setStep();
          setIsSinglePayee(false);
        }}
      />
    </Stack>
  );
}

export default memo(OnboardingChoice);
