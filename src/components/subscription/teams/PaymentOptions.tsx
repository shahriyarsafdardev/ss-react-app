import { Stack } from '@material-ui/core';
import { SubmitButton } from './Common';

export default function PaymentOptions() {
  return (
    <>
      <Stack spacing={2}>
        <SubmitButton variant="outlined">Apple Pay</SubmitButton>
        <SubmitButton variant="outlined">Google Pay</SubmitButton>
      </Stack>
    </>
  );
}
