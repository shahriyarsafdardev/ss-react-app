import React, { useEffect, useContext, useState } from 'react';
import { Typography, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import ReactConfetti from 'react-confetti';
import { Cohort } from '../../../@types/cohorts';
import { WelcomeMessage } from './NewHomeTabStyles';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '500px',
  width: '100%',
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundSize: '100%',
    backgroundPosition: 'top center'
  }
}));

const DesktopStack = styled(Stack)(({ theme }) => ({
  width: '50%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const MobileStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}));

const InstructorMessage = styled(Stack)(({ theme }) => ({
  padding: '60px 80px 60px 60px',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    padding: '40px',
    width: '100%'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '225px',
  borderRadius: '50px',
  backgroundColor: '#9D4EDD',
  '-webkit-animation': 'pulse 1.5s infinite',
  '&:hover': {
    opacity: 0.8
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '20px'
  }
}));

const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  objectFit: 'cover',
  position: 'absolute'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#ffffff'
}));

const InstructorImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  objectFit: 'cover',
  position: 'absolute',
  height: '260px',
  width: '260px',
  top: '3%',
  left: '48%',
  [theme.breakpoints.down('sm')]: {
    left: 'unset',
    right: '10px',
    top: '50%',
    height: '180px',
    width: '180px'
  }
}));

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default function WelcomePage({
  setActiveStepper,
  cohort
}: {
  setActiveStepper: Function;
  cohort: Cohort;
}) {
  const { user } = useAuth();
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const [confetti, setConfetti] = useState(200);
  const [windowSize] = useState(getWindowSize());
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  useEffect(() => {
    sendAnalyticsData('Cohort Onboarding - Welcome Page - Page Loaded', {});
    setTimeout(() => {
      setConfetti(0);
    }, 3000);
  }, []);

  const handleGettingReadyButton = () => {
    setActiveStepper(1);
    sendAnalyticsData('Cohort Onboarding - Welcome Page - "Get Ready To Learn" Selected', {});
  };

  const ReadyToLearnButton = () => (
    <StyledButton variant="contained" onClick={() => handleGettingReadyButton()}>
      Get ready to learn
    </StyledButton>
  );

  return (
    <>
      {displayConfetti && (
        <ReactConfetti
          width={windowSize?.innerWidth}
          height={windowSize?.innerHeight}
          numberOfPieces={confetti}
          colors={['#12125C', '#475569', '#000000', '#071A33']}
          onConfettiComplete={(confetti: any) => {
            setDisplayConfetti(false);
          }}
        />
      )}
      <Stack direction="column" spacing={2} width="100%">
        <Typography style={{ fontSize: '32px', fontWeight: 'bold' }}>
          Welcome, {user?.first_name}!
        </Typography>
        <StyledCard>
          <InstructorMessage spacing={2}>
            <StyledTypography>Hi {user?.first_name},</StyledTypography>
            <WelcomeMessage innerContent={cohort?.instructor_message || ''} />
            <Stack>
              <Typography color="#ffffff" style={{ fontSize: '15px' }}>
                Looking forward to seeing you soon,
              </Typography>
              <StyledTypography>{cohort?.host_full_name}</StyledTypography>
            </Stack>
          </InstructorMessage>
          <InstructorImage
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/instructor.svg"
            alt="test image"
          />
          <DesktopStack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-1.svg"
                alt="test image"
                style={{ top: '-6px', right: '25%', height: '130px', width: '130px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-2.svg"
                alt="test image"
                style={{ top: '24px', right: '-16px', height: '128px', width: '128px' }}
              />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" width="85%">
              <ReadyToLearnButton />
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-3.svg"
                alt="test image"
                style={{ bottom: '-25px', right: '50%', height: '162px', width: '162px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-4.svg"
                alt="test image"
                style={{ bottom: '-30px', right: '25%', height: '117px', width: '117px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-5.svg"
                alt="test image"
                style={{ bottom: '55px', right: '-16px', height: '118px', width: '118px' }}
              />
            </Stack>
          </DesktopStack>
          <MobileStack>
            <Stack direction="row" spacing={2} justifyContent="center" height="320px">
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-3.svg"
                alt="test image"
                style={{ top: '0', left: '-12px', height: '115px', width: '115px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-4.svg"
                alt="test image"
                style={{ top: '40%', left: '15px', height: '115px', width: '115px' }}
              />
            </Stack>
            <Stack direction="row" justifyContent="center">
              <ReadyToLearnButton />
            </Stack>
          </MobileStack>
        </StyledCard>
      </Stack>
    </>
  );
}
