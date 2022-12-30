import { useEffect, useState, useContext, useRef, memo } from 'react';
import { Box, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'utils/axios';
import { Modal } from 'components/animate';
import { CohortContext } from 'contexts/CohortContext';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { firstUpcomingDate, zoomTimesPreview } from 'components/cohorts/home/Common';
import ReactPlayer from 'react-player';
import { SurveyForm } from '../../../../components/cohorts/sessions';
import NewSlides from '../../../../components/cohorts/sessions/NewSlides';
import { Session } from '../../../../@types/cohorts';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { updateSessionModalState } from '../../../../redux/slices/sessionFeedback';
import { updateSessionFeedbackStatus } from '../../../../redux/slices/cohort';

// Video Place Holder
import JoinZoomPrompt from '../../../../components/cohorts/JoinZoomPrompt';
import SessionTimestamps from './SessionTimestamps';
import {
  SessionTab,
  SessionTabs,
  FeedbackButton,
  Wrapper,
  SessionsBoardContainer,
  StyledVideoPreview,
  SessionTitle,
  SessionNumber,
  RecordingSlelectForm,
  VideoPlayerWrapper,
  CircularLoader,
  useStyles
} from './Common';
// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
  isLearner: boolean;
  isFree: boolean;
};

const SessionBoard = ({ session, isLearner, isFree }: SessionBoardProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [recording, setRecording] = useState(session?.recording_urls[0]?.recording_url);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(session?.survey_completed);
  const dispatch = useDispatch();
  const feedbacks = useSelector((state: RootState) => state.sessionFeedback);
  const { id } = useContext(CohortContext);
  const [playing, setPlaying] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const feedback = params.get('open_feedback');
  const studentFeedback = params.get('student_feedback');
  const [modalState, setModal] = useState(
    !feedbacks[session?.id || ''] && (feedback === 'true' || studentFeedback === 'true')
  );
  const videoRefVimeo = useRef<any>(null);
  const videoRefS3 = useRef<any>(null);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const handlePlayTimeStamp = (seconds: string) => {
    if (videoRefVimeo.current) {
      videoRefVimeo.current.seekTo(Number(seconds));
      setPlaying(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (videoRefS3.current) {
      videoRefS3.current.currentTime = Number(seconds);
      videoRefS3.current.play();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const SurveyModal = memo(
    ({
      state,
      onClose,
      onComplete
    }: {
      state: boolean;
      onClose: Function;
      onComplete: Function;
    }) => (
      <Modal open={state} onClose={() => onClose()}>
        <SurveyForm
          key="surveyForm"
          onComplete={onComplete}
          sessionId={session?.id}
          sessionName={session?.name}
          session={session}
        />
      </Modal>
    )
  );

  const shouldDisplaySurveyModal = () => {
    if (feedback === 'true') {
      return true;
    }
    if (feedbackSubmitted || session?.survey_completed) return false;
    if (studentFeedback === 'true') return true;
    return shouldDisplaySurveyAlert();
  };

  const shouldDisplaySurveyAlert = () => {
    if (feedbackSubmitted || session?.survey_completed) return false;
    return session?.collect_feedback;
  };

  const commonProperties = {
    'Session ID': session?.id,
    'Session Number': session?.number,
    'Session Name': session?.name
  };

  useEffect(() => {
    setRecording(session?.recording_urls[0]?.recording_url);
    setFeedbackSubmitted(false);
    setModal(!feedbacks[session?.id || ''] && (feedback === 'true' || studentFeedback === 'true'));
  }, [session]);

  const markAttendance = (type: string) => {
    axios.post(`/cohorts/${id}/cohort_session_attendance`, {
      session_id: session?.id,
      status: type
    });
  };

  const tabsContent = [
    <NewSlides
      key={session?.id}
      onTrack={() =>
        sendAnalyticsData('Sessions Page - Slides - Tab Opened', {
          ...commonProperties
        })
      }
      sliderEvents={(eventName: string, slideNumber: number) => {
        sendAnalyticsData(eventName, {
          ...commonProperties,
          'Slide Number': slideNumber
        });
      }}
      pdfUrl={session?.presentation_pdf_url}
      pdfDownloadable={session?.presentation_pdf_downloadable}
      isFree={isFree}
    />
  ];

  if (session?.timestamps) {
    tabsContent.push(
      <SessionTimestamps
        timestamps={session?.timestamps || []}
        key="session_timestamps"
        handlePlayTimeStamp={(time: any) => handlePlayTimeStamp(time)}
        isRecordingAvailable={session?.recording_urls.length > 0}
        session={session}
      />
    );
  }

  if (!session) return null;

  return (
    <Wrapper>
      {shouldDisplaySurveyModal() && (
        <SurveyModal
          state={modalState}
          onClose={() => {
            setModal(false);
            dispatch(updateSessionModalState(session.id));
          }}
          onComplete={() => {
            setModal(false);
            setFeedbackSubmitted(true);
            dispatch(updateSessionFeedbackStatus(id, session.id));
            dispatch(updateSessionModalState(session.id));
          }}
        />
      )}

      <SessionsBoardContainer>
        <Box width="100%" py={2}>
          <SessionNumber data-testid="session-number">
            {`Session ${session.number} |`}{' '}
          </SessionNumber>
          <SessionTitle data-testid="session-title">{session.name}</SessionTitle>
        </Box>
        {!isFree && session.recording_urls && session.recording_urls.length ? (
          <>
            {recording?.includes('vimeo') ? (
              <>
                {loading && <CircularLoader />}
                <VideoPlayerWrapper>
                  <ReactPlayer
                    controls={true}
                    url={recording}
                    ref={videoRefVimeo}
                    playing={playing}
                    className={loading ? classes.hidden : classes.shown}
                    onReady={() => setLoading(false)}
                    sx={{ maxWidth: '100%' }}
                    onStart={() => markAttendance('watched_recording')}
                    onPause={() => {
                      sendAnalyticsData('Sessions Page - Recording Player - Play Pause', {
                        Timepoint: videoRefVimeo.current?.getCurrentTime()
                      });
                    }}
                    onSeek={() =>
                      sendAnalyticsData('Sessions Page - Recording Player - Timepoint Selected', {
                        Timepoint: videoRefVimeo.current?.getCurrentTime()
                      })
                    }
                    onPlay={() =>
                      sendAnalyticsData('Sessions Page - Recording Player - Play Clicked', {
                        Timepoint: videoRefVimeo.current?.getCurrentTime() || 0
                      })
                    }
                  />
                </VideoPlayerWrapper>
              </>
            ) : (
              <StyledVideoPreview
                src={recording}
                poster={session.recording_thumbnail_url}
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                ref={videoRefS3}
                onPlay={(e) => {
                  markAttendance('watched_recording');
                  sendAnalyticsData('Sessions Page - Recording Player - Play Clicked', {
                    Timepoint: videoRefS3.current?.currentTime
                  });
                }}
                onPause={(e) => {
                  sendAnalyticsData('Sessions Page - Recording Player - Play Pause', {
                    Timepoint: videoRefS3.current?.currentTime
                  });
                }}
                onSeeked={(e) => {
                  sendAnalyticsData('Sessions Page - Recording Player - Timepoint Selected', {
                    Timepoint: videoRefS3.current?.currentTime
                  });
                }}
                controls
                controlsList="nodownload"
                autoPlay={false}
                data-testid="session-video-url"
              />
            )}
          </>
        ) : (
          <JoinZoomPrompt
            displayType="large"
            isFree={isFree}
            sessionTimeValue={firstUpcomingDate(session.times)}
            sessionTimesPreview={zoomTimesPreview(session.times)}
            sessionZoomUrl={session.zoom_url}
            onClick={(sessionNumber: number) => {
              markAttendance('attended_live');
              sendAnalyticsData('Sessions Page - Session Preview - "Join Session" Selected', {
                ...commonProperties
              });
            }}
          />
        )}
        {!isFree && session.recording_urls && session?.recording_urls?.length > 1 && (
          <RecordingSlelectForm data-testid="view-mode">
            <InputLabel id="view-label">Select Recording</InputLabel>
            <Select
              displayEmpty
              labelId="view-label"
              id="view-label"
              value={recording}
              onChange={(e: any) => {
                setRecording(e.target.value);
                setLoading(true);
              }}
              label="Select Recording"
            >
              {session?.recording_urls.map((recording_url, index) => (
                <MenuItem
                  key={index}
                  value={recording_url.recording_url}
                  id="grid-view"
                  data-testid="peer-grid-view"
                >
                  {recording_url.name}
                </MenuItem>
              ))}
            </Select>
          </RecordingSlelectForm>
        )}
        {shouldDisplaySurveyAlert() && (
          <FeedbackButton onClick={() => setModal(true)}>
            <Box className="img-content">
              <img src="/static/icons/navbar/ic_sun.svg" alt="" />
            </Box>
            <Box className="text-content">
              <Typography>
                Please help Sphere make their platform better by filling out{' '}
                <strong>the following feedback form</strong>
              </Typography>
            </Box>
          </FeedbackButton>
        )}
        <SessionTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
          <SessionTab label="Session Slides" data-testid="session-slides" />
          <SessionTab label="Your Timestamps" data-testid="session-timestamps" />
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsBoardContainer>
    </Wrapper>
  );
};

export default memo(SessionBoard);
