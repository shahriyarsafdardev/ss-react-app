import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import AccountSubscription from 'components/subscription/settings/AccountSubscription';
import useAuth from 'hooks/useAuth';
import { getAccountDetails, getReferralsCount } from 'redux/slices/referral';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { trackEvent } from 'utils/eventTracking';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
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
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);

  useEffect(() => {
    cohort && sendAnalyticsData('Balance Page - Page loaded');
  }, [cohort]);

  useEffect(() => {
    dispatch(getAccountDetails(user?.credit_account_id));
    dispatch(getReferralsCount());
  }, []);

  const sendAnalyticsData = (eventName: string, eventProperties?: {}) => {
    trackEvent(cohort, eventName, eventProperties);
  };

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
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <Container maxWidth={themeStretch ? false : 'lg'} style={{ paddingBottom: '50px' }}>
          <ReferralHeader setActiveTab={setActiveTab} />
          <ReferralsPageNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
          {showTab()}
        </Container>
      </AnalyticsContext.Provider>
    </Page>
  );
}
