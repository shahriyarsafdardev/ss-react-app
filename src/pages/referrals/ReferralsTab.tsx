import { useState } from 'react';
import { Container, Stack } from '@material-ui/core';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import ReferralHeader from './ReferralHeader';
import CurrentCreditAmount from './CurrentCreditAmount';
import SendReferralInviteForm from './SendReferralInviteForm';
import ReferralFAQs from './ReferralFAQs';
import ReferralInviteSummary from './ReferralInviteSummary';

export default function ReferralsTab() {
  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <CurrentCreditAmount />
        <ReferralInviteSummary />
      </Stack>
      <SendReferralInviteForm />
      <ReferralFAQs />
    </>
  );
}
