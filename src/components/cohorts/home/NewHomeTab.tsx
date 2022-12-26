import { Box, Button, Container, Divider, Stack } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useEffect, useState, memo, useCallback, useMemo } from 'react';
import axios from 'utils/axios';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import { useDispatch } from '../../../redux/store';
import { getSessionMaterials, updateMaterialStatus } from '../../../redux/slices/cohort';
import { zoomTimesPreview, displayMultipleDates, isZoomLinkVisible, sessionName } from './Common';
import { Cohort, Session, SessionMaterial } from '../../../@types/cohorts';

import {
  useStyles,
  StyledBox,
  ImageBox,
  DescriptionBox,
  PreReadingStack,
  HomePageTitle,
  PreReadingTitle,
  PreReadingDetail,
  PreReadingDescription,
  SessionDescription
} from './NewHomeTabStyles';
import GoodbyeSection from './GoodbyeSection';

function NewHomeTab({
  activeSession,
  cohort,
  sessions
}: {
  activeSession: Session | undefined;
  cohort: Cohort;
  sessions: Session[];
}) {
  const [list, setList] = useState<SessionMaterial[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const classes = useStyles();
  const zoomTimes = zoomTimesPreview(activeSession?.times || []);
  const timeZone = zoomTimes?.split(' ')?.pop() || 'PST';
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const sendPreReadsEvent = (eventName: string) => {
    const preReading = list[currentStep];
    sendAnalyticsData(eventName, {
      'Session ID': activeSession?.id,
      'Session Number': activeSession?.number,
      'Session Name': activeSession?.name,
      'Reading ID': preReading?.id,
      'Reading Number': preReading?.index,
      'Reading Name': preReading?.name,
      'Reading Description': preReading?.description,
      'Reading URL': preReading?.action_url
    });
  };

  const sendSessionPreviewEvent = (eventName: string) => {
    sendAnalyticsData(eventName, {
      'Session ID': activeSession?.id,
      'Session Number': activeSession?.number,
      'Session Name': activeSession?.name
    });
  };

  const markAsComplete = useCallback(
    async (sessionMaterialId: string, nextStep: number) => {
      await dispatch(updateMaterialStatus(cohort?.id, activeSession?.id, sessionMaterialId, true));
      sendPreReadsEvent('Home Page - Prereads - "Next Reading" Selected');
      setCurrentStep(nextStep);
    },
    [cohort?.id, activeSession?.id, dispatch]
  );

  const previousReading = useCallback(() => {
    setCurrentStep(currentStep - 1);
    currentStep < list.length
      ? sendPreReadsEvent('Home Page - Prereads - "Previous Reading" Selected')
      : sendSessionPreviewEvent('Home Page - Session Preview - "Previous Reading" Selected');
  }, [currentStep, list]);

  const triggerSupplementaryEvent = useCallback(() => {
    sendSessionPreviewEvent(
      'Home Page - Session Preview - "Review Supplementary Resources" Selected'
    );
  }, []);

  const markAttendance = useCallback(() => {
    axios.post(`/cohorts/${cohort?.id}/cohort_session_attendance.json`, {
      status: 'attended_live',
      session_id: activeSession?.id
    });
  }, [activeSession?.id, cohort?.id]);

  useEffect(() => {
    const materialsList =
      activeSession?.materials?.filter((obj: any) => obj.included_in_get_ready_checklist) || [];
    setList(materialsList);

    const index = materialsList.findIndex((material) => !material?.complete);
    if (index !== -1) {
      setCurrentStep(index);
    } else {
      setCurrentStep(materialsList.length);
    }
  }, [activeSession?.materials?.length]);

  useEffect(() => {
    if (typeof activeSession !== 'undefined' && !activeSession.materials) {
      dispatch(getSessionMaterials(activeSession?.id, cohort.id));
    }
  }, [activeSession]);

  const SupplementaryButton = () => (
    <Button
      className={classes.homeNavigation}
      variant="outlined"
      component={RouterLink}
      to={`/cohorts/${cohort.id}/resources`}
      fullWidth
      onClick={triggerSupplementaryEvent}
    >
      Review Supplementary Resources
    </Button>
  );

  const PreviousButton = () => (
    <Button
      fullWidth
      className={classes.homeNavigation}
      variant="outlined"
      onClick={previousReading}
    >
      Previous Reading
    </Button>
  );

  const PreReadingData = memo(({ sessionMaterial }: { sessionMaterial: SessionMaterial }) => {
    const markReadingCompleted = () => markAsComplete(sessionMaterial.id, currentStep + 1);
    const handleReadingOpened = () =>
      sendPreReadsEvent('Home Page - Prereads - "Open Reading" Selected');

    return (
      <StyledBox>
        <ImageBox>
          <img
            src={
              sessionMaterial.thumbnail_image_url
                ? sessionMaterial.thumbnail_image_url
                : 'https://i.pinimg.com/736x/eb/62/3d/eb623d5675533da657fead95998004b4.jpg'
            }
            alt="session-prereading-img"
            width="100%"
          />
        </ImageBox>
        <Divider orientation="vertical" style={{ height: 'auto' }} />
        <PreReadingStack>
          <Box>
            <PreReadingTitle data-testid="pre-reading-title">
              Pre-Reading {sessionMaterial?.index}
            </PreReadingTitle>
            <PreReadingDetail data-testid="pre-reading-description">
              {sessionMaterial.name}
            </PreReadingDetail>
            <PreReadingDescription data-testid="pre-reading-description">
              {sessionMaterial.description}
            </PreReadingDescription>
          </Box>
          <Stack spacing={1} className={classes.navigationButtons}>
            <Button
              className={classes.homeNavigation}
              variant="contained"
              target="_blank"
              onClick={handleReadingOpened}
              href={sessionMaterial.action_url}
            >
              Open
            </Button>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
              {currentStep > 0 && <PreviousButton />}

              <Button
                fullWidth
                className={classes.homeNavigation}
                variant="outlined"
                onClick={markReadingCompleted}
              >
                Next Reading
              </Button>
            </Stack>
          </Stack>
        </PreReadingStack>
      </StyledBox>
    );
  });

  const renderSessionDetailNavigation = () => {
    const handleOpenMessaging = () => {
      sendSessionPreviewEvent('Home Page - Session Preview - "Open Messaging" Selected');
    };

    const handleJoinSession = () => {
      sendSessionPreviewEvent('Home Page - Session Preview - "Join Session" Selected');
      markAttendance();
      window.open(activeSession?.zoom_url || '');
    };

    if (isZoomLinkVisible(activeSession)) {
      return (
        <Stack spacing={1} style={{ marginTop: '30px' }}>
          <Button
            className={classes.homeNavigation}
            variant="contained"
            onClick={handleJoinSession}
          >
            Join Session
          </Button>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            {!activeSession?.networking_session && <SupplementaryButton />}
            <Button
              className={classes.homeNavigation}
              variant="outlined"
              fullWidth
              component={RouterLink}
              to={`/cohorts/${cohort.id}/messaging`}
              onClick={handleOpenMessaging}
            >
              Open Messaging
            </Button>
          </Stack>
        </Stack>
      );
    }

    return (
      <Stack spacing={1} style={{ marginTop: '30px' }}>
        <Button
          className={classes.homeNavigation}
          variant="contained"
          fullWidth
          component={RouterLink}
          to={`/cohorts/${cohort.id}/messaging`}
          onClick={handleOpenMessaging}
        >
          Open Messaging
        </Button>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
          {currentStep > 0 && <PreviousButton />}
          {!activeSession?.networking_session && <SupplementaryButton />}
        </Stack>
      </Stack>
    );
  };

  const cohortHostName = useMemo(() => {
    let hostName = cohort.host_full_name;
    if (cohort?.code === 'CS') {
      hostName = 'Matt Dixon';
      if ([3, 4].includes(activeSession?.number || -1)) {
        hostName = 'Ramsey Jay';
      }
    }
    return hostName;
  }, [activeSession, cohort]);

  const SessionDetailStep = () => (
    <StyledBox className={classes.message}>
      <DescriptionBox style={{ width: '100%' }}>
        <PreReadingTitle data-testid="pre-reading-title">
          {sessionName(activeSession, `Session ${activeSession?.number}: ${activeSession?.name}`)}
        </PreReadingTitle>
        <Box style={{ display: 'flex', alignItems: 'stretch', margin: '12px 0px' }}>
          <PreReadingDetail data-testid="pre-reading-description">
            Live with {activeSession?.networking_session ? 'your cohort' : cohortHostName},{' '}
            <span>
              <strong>
                {displayMultipleDates(activeSession?.times || [])}
                {', '}
                {zoomTimes.replace(timeZone, '(local time)')}
              </strong>
            </span>
          </PreReadingDetail>
        </Box>
        <SessionDescription innerContent={activeSession?.summary || ''} />
        {renderSessionDetailNavigation()}
      </DescriptionBox>
    </StyledBox>
  );

  const selectStep = () => {
    if (typeof activeSession === 'undefined') {
      return <GoodbyeSection cohort={cohort} />;
    }
    if (list.length && currentStep < list.length) {
      return <PreReadingData sessionMaterial={list[currentStep]} />;
    }
    return <SessionDetailStep />;
  };

  const selectHeading = useCallback(() => {
    if (list.length && currentStep < list.length) {
      return `👋 Welcome ${user?.first_name}, make sure you get ready for our ${sessionName(
        activeSession,
        `Session ${activeSession?.number}`
      )}!`;
    }
    if (isZoomLinkVisible(activeSession)) {
      return `🔴 Great to see you ${user?.first_name}, our ${sessionName(
        activeSession,
        `Session ${activeSession?.number}`
      )} is live!`;
    }
    if (activeSession?.networking_session) {
      return `👋 Hi ${user?.first_name}, you’re invited to our upcoming ${
        activeSession?.custom_name || 'Networking Session'
      }`;
    }
    if (typeof activeSession == 'undefined') {
      return '🎉 Welcome to the Alumni Community!';
    }
    return `🎉 Great work ${user?.first_name}, you’re ready to go for ${sessionName(
      activeSession,
      `Session ${activeSession?.number}`
    )}!`;
  }, [activeSession, currentStep]);

  return (
    <Container style={{ padding: '0' }}>
      <HomePageTitle data-testid="home-title">{selectHeading()}</HomePageTitle>
      {selectStep()}
    </Container>
  );
}
export default memo(NewHomeTab);
