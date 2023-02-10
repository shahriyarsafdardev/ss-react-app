import { useState, useEffect, useContext, memo } from 'react';
import { Stack, Button, useTheme, useMediaQuery } from '@material-ui/core';
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

const PERSONALIZED_CERTIFICATE_1 =
  'https://cohort-certificates.s3.eu-west-2.amazonaws.com/personalized-certificate-1.png';
const PERSONALIZED_CERTIFICATE_2 =
  'https://cohort-certificates.s3.eu-west-2.amazonaws.com/personalized-certificate-2.png';

const OffboardingPage = ({
  cohort,
  showSurveyButton
}: {
  cohort: Cohort;
  showSurveyButton: boolean;
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const url = new URLSearchParams(useLocation().search);
  const referrer = url.get('referrer') || '';
  const [modal, setModal] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const [confetti, setConfetti] = useState(200);
  const classes = useStyles();
  const lastSession = cohort.sessions
    .filter((session) => session.display_in_sessions_tab && Number.isInteger(session.number))
    .pop();
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const [feedbackModalState, setFeedbackModalState] = useState(!lastSession?.survey_completed);
  const [hasCompletedFeedback, setHasCompletedFeedback] = useState(false);
  const dispatch = useDispatch();
  const certificates = cohort.certificate_links.length
    ? cohort.certificate_links
    : [PERSONALIZED_CERTIFICATE_1, PERSONALIZED_CERTIFICATE_2];

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
    setHasCompletedFeedback(false);
    dispatch(updateSessionModalState(lastSession?.id || ''));
  };

  const handleSurveyModalCompleted = () => {
    dispatch(updateSessionFeedbackStatus(cohort.id, lastSession?.id || ''));
    dispatch(updateSessionModalState(lastSession?.id || ''));
    cohort?.code === 'AAB' ? handleSurveyModalClose() : setHasCompletedFeedback(true);
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
        cohort={cohort}
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
        spacing={{ md: 5, xs: 4 }}
        padding={{ md: '50px', sm: '25px', xs: '16px' }}
        className={classes.offboardingPageContainer}
      >
        <OffboardingHeader variant="h3">
          Congratulations, you have completed {cohort.name}! 🎉
        </OffboardingHeader>
        {isDesktop && (
          <OffboardingCarousel
            activeCertificate={activeCertificate}
            setActiveCertificate={setActiveCertificate}
            certificates={certificates}
          />
        )}
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
          {(!lastSession?.survey_completed || showSurveyButton) && (
            <Button
              className={classes.linkButton}
              variant="outlined"
              sx={{ color: '#fff !important', textTransform: 'none' }}
              onClick={handleShareFeedback}
            >
              Open End-of-cohort Survey
            </Button>
          )}
        </Stack>
        {!isDesktop && (
          <OffboardingCarousel
            activeCertificate={activeCertificate}
            setActiveCertificate={setActiveCertificate}
            certificates={certificates}
          />
        )}
      </Stack>
    </StyledBox>
  );
};

export default memo(OffboardingPage);
