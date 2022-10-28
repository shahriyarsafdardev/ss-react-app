import { Box, Stack } from '@material-ui/core';
import { StyledTypography } from '../Common';
import { InvitationDetails } from './InvitePage';

export default function InvitationSubscriptionDetails({
  amount,
  details
}: {
  amount: number;
  details: InvitationDetails;
}) {
  return (
    <Box sx={{ mt: 4, maxWidth: '650px' }}>
      <Stack spacing={3} margin={{ md: '0px 20px', lg: '0px 70px' }}>
        <StyledTypography>
          Every year, you will be able to enrol in ${new Intl.NumberFormat().format(amount)} worth
          of Sphere courses with a {(details?.team_discount && details?.team_discount * 100) || 0}%
          discount. You can update or cancel your subscription at any time.
        </StyledTypography>
        <StyledTypography style={{ fontWeight: 'bold' }}>
          Your team at {details?.team_company_name} has approved Sphere as a Learning & Development
          expense meaning they will reimburse the full cost!
        </StyledTypography>
      </Stack>
    </Box>
  );
}
