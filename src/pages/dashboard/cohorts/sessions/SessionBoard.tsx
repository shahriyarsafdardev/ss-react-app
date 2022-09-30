import { useEffect, useState, useContext, useRef } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { Modal } from 'components/animate';
import { SESSION_EVENTS } from 'utils/amplitude';
import { CohortContext, SessionContext } from 'contexts/CohortContext';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { firstUpcomingDate, zoomTimesPreview } from 'components/cohorts/home/Common';
import ReactPlayer from 'react-player';
import {
  SessionMaterials,
  Description,
  Summary,
  SurveyForm
} from '../../../../components/cohorts/sessions';
import NewSlides from '../../../../components/cohorts/sessions/NewSlides';
import { Session } from '../../../../@types/cohorts';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { updateSessionModalState } from '../../../../redux/slices/sessionFeedback';
import { updateSessionFeedbackStatus } from '../../../../redux/slices/cohort';

// Video Place Holder
import JoinZoomPrompt from '../../../../components/cohorts/JoinZoomPrompt';
import SessionTimestamps from './SessionTimestamps';

// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
  isLearner: boolean;
  isFree: boolean;
};

const SessionTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: 'space-around',
  marginRight: 0,
  width: '20%',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

const SessionTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
  margin: '20px 0',
  backgroundColor: '#F4F6F8',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  justifyContent: 'center',
  overflow: 'unset !important',
  [theme.breakpoints.down('sm')]: {
    button: {
      width: '30%',
      minWidth: 60,
      fontSize: 12
    },
    '.MuiTabs-flexContainer': {
      justifyContent: 'center'
    }
  },
  [theme.breakpoints.between(900, 1000)]: {
    justifyContent: 'space-evenly',
    paddingLeft: '10px',
    button: {
      width: '18%',
      minWidth: 30,
      fontSize: 15
    }
  },
  [theme.breakpoints.between(1200, 1300)]: {
    justifyContent: 'space-evenly',
    paddingLeft: '10px',
    button: {
      width: '18%',
      minWidth: 30,
      fontSize: 15
    }
  },
  [theme.breakpoints.between(600, 700)]: {
    justifyContent: 'space-evenly',
    paddingLeft: '10px',
    button: {
      width: '18%',
      minWidth: 30,
      fontSize: 15
    }
  },
  '.MuiTabs-flexContainer': {
    justifyContent: 'space-evenly'
  },
  button: {
    justifyContent: 'center',
    '&.css-pjf68w-MuiButtonBase-root-MuiTab-root': {
      paddingTop: '15px',
      marginRight: '0 !important'
    },
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main
    }
  }
}));

const FeedbackButton = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: '#D0F2FF',
  display: 'flex',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '25px',
  '.img-content': {
    width: '40px',
    [theme.breakpoints.down('sm')]: {
      width: '80px'
    }
  }
}));

const Wrapper = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0
  }
}));

const SessionsContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: 0
  }
}));

const StyledVideoPreview = styled('video')(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: '20px'
}));

const SessionTitle = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  minHeight: '50px',
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

