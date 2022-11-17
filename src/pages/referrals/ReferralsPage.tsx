import { useState } from 'react';
import { Container, Stack } from '@material-ui/core';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import ReferralHeader from './ReferralHeader';
import CurrentCreditAmount from './CurrentCreditAmount';
import SendReferralInviteForm from './SendReferralInviteForm';
import ReferralFAQs from './ReferralFAQs';
import ReferralInviteSummary from './ReferralInviteSummary';
import { ReferralTabs, ReferralTab } from './Common';

export default function ReferralsPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const { themeStretch } = useSettings();

  return (
    <Page title="Sphere Referrals">
      <Container maxWidth={themeStretch ? false : 'lg'} style={{ paddingBottom: '50px' }}>
        <ReferralHeader />
        <ReferralTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
          <ReferralTab label="Referrals" />
          <ReferralTab label="Subscription" />
          <ReferralTab label="Balance History" />
        </ReferralTabs>

        {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}> */}
        {/* <CurrentCreditAmount /> */}
        {/* <ReferralInviteSummary />
        </Stack>
        <SendReferralInviteForm />
        <ReferralFAQs />
      </Container> */}
      </Container>
    </Page>
  );
}
