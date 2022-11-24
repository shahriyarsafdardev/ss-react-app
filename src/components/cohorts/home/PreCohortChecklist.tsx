import { Box, Stack, styled, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { markOnboardingStep } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { trackEvent } from 'utils/eventTracking';
import { ChecklistItem, ChecklistCompletionPrompt } from './Common';
import InvitePeersModal from './InvitePeersModal';

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: '10px 30px',
  backgroundColor: '#101658',
  color: 'white',
  fontSize: '20px',
  fontWeight: 'bold',
  borderRadius: '16px 16px 0px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  backgroundColor: 'white',
  width: '100%',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    margin: '15px auto !important'
  }
}));

export default function PreCohortChecklist({ setHasOnboarded }: { setHasOnboarded?: Function }) {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const onboarding_data = cohort?.onboarding_data;
  const [activeStep, setActiveStep] = useState(1);
  const [invitePeersModalState, setInvitePeersModalState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const content: HTMLElement | null = document.getElementById('checklist-content');
  const icon: HTMLElement | null = document.getElementById('expand-more-icon');
  const current_url = window.location.pathname.split('/');
  const current_tab = current_url[current_url.length - 1];

  const toggleCheckList = (event: any) => {
    event.target.classList.toggle('active');
    if (content && icon) {
      icon.style.transitionDuration = '0.3s';
      icon.style.transitionProperty = 'transform';
      content.style.animation = 'in 1000ms ease both';
      if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.style.transform = 'rotate(180deg)';
      } else {
        content.style.display = 'block';
        icon.style.transform = 'rotate(0deg)';
      }
    }
  };

  useEffect(() => {
    stepStatus();
  }, [onboarding_data]);

  const stepStatus = () => {
    if (onboarding_data?.onboarding_messaging_step_completed) {
      setActiveStep(2);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_questionnaire_step_completed
    ) {
      setActiveStep(3);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_questionnaire_step_completed &&
      onboarding_data?.onboarding_referral_step_completed
    ) {
      setActiveStep(4);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_questionnaire_step_completed &&
      onboarding_data?.onboarding_referral_step_completed &&
      onboarding_data?.onboarding_calendar_sync_step_completed
    ) {
      setActiveStep(5);
    }
    if (
      onboarding_data?.onboarding_messaging_step_completed &&
      onboarding_data?.onboarding_questionnaire_step_completed &&
      onboarding_data?.onboarding_referral_step_completed &&
      onboarding_data?.onboarding_calendar_sync_step_completed &&
      onboarding_data?.onboarding_networking_step_completed
    ) {
      setHasOnboarded && setHasOnboarded(true);
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

  const trackSegmentEvent = (eventName: string, eventData?: any) => {
    trackEvent(cohort, eventName, eventData);
  };

  const handleCompletedMessageStep = () => {
    trackSegmentEvent('Cohort Onboarding - Checklist - "Introduce yourself" Selected');
    navigate(`/cohorts/${cohort_id}/messaging`);
    user?.basic_profile_completed &&
      dispatch(markOnboardingStep(cohort_id, 'onboarding_messaging_step_completed'));
  };

  const handleShareGoalsStep = () => {
    trackSegmentEvent('Cohort Onboarding - Checklist - "Share your Goals" Selected');
    navigate(`/cohorts/${cohort_id}/sessions`);
  };

  const handleInviteTeamStep = () => {
    trackSegmentEvent('Cohort Onboarding - Checklist - "Invite Your Team" Selected');
    setInvitePeersModalState(true);
  };

  const handleCompletedInviteTeamStep = () => {
    dispatch(markOnboardingStep(cohort_id, 'onboarding_referral_step_completed'));
    navigate(`/cohorts/${cohort_id}/onboarding-calendar-instructions`);
    setInvitePeersModalState(false);
    trackSegmentEvent('Cohort Onboarding - Invite Team - "Finish" Selected');
  };

  const handleCalendarSyncStep = () => {
    trackSegmentEvent('Cohort Onboarding - Checklist - "Sync Calendar" Selected');
    navigate(`/cohorts/${cohort_id}/onboarding-calendar-instructions`);
  };

  const handleCompletedNetworkingStep = () => {
    trackSegmentEvent('Cohort Onboarding - Pre Cohort Checklist - "Explore Networking" Selected');
    navigate(`/cohorts/${cohort_id}/peers`);
    dispatch(markOnboardingStep(cohort_id, 'onboarding_networking_step_completed'));
  };

  return (
    <>
      <InvitePeersModal
        invitePeersModalState={invitePeersModalState}
        setInvitePeersModalState={setInvitePeersModalState}
        onFinish={handleCompletedInviteTeamStep}
        trackSegmentEvent={trackSegmentEvent}
      />
      {activeStep >= 6 ? (
        <StyledStack
          sx={{ display: onboarding_data?.onboarding_checklist_completed ? 'none' : 'block' }}
        >
          <StyledTypography onClick={(event: any) => toggleCheckList(event)}>
            Pre-Cohort Checklist
            {current_tab !== 'home' && <ExpandMore id="expand-more-icon" />}
          </StyledTypography>
          <Box id="checklist-content" style={{ display: 'block' }}>
            <ChecklistCompletionPrompt
              cohort_id={cohort_id}
              trackSegmentEvent={trackSegmentEvent}
            />
          </Box>
        </StyledStack>
      ) : (
        <StyledStack
          key={cohort_id}
          sx={{ display: onboarding_data?.onboarding_checklist_completed ? 'none' : 'block' }}
        >
          <StyledTypography onClick={(event: any) => toggleCheckList(event)}>
            Pre-Cohort Checklist
            {current_tab !== 'home' && <ExpandMore id="expand-more-icon" />}
          </StyledTypography>
          <Stack sx={{ padding: '0px 30px', display: 'block' }} id="checklist-content">
            <ChecklistItem
              index={1}
              heading="Introduce yourself"
              status={getActiveStatus(1)}
              onSubmit={handleCompletedMessageStep}
            />
            <ChecklistItem
              index={2}
              heading="Share your goals"
              status={getActiveStatus(2)}
              onSubmit={handleShareGoalsStep}
            />
            <ChecklistItem
              index={3}
              heading="Invite your team"
              status={getActiveStatus(3)}
              onSubmit={handleInviteTeamStep}
            />
            <ChecklistItem
              index={4}
              heading="Sync your calendar"
              status={getActiveStatus(4)}
              onSubmit={handleCalendarSyncStep}
            />
            <ChecklistItem
              index={5}
              heading="Explore networking"
              status={getActiveStatus(5)}
              onSubmit={handleCompletedNetworkingStep}
            />
          </Stack>
        </StyledStack>
      )}
    </>
  );
}