const SessionNumber = styled('span')(({ theme }) => ({
  fontWeight: 400,
  minHeight: '50px',
  marginRight: 1,
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

const RecordingSlelectForm = styled(FormControl)(({ theme }) => ({
  marginTop: '15px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function SessionBoard({ session, isLearner, isFree }: SessionBoardProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [recording, setRecording] = useState(session?.recording_urls[0]?.recording_url);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(session?.survey_completed);
  const dispatch = useDispatch();
  const feedbacks = useSelector((state: RootState) => state.sessionFeedback);
  const { id } = useContext(CohortContext);
  const { sessionNumber } = useContext(SessionContext);
  const params = new URLSearchParams(window.location.search);
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const feedback = params.get('open_feedback');
  const studentFeedback = params.get('student_feedback');
  const [modalState, setModal] = useState(
    !feedbacks[session?.id || ''] && (feedback === 'true' || studentFeedback === 'true')
  );
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const videoRef = useRef<any>();

  const SurveyModal = ({
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
    <>
      <Description
        key="description"
        onTrack={(eventData: string) =>
          sendAnalyticsData(sessionNumber, SESSION_EVENTS.resources_tab, eventData)
        }
        innerContent={session?.description || ''}
        resourcesPresent={session?.materials && session?.materials?.length > 0}
      />
      {/* {!isLearner ? (
        <InstructorSessionMaterials
          groupedMaterialsProp={session?.session_materials || []}
          sessionId={session?.id}
          cohortId={id}
          key="instructor_session_materials"
          onTrack={
            (eventData: string) => {}
            // sendAnalyticsData(sessionNumber, SESSION_EVENTS.resources_tab, eventData)
          }
        />
      ) : ( */}
      <SessionMaterials
        materials={session?.materials?.filter((m) => m.included_in_session_materials_tab) || []}
        sessionId={session?.id}
        cohortId={id}
        key="session_materials"
        cohort={cohort}
        onTrack={(eventData: string) =>
          sendAnalyticsData(sessionNumber, SESSION_EVENTS.resources_tab, eventData)
        }
      />
      {/* )} */}
    </>,
    <NewSlides
      key={session?.id}
      onTrack={(eventData: string) =>
        sendAnalyticsData(sessionNumber, SESSION_EVENTS.slides_tab, eventData)
      }
      pdfUrl={session?.presentation_pdf_url}
      pdfDownloadable={session?.presentation_pdf_downloadable}
      isFree={isFree}
    />
  ];

  if (session?.summary_notes_included) {
    tabsContent.push(
      <Summary
        key="summary"
        onTrack={(eventData: string) =>
          sendAnalyticsData(sessionNumber, SESSION_EVENTS.summary_tab, eventData)
        }
        innerContent={session?.summary || ''}
      />
    );
  }

  if (session?.timestamps) {
    tabsContent.push(
      <SessionTimestamps
        timestamps={session?.timestamps || []}
        key="session_timestamps"
        videoReference={videoRef}
        sessionId={session?.id}
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

      <SessionsContainer>
        <Box width="100%" marginBottom={2}>
          <SessionNumber data-testid="session-number">
            {`Session ${session.number} |`}{' '}
          </SessionNumber>
          <SessionTitle data-testid="session-title">{session.name}</SessionTitle>
        </Box>
        {!isFree && session.recording_urls && session.recording_urls.length ? (
          <>
            {recording?.includes('vimeo') ? (
              <ReactPlayer controls={true} url={recording} />
            ) : (
              <StyledVideoPreview
                src={recording}
                poster={session.recording_thumbnail_url}
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onPlay={(e) => {
                  markAttendance('watched_recording');
                  sendAnalyticsData(
                    sessionNumber,
                    SESSION_EVENTS.recording_video_player,
                    'Clicked Play'
                  );
                }}
                onPause={(e) => {
                  sendAnalyticsData(
                    sessionNumber,
                    SESSION_EVENTS.recording_video_player,
                    'Clicked Pause'
                  );
                }}
                onSeeked={(e) => {
                  sendAnalyticsData(
                    sessionNumber,
                    SESSION_EVENTS.recording_video_player,
                    'Selected New Timepoint'
                  );
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
              sendAnalyticsData(
                sessionNumber,
                SESSION_EVENTS.zoom_preview,
                SESSION_EVENTS.opened_zoom_link
              );
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
          <SessionTab label="Resources" data-testid="session-resources" />
          <SessionTab label="Session Slides" data-testid="session-slides" />
          {session?.summary_notes_included && (
            <SessionTab label="Summary Notes" data-testid="session-notes" />
          )}
          {session?.timestamps && session?.timestamps.length > 0 && (
            <SessionTab label="Your Timestamps" data-testid="session-timestamps" />
          )}
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Wrapper>
  );
}
