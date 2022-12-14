import { useState, useEffect, useContext } from 'react';
import { Stack, Button } from '@material-ui/core';
import ReactConfetti from 'react-confetti';
import { Link as RouterLink } from 'react-router-dom';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Cohort } from '../../../@types/cohorts';
import OffboardingModal from './OffboardingModal';
import OffboardingCarousel from './OffboardingCarousel';
import { StyledBox, OffboardingHeader, useStyles } from './Common';

export default function OffboardingPage({ cohort }: { cohort: Cohort }) {
  const [modal, setModal] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [certificates, setCertificates] = useState(cohort?.certificate_links);
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const [confetti, setConfetti] = useState(200);
  const classes = useStyles();
  const sessionsLength = cohort.sessions.filter(
    (session) => session.display_in_sessions_tab
  ).length;
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  useEffect(() => {
    sendAnalyticsData('Cohort Offboarding - Page loaded', {});
    setTimeout(() => {
      setConfetti(0);
    }, 3000);
  }, []);

  const handleDownloadAndShare = () => {
    sendAnalyticsData('Cohort Offboarding - "Download and Share" button clicked', {});
    setModal(!modal);
  };

  const handleShareFeedback = () => {
    sendAnalyticsData('Cohort Offboarding - "Share Feedback" button clicked', {});
  };

  return (
    <StyledBox>
      {displayConfetti && (
        <ReactConfetti
          numberOfPieces={confetti}
          colors={['#12125C', '#475569', '#000000', '#071A33']}
          onConfettiComplete={(confetti: any) => {
            setDisplayConfetti(false);
          }}
        />
      )}
      <OffboardingModal
        modalState={modal}
        setModalState={setModal}
        activeImage={certificates[activeCertificate]}
      />
      <Stack
        spacing={{ md: 5, xs: 3 }}
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ maxWidth: '1200px', p: { md: '50px', sm: '25px', xs: '16px' } }}
      >
        <OffboardingHeader variant="h3">
          Congratulations, you have completed Applied Causal Inference! 🎉
        </OffboardingHeader>

        <OffboardingCarousel
          activeCertificate={activeCertificate}
          setActiveCertificate={setActiveCertificate}
          certificates={certificates}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          width="100%"
          justifyContent="center"
          sx={{ maxWidth: '1200px' }}
        >
          <Button
            className={classes.linkButton}
            variant="contained"
            sx={{ color: '#101658', backgroundColor: '#fff' }}
            onClick={() => handleDownloadAndShare()}
          >
            Download and share
          </Button>
          <Button
            className={classes.linkButton}
            variant="outlined"
            to={`/cohorts/${cohort.id}/sessions?session=${sessionsLength}&student_feedback=true`}
            component={RouterLink}
            sx={{ color: '#fff !important' }}
            onClick={() => handleShareFeedback()}
          >
            Share feedback
          </Button>
        </Stack>
      </Stack>
    </StyledBox>
  );
}
