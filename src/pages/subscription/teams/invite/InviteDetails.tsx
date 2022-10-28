import { Stack, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { InvitationDetails } from 'pages/subscription/teams/invite/InvitePage';
import { StyledTypography, useStyles } from '../Common';
import InvitationSubscriptionDetails from './InvitationSubscriptionDetails';

export default function InviteDetails({
  amount,
  details
}: {
  amount: number;
  details: InvitationDetails;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Stack className={`${classes.paymentData} ${classes.purpleBackground}`}>
        <Stack alignItems="center" spacing={3}>
          <StyledTypography variant="h4">
            {`You’ve been invited to join ${details?.team_company_name}’s Sphere`}
          </StyledTypography>
          <Stack>
            <StyledTypography style={{ fontWeight: 500 }}>
              {details?.lead_user_name} has invited you to attend {details?.cohort_host_name}’s
              cohort
            </StyledTypography>
            <StyledTypography
              sx={{ textDecoration: 'underline' }}
            >{`'${details?.cohort_name}'`}</StyledTypography>
          </Stack>
          <StyledTypography>To attend this course you will be charged:</StyledTypography>
          <Stack alignItems="center" sx={{ marginBottom: '30px' }}>
            <Typography variant="h4">{`$${new Intl.NumberFormat().format(amount)} USD`}</Typography>
            <StyledTypography>which will recur annually</StyledTypography>
          </Stack>
        </Stack>
        {desktopView && <InvitationSubscriptionDetails amount={amount} details={details} />}
      </Stack>
    </>
  );
}
