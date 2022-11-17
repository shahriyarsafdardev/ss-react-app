import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import AccountSubscription from 'components/subscription/settings/AccountSubscription';
import useAuth from 'hooks/useAuth';
import { getAccountDetails, getReferralsCount } from 'redux/slices/referral';
import { useDispatch } from 'redux/store';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import ReferralHeader from './ReferralHeader';
import ReferralsTab from './ReferralsTab';
import BalanceHistoryTab from './BalanceHistoryTab';
import ReferralsPageNavbar from './ReferralsPageNavbar';

export default function ReferralsPage() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getAccountDetails(user?.credit_account_id));
    dispatch(getReferralsCount());
  }, []);

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
