import { useState } from 'react';
import { Container } from '@material-ui/core';
import AccountSubscription from 'components/subscription/settings/AccountSubscription';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import ReferralHeader from './ReferralHeader';
import ReferralsTab from './ReferralsTab';
import BalanceHistoryTab from './BalanceHistoryTab';
import ReferralsPageNavbar from './ReferralsPageNavbar';

export default function ReferralsPage() {
  const { themeStretch } = useSettings();
  const [activeTab, setActiveTab] = useState(0);

  const showTab = () => {
    if (activeTab === 1) {
      return <AccountSubscription />;
    }
    if (activeTab === 2) {
      return <BalanceHistoryTab />;
    }
    return <ReferralsTab />;
  };

  return (
    <Page title="Sphere Referrals">
      <Container maxWidth={themeStretch ? false : 'lg'} style={{ paddingBottom: '50px' }}>
        <ReferralHeader />
        <ReferralsPageNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {showTab()}
      </Container>
    </Page>
  );
}
