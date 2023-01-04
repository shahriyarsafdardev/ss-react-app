import React, { useEffect, useContext, useState, memo } from 'react';
import { Typography, Stack, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import ReactConfetti from 'react-confetti';
import { Cohort } from '../../../@types/cohorts';
import { WelcomeMessage } from './NewHomeTabStyles';
import PreCohortChecklist from './PreCohortChecklist';
import ContentReleaseDetails from './ContentReleaseDetails';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '500px',
  width: '100%',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    height: '630px'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const InstructorMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 80px 60px 60px',
  borderRadius: '16px',
  width: '60%',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '57%'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '30px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#ffffff'
}));

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const WelcomePage = ({
  setActiveStepper,
  cohort
}: {
  setActiveStepper: Function;
  cohort: Cohort;
}) => {
  const { user } = useAuth();
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const [confetti, setConfetti] = useState(200);
  const [windowSize] = useState(getWindowSize());
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    sendAnalyticsData('Cohort Onboarding - Welcome Page - Page Loaded', {});
    setTimeout(() => {
      setConfetti(0);
    }, 3000);
  }, []);

  return (
    <>
      {hasOnboarded && displayConfetti && (
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
      <Stack key={cohort?.id} direction="column" spacing={2} width="100%">
        <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
          {hasOnboarded ? `Get ready for ${cohort?.name}` : `Welcome, ${user?.first_name}`}
        </Typography>
        <StyledCard>
          <InstructorMessage spacing={2}>
            <StyledTypography>Hi {user?.first_name},</StyledTypography>
            <WelcomeMessage innerContent={cohort?.instructor_message || ''} />
            <Stack>
              <Typography color="#ffffff" sx={{ fontSize: '15px' }}>
                Looking forward to seeing you soon,
              </Typography>
              <StyledTypography>{cohort?.host_full_names}</StyledTypography>
            </Stack>
          </InstructorMessage>
          {hasOnboarded ? (
            <ContentReleaseDetails />
          ) : (
            <Box width={{ xs: '80%', sm: '40%', md: '27%' }} sx={{ margin: 'auto' }}>
              <PreCohortChecklist
                setHasOnboarded={() => {
                  setActiveStepper(2);
                  setHasOnboarded(true);
                }}
              />
            </Box>
          )}
        </StyledCard>
      </Stack>
    </>
  );
};

export default memo(WelcomePage);
