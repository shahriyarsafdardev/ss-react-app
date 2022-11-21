import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useContext, useEffect } from 'react';
import { RootState, useSelector } from 'redux/store';
import ReferralInviteSummary from './ReferralInviteSummary';
import FormContainer from './FormContainer';

export default function ReferralsTab() {
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);

  useEffect(() => {
    cohort && sendAnalyticsData('Balance Page - Referrals Tab - Tab opened');
  }, [cohort]);

  return (
    <>
      <ReferralInviteSummary />
      <FormContainer />
    </>
  );
}
