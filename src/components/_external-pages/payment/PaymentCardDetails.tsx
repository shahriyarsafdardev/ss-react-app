import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { Stack } from '@material-ui/core';
import StripePayment from 'pages/StripePayment';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3)
  }
}));

export default function PaymentCardDetails({
  linkID,
  onSuccess,
  onFailure,
  isUserPayment,
  clientSecret
}: {
  linkID: string | null;
  onSuccess: Function;
  onFailure: Function;
  isUserPayment: boolean;
  clientSecret: string;
}) {
  const handleSubmit = async () => {
    const endpoint = isUserPayment ? 'add_user_payment' : 'add_payment';
    await axios
      .post(`/payments/${linkID}/${endpoint}.json`, {})
      .then((res) => {
        onSuccess();
      })
      .catch((error: any) => {
        onFailure(error.message);
      });
  };

  return (
    <RootStyle>
      <Stack spacing={{ xs: 2, md: 3 }}>
        <StripePayment clientSecret={clientSecret} onSuccess={handleSubmit} />
      </Stack>
    </RootStyle>
  );
}
