import { Stack, styled, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { markOnboardingStep } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';
import BasicProfileModal from './BasicProfileModal';
import { CalendarInstructionsModal, ChecklistItem, ChecklistCompletionPrompt } from './Common';
import InvitePeersModal from './InvitePeersModal';
import ShareGoalsModal from './ShareGoalsModal';

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
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const onboarding_data = cohort?.onboarding_data;
  const [activeStep, setActiveStep] = useState(1);
  const [invitePeersModalState, setInvitePeersModalState] = useState(false);
  const [shareGoalsModalState, setShareGoalsModalState] = useState(false);
  const [calendarInstructionsModalState, setCalendarInstructionsModalState] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(true);
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
      setHasOnboarded(true);
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

  const handleInviteTeamStep = () => {
    setInvitePeersModalState(true);
  };

  const handleCompletedInviteTeamStep = () => {
    dispatch(markOnboardingStep(cohort_id, 'onboarding_referral_step_completed'));
    setInvitePeersModalState(false);
  };

  const handleShareGoalsStep = () => {
    setShareGoalsModalState(true);
  };

  const handleCompletedShareGoalsStep = () => {
    dispatch(markOnboardingStep(cohort_id, 'onboarding_questionnaire_step_completed'));
    setShareGoalsModalState(false);
  };

  const handleCalendarSyncStep = () => {
    setCalendarInstructionsModalState(true);
  };

  const handleCompletedCalendarSyncStep = () => {
    dispatch(markOnboardingStep(cohort_id, 'onboarding_calendar_sync_step_completed'));
    setCalendarInstructionsModalState(false);
  };

  return (
    <>
      <InvitePeersModal
        invitePeersModalState={invitePeersModalState}
        setInvitePeersModalState={setInvitePeersModalState}
        onFinish={handleCompletedInviteTeamStep}
      />
      <ShareGoalsModal
        shareGoalsModalState={shareGoalsModalState}
        setShareGoalsModalState={setShareGoalsModalState}
        cohort_id={cohort_id}
        onFinish={handleCompletedShareGoalsStep}
      />
      <CalendarInstructionsModal
        calendarURL={cohort?.calendar_invite_url}
        calendarInstructionsModalState={calendarInstructionsModalState}
        setCalendarInstructionsModalState={setCalendarInstructionsModalState}
        handleSubmit={handleCompletedCalendarSyncStep}
      />
      {hasOnboarded ? (
        <StyledStack sx={{ width: '25%' }}>
          <StyledTypography>Pre-Cohort Checklist</StyledTypography>
          <ChecklistCompletionPrompt />
        </StyledStack>
      ) : (
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
              onSubmit={handleInviteTeamStep}
            />
            <ChecklistItem
              index={4}
              heading="Share your goals"
              status={getActiveStatus(4)}
              onSubmit={handleShareGoalsStep}
            />
            <ChecklistItem
              index={5}
              heading="Sync calendar"
              status={getActiveStatus(5)}
              onSubmit={handleCalendarSyncStep}
            />
          </Stack>
        </StyledStack>
      )}
      )
    </>
  );
}
