import { useState, useEffect, useContext, memo } from 'react';
import { Stack, Button } from '@material-ui/core';
import ReactConfetti from 'react-confetti';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useDispatch } from 'redux/store';
import { updateSessionModalState } from 'redux/slices/sessionFeedback';
import { updateSessionFeedbackStatus } from 'redux/slices/cohort';
import { useLocation } from 'react-router-dom';
import { Cohort } from '../../../@types/cohorts';
import OffboardingModal from './OffboardingModal';
import OffboardingCarousel from './OffboardingCarousel';
import { StyledBox, OffboardingHeader, useStyles, SurveyModal } from './Common';

const OffboardingPage = ({ cohort }: { cohort: Cohort }) => {
  const [modal, setModal] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const [confetti, setConfetti] = useState(200);
  const classes = useStyles();
  const lastSession = cohort.sessions.filter((session) => session.display_in_sessions_tab).pop();
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const [feedbackModalState, setFeedbackModalState] = useState(false);
  const [hasCompletedFeedback, setHasCompletedFeedback] = useState(false);
  const dispatch = useDispatch();
  const url = new URLSearchParams(useLocation().search);
  const referrer = url.get('referrer') || '';
  const certificates = cohort?.certificate_links;

  useEffect(() => {
    sendAnalyticsData('Cohort Offboarding - Page loaded', {});
    if (referrer === 'email') {
      sendAnalyticsData(
        'Email - Final Session Complete - "Download my certificate" button clicked',
        {}
      );
    }
    setTimeout(() => {
      setConfetti(0);
    }, 3000);
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'visible';
  }, [modal]);

  const handleDownloadAndShare = () => {
    sendAnalyticsData('Cohort Offboarding - "Download and Share" button clicked', {});
    setModal(!modal);
  };

  const handleShareFeedback = () => {
    setFeedbackModalState(true);
    sendAnalyticsData('Cohort Offboarding - "Open End-of-cohort Survey" button clicked', {});
  };

  const handleSurveyModalClose = () => {
    setFeedbackModalState(false);
    dispatch(updateSessionModalState(lastSession?.id || ''));
  };

  const handleSurveyModalCompleted = () => {
    setHasCompletedFeedback(true);
    dispatch(updateSessionFeedbackStatus(cohort?.id, lastSession?.id || ''));
    dispatch(updateSessionModalState(lastSession?.id || ''));
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
      <SurveyModal
        hasCompletedFeedback={hasCompletedFeedback}
        state={feedbackModalState}
        onClose={handleSurveyModalClose}
        onComplete={handleSurveyModalCompleted}
        session={lastSession}
      />
      <Stack
        spacing={{ md: 5, xs: 3 }}
        padding={{ md: '50px', sm: '25px', xs: '16px' }}
        className={classes.offboardingPageContainer}
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
            className={`${classes.linkButton} ${classes.downloadButton}`}
            variant="contained"
            onClick={handleDownloadAndShare}
          >
            Download and Share
          </Button>
          <Button
            className={classes.linkButton}
            variant="outlined"
            sx={{ color: '#fff !important', textTransform: 'none' }}
            onClick={handleShareFeedback}
          >
            Open End-of-cohort Survey
          </Button>
        </Stack>
      </Stack>
    </StyledBox>
  );
};

export default memo(OffboardingPage);
