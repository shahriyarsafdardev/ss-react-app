import { Box, Container, Divider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import { zoomTimesPreview, displayMultipleDates, isZoomLinkVisible } from './Common';

import { Cohort, Session, SessionMaterial } from '../../../@types/cohorts';
import { CurrentStep, ProgressBarContainer } from '../onboarding/HomeTabHeader';
import axios from '../../../utils/axios';
import {
  StyledBox,
  ImageBox,
  DescriptionBox,
  PreReadingStack,
  NavigationStack,
  HomePageTitle,
  PreReadingTitle,
  PreReadingDetail,
  PreReadingDescription,
  SessionDescription,
  NavigationButton,
  BorderLinearProgress
} from './NewHomeTabStyles';

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
  const [totalSteps, setTotalSteps] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const zoomTimes = zoomTimesPreview(activeSession?.times || []);
  const timeZone = zoomTimes?.split(' ')?.pop() || 'PST';
  const progress = () => ((currentStep + 1) / totalSteps) * 100;
  useEffect(() => {
    const initMaterials = async () => {
      if (activeSession) {
        try {
          const response = await axios.get(
            `/cohort_sessions/${activeSession.id}/session_materials.json`
          );
          setList(response.data.filter((obj: any) => obj.complete !== true));
          setIsLoading(false);
          setTotalSteps(
            totalSteps + response.data.filter((obj: any) => obj.complete !== true).length
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    initMaterials();
  }, [activeSession]);

  const markAsComplete = async (sessionMaterialId: string) => {
    await axios
      .post(
        `/cohort_sessions/${activeSession?.id}/session_materials/${sessionMaterialId}/submit_checklist.json`,
        {
          complete: true
        }
      )
      .then((res) => {
        if (res.data) {
          setCurrentStep(currentStep + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PreReadingData = ({ sessionMaterial }: { sessionMaterial: SessionMaterial }) => (
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
            Pre-Reading {currentStep + 1}
          </PreReadingTitle>
          <PreReadingDetail data-testid="pre-reading-description">
            {sessionMaterial.name}
          </PreReadingDetail>
          <PreReadingDescription data-testid="pre-reading-description">
            {sessionMaterial.description}
          </PreReadingDescription>
        </Box>
        <NavigationStack>
          <NavigationButton variant="contained" href={sessionMaterial.action_url}>
            Open
          </NavigationButton>
          <NavigationButton variant="outlined" onClick={() => markAsComplete(sessionMaterial.id)}>
            Mark as Complete
          </NavigationButton>
        </NavigationStack>
      </PreReadingStack>
    </StyledBox>
  );

  const renderSessionDetailNavigation = () => {
    if (isZoomLinkVisible(activeSession)) {
      return (
        <NavigationStack style={{ marginTop: '46px', position: 'inherit' }}>
          <NavigationButton variant="contained" href={activeSession?.zoom_url}>
            Join Session
          </NavigationButton>
          <NavigationButton variant="outlined" href={`/cohorts/${cohort.id}/Q&A`}>
            Ask Questions through Messaging
          </NavigationButton>
        </NavigationStack>
      );
    }
    return (
      <NavigationStack style={{ marginTop: '46px', position: 'inherit' }}>
        <NavigationButton variant="contained" href={`/cohorts/${cohort.id}/Q&A`}>
          Ask Questions Through Messaging
        </NavigationButton>
        <NavigationButton variant="outlined" href={`/cohorts/${cohort.id}/calendar-instructions`}>
          Add Session to your Calendar
        </NavigationButton>
      </NavigationStack>
    );
  };

  const SessionDetailStep = () => (
    <StyledBox style={{ padding: '50px' }}>
      <DescriptionBox style={{ width: '100%' }}>
        <PreReadingTitle data-testid="pre-reading-title">
          Session {activeSession?.number}: {activeSession?.name}
        </PreReadingTitle>
        <Box style={{ display: 'flex', alignItems: 'stretch', margin: '12px 0px' }}>
          <PreReadingDetail data-testid="pre-reading-description">
            Live with {cohort.host_full_name}'s on{' '}
            {displayMultipleDates(activeSession?.times || [])}
            {', '}
            {zoomTimes.replace(timeZone, '(local time)')}
          </PreReadingDetail>
        </Box>
        <SessionDescription innerContent={activeSession?.summary || ''} />
        {renderSessionDetailNavigation()}
      </DescriptionBox>
    </StyledBox>
  );

  const selectStep = () => {
    if (list.length && currentStep < list.length) {
      return <PreReadingData sessionMaterial={list[currentStep]} />;
    }
    return <SessionDetailStep />;
  };
  const selectHeading = () => {
    if (list.length && currentStep < list.length) {
      return `👋 Welcome ${user?.first_name}, make sure you get ready for Session ${activeSession?.number}!`;
    }
    if (isZoomLinkVisible(activeSession)) {
      return `🔴 Great to see you ${user?.first_name}, Session ${activeSession?.number} is live!`;
    }
    return `🎉 Great work ${user?.first_name}, you’re ready to go for Session ${activeSession?.number}!`;
  };

  return !isLoading ? (
    <Container>
      <HomePageTitle data-testid="home-title">{selectHeading()}</HomePageTitle>
      <ProgressBarContainer>
        <BorderLinearProgress style={{ height: 8 }} variant="determinate" value={progress()} />
        <CurrentStep>
          {currentStep + 1}/{totalSteps}
        </CurrentStep>
      </ProgressBarContainer>
      {selectStep()}
    </Container>
  ) : (
    <LoadingContainer>
      <LoadingScreen />
    </LoadingContainer>
  );
}

export default NewHomeTab;
