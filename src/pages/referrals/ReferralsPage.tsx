import { useState } from 'react';
import { Container } from '@material-ui/core';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import ReferralHeader from './ReferralHeader';
import { ReferralTabs, ReferralTab } from './Common';
import ReferralsTab from './ReferralsTab';

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

        <ReferralsTab />
      </Container>
    </Page>
  );
}
