import { Box, Button, Container, Divider, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
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
  color: '#000000',
  height: '350px'
}));

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
  const progress = () => ((currentStep + 1) / totalSteps) * 100;
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
          src="https://i.pinimg.com/736x/eb/62/3d/eb623d5675533da657fead95998004b4.jpg"
          alt="session-prereading-img"
        />
      </ImageBox>
      <Divider orientation="vertical" style={{ height: 'auto' }} />
      <DescriptionBox>
        <PreReadingTitle data-testid="pre-reading-title">
          Pre-Reading {currentStep + 1}
        </PreReadingTitle>
        <PreReadingDetail data-testid="pre-reading-description">
          {sessionMaterial.name}
        </PreReadingDetail>
        <PreReadingDescription data-testid="pre-reading-description">
          This is a very interesting read that gives context to the larger vision of multi-product
          plays. I think it is very important that you read it before our first session where we
          will explore this topic in more detail.
        </PreReadingDescription>
        <Stack direction="row" spacing={2} justifyContent="center">
          <NavigationButton variant="contained" href={sessionMaterial.action_url}>
            Open
          </NavigationButton>
          <NavigationButton variant="outlined" onClick={() => setCurrentStep(currentStep + 1)}>
            Mark as Complete
          </NavigationButton>
        </Stack>
      </DescriptionBox>
    </StyledBox>
  );

  const SessionDetailStep = () => (
    <StyledBox>
      <DescriptionBox>
        <PreReadingTitle data-testid="pre-reading-title">
          Session {activeSession?.number}: {activeSession?.name}
        </PreReadingTitle>
        <PreReadingDetail data-testid="pre-reading-description">
          Live with Ibrahim Bashir, August 16th, 4:30 pm (local time)
        </PreReadingDetail>
        <PreReadingDescription>
          We will cover the core components of an enterprise SaaS offering, including differences
          between horizontal and vertical SaaS, key metrics, land expand motions, pricing packaging
          basics, and buyer / user behavior. Key learning objectives include: The sniff test for
          evaluating the health of a B2B SaaS business Enterprise SaaS truisms based on companies
          that scaled vs failed Overview of different SaaS products that will appear in case studies
          in future sessions
        </PreReadingDescription>
        <Stack direction="row" spacing={2} justifyContent="center">
          <NavigationButton variant="contained" href={`/cohorts/${cohort.id}/Q&A`}>
            Ask Questions Through Messaging
          </NavigationButton>
          <NavigationButton variant="outlined" href={`/cohorts/${cohort.id}/calendar-instructions`}>
            Add Session to your Calendar
          </NavigationButton>
        </Stack>
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
      return '👋 Welcome Adrian, make sure you get ready for Session 1!';
    }
    return '🎉 Great work Adrian, you’re ready to go for Session 1!';
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
