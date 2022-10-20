import { Stack, styled, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { markOnboardingStep } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { ChecklistItem } from './Common';

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: '10px 30px',
  backgroundColor: '#101658',
  color: 'white',
  fontSize: '20px',
  fontWeight: 'bold',
  borderRadius: '16px 16px 0px 0px'
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  margin: 'auto',
  borderRadius: '16px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
}));

export default function PreCohortChecklist() {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const onboarding_data = useSelector(
    (state: RootState) =>
      state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0].onboarding_data
  );
  const [activeStep, setActiveStep] = useState(1);
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    stepStatus();
  }, [onboarding_data]);

  const stepStatus = () => {
    if (onboarding_data?.onboarding_messaging_step_completed) {
      setActiveStep(2);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_networking_step_completed
    ) {
      setActiveStep(3);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_networking_step_completed &&
      onboarding_data?.onboarding_referral_step_completed
    ) {
      setActiveStep(4);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_networking_step_completed &&
      onboarding_data?.onboarding_referral_step_completed &&
      onboarding_data?.onboarding_questionnaire_step_completed
    ) {
      setActiveStep(5);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_networking_step_completed &&
      onboarding_data?.onboarding_referral_step_completed &&
      onboarding_data?.onboarding_questionnaire_step_completed &&
      onboarding_data?.onboarding_calendar_sync_step_completed
    ) {
      setActiveStep(6);
    }
  };

  const getActiveStatus = (step: number) => {
    let status = '';
    if (step === activeStep) {
      status = 'Active';
    } else if (step < activeStep) {
      status = 'Completed';
    } else {
      status = 'NonActive';
    }
    return status;
  };

  const handleCompletedMessageStep = () => {
    navigate(`/cohorts/${cohort_id}/messaging`);
    dispatch(markOnboardingStep(cohort_id, 'onboarding_messaging_step_completed'));
  };

  const handleCompletedNetworkingStep = () => {
    navigate(`/cohorts/${cohort_id}/peers`);
    dispatch(markOnboardingStep(cohort_id, 'onboarding_networking_step_completed'));
  };

  return (
    <StyledStack>
      <StyledTypography>Pre-Cohort Checklist</StyledTypography>
      <Stack sx={{ padding: '0px 30px' }}>
        <ChecklistItem
          index={1}
          heading="Message your instructor"
          status={getActiveStatus(1)}
          onSubmit={handleCompletedMessageStep}
        />
        <ChecklistItem
          index={2}
          heading="Explore networking"
          status={getActiveStatus(2)}
          onSubmit={handleCompletedNetworkingStep}
        />
        <ChecklistItem
          index={3}
          heading="Invite your team"
          status={getActiveStatus(3)}
          onSubmit={() => {}}
        />
        <ChecklistItem
          index={4}
          heading="Share your goals"
          status={getActiveStatus(4)}
          onSubmit={() => {}}
        />
        <ChecklistItem
          index={5}
          heading="Sync calendar"
          status={getActiveStatus(5)}
          onSubmit={() => {}}
        />
      </Stack>
    </StyledStack>
  );
}
