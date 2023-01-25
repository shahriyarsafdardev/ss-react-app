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
    const timer = setTimeout(() => {
      if (window.location.href.includes('#referral-invite-form')) {
        const element = document.getElementById('referral-invite-form');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cohort]);

  return (
    <>
      <ReferralInviteSummary />
      <FormContainer />
    </>
  );
}
