import { Box, Button, Container, Divider, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { zoomTimesPreview, displayMultipleDates, firstUpcomingDate } from './Common';

import { Cohort, Session, SessionMaterial } from '../../../@types/cohorts';
import {
  BorderLinearProgress,
  CurrentStep,
  ProgressBarContainer
} from '../onboarding/HomeTabHeader';
import axios from '../../../utils/axios';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  padding: '24px',
  borderRadius: '16px',
  display: 'flex',
  gap: '32px',
  marginTop: '32px'
}));

const ImageBox = styled(Box)(() => ({
  width: '50%',
  borderRadius: '8px'
}));

const DescriptionBox = styled(Box)(() => ({
  width: '50%'
}));

const HomePageTitle = styled(Typography)(() => ({
  color: '#334155',
  fontWeight: 'bold',
  fontSize: '32px',
  marginBottom: '24px'
}));

const PreReadingTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 24,
  lineHeight: '24px',
  color: '#475569'
}));

const PreReadingDetail = styled(Typography)(() => ({
  fontWeight: 'normal',
  fontSize: 16,
  lineHeight: '24px',
  marginTop: '12px',
  color: '#64748B'
}));

const PreReadingDescription = styled(Typography)(() => ({
  fontWeight: 'normal',
  fontSize: 18,
  lineHeight: '27px',
  marginTop: '24px',
  color: '#000000'
}));

const SessionDescription = ({ innerContent }: { innerContent: string }) => (
  <Box
    dangerouslySetInnerHTML={{ __html: innerContent }}
    style={{
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: '27px',
      marginTop: '24px',
      color: '#000000'
    }}
  />
);

const NavigationButton = styled(Button)(() => ({
  width: '50%',
  borderRadius: '1000px',
  padding: '13px'
}));

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
  const progress = () => ((currentStep + 1) / totalSteps) * 100;
  const isZoomLinkVisible = () => {
    if (activeSession) {
      const sessionTime = moment(firstUpcomingDate(activeSession.times));
      // Show zoom link preview before 1 hour and till 2 hours after session time
      return sessionTime < moment().add(1, 'hours') && moment().subtract(2, 'hours') < sessionTime;
    }
    return false;
  };
  useEffect(() => {
    const initMaterials = async () => {
      if (activeSession) {
        try {
          const response = await axios.get(
            `/cohort_sessions/${activeSession.id}/session_materials.json`
          );
          setList(response.data);
          setIsLoading(false);
          setTotalSteps(totalSteps + response.data.length);
        } catch (error) {
          console.log(error);
        }
      }
    };
    initMaterials();
  }, [activeSession]);

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
        />
      </ImageBox>
      <Divider orientation="vertical" style={{ height: 'auto' }} />
      <Stack direction="column" style={{ width: '50%', position: 'relative' }}>
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
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          style={{ position: 'absolute', bottom: 0, width: '100%' }}
        >
          <NavigationButton variant="contained" href={sessionMaterial.action_url}>
            Open
          </NavigationButton>
          <NavigationButton variant="outlined" onClick={() => setCurrentStep(currentStep + 1)}>
            Mark as Complete
          </NavigationButton>
        </Stack>
      </Stack>
    </StyledBox>
  );

  const renderSessionDetailNavigation = () => {
    if (isZoomLinkVisible()) {
      return (
        <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: '46px' }}>
          <NavigationButton variant="contained" href={activeSession?.zoom_url}>
            Join Session
          </NavigationButton>
          <NavigationButton variant="outlined" href={`/cohorts/${cohort.id}/Q&A`}>
            Ask Questions through Messaging
          </NavigationButton>
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: '46px' }}>
        <NavigationButton variant="contained" href={`/cohorts/${cohort.id}/Q&A`}>
          Ask Questions Through Messaging
        </NavigationButton>
        <NavigationButton variant="outlined" href={`/cohorts/${cohort.id}/calendar-instructions`}>
          Add Session to your Calendar
        </NavigationButton>
      </Stack>
    );
  };

  const SessionDetailStep = () => (
    <StyledBox style={{ padding: '50px' }}>
      <DescriptionBox style={{ width: '100%' }}>
        <PreReadingTitle data-testid="pre-reading-title">
          Session {activeSession?.number}: {activeSession?.name}
        </PreReadingTitle>
        <Box style={{ display: 'flex', alignItems: 'stretch', margin: '12px 0px' }}>
          <img
            src={
              cohort.host_image_url
                ? cohort.host_image_url
                : 'https://scholarsite-public.s3.eu-west-2.amazonaws.com/muhammad-mahboob-050c9c'
            }
            alt="instructor-img"
            style={{ width: '40px', height: '40px', marginRight: '20px', borderRadius: '50%' }}
          />
          <PreReadingDetail data-testid="pre-reading-description">
            Live with {cohort.host_names} {displayMultipleDates(activeSession?.times || [])}{' '}
            {zoomTimesPreview(activeSession?.times || [])}
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
    if (isZoomLinkVisible()) {
      return `🔴 Great to see you ${user?.first_name}, Session ${activeSession?.number}! 1 is live!`;
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
