import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { markOnboardingStep } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { trackEvent } from 'utils/eventTracking';
import { AddToCalendarInfo } from '../onboarding/new-info-forms';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '650px',
  width: '95%',
  maxWidth: '1200px',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const InstructionMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 80px 60px 60px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  borderRadius: '16px',
  [theme.breakpoints.down('sm')]: {
    padding: '40px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const ChildStack = styled(Stack)(({ theme }) => ({
  padding: '20px 55px',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '20px'
  }
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  lineHeight: '130%',
  fontWeight: 'bold',
  color: '#ffffff',
  textAlign: 'center',
  marginTop: '50px !important'
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '123px',
  height: '136px'
}));

export default function OnboardingCalendarInstructions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  useEffect(() => {
    trackSegmentEvent('Calendar Instructions - Page Loaded');
  }, []);

  const trackSegmentEvent = (eventName: string) => {
    trackEvent(cohort, eventName, {
      'Calendar URL': cohort?.calendar_invite_url
    });
  };

  const onNeedHandler = () => {
    trackSegmentEvent('Calendar Instructions - "I need help" Selected');
    navigate('/contact-us');
  };

  const handleSubmit = async () => {
    await dispatch(markOnboardingStep(cohort_id, 'onboarding_calendar_sync_step_completed'));
    navigate(`/cohorts/${cohort_id}/peers`);
    await dispatch(markOnboardingStep(cohort_id, 'onboarding_networking_step_completed'));
    trackSegmentEvent('Calendar Instructions - "I have added the sessions" Selected');
  };

  return (
    <>
      <StyledStack>
        <InstructionMessage spacing={2}>
          <StyledImage
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/calendar.png"
            alt="channels image"
          />
          <Heading>Make sure you don’t miss any sessions</Heading>
        </InstructionMessage>
        <ChildStack>
          <Typography>
            Please follow the instructions below to add the sessions to you calendar:
          </Typography>
          <AddToCalendarInfo
            onNextHandler={() => handleSubmit()}
            onNeedHandler={onNeedHandler}
            inviteUrl={cohort?.calendar_invite_url}
          />
        </ChildStack>
      </StyledStack>
    </>
  );
}
