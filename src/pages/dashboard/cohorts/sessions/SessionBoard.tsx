import { useEffect, useState, useContext } from 'react';
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
import { Modal } from 'components/animate';
import { SESSION_EVENTS } from 'utils/amplitude';
import { CohortContext, SessionContext } from 'contexts/CohortContext';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { surveyTime, firstUpcomingDate, zoomTimesPreview } from 'components/cohorts/home/Common';
import moment from 'moment';
import {
  SessionMaterials,
  Description,
  Summary,
  SurveyForm,
  Slides,
  InstructorSessionMaterials
} from '../../../../components/cohorts/sessions';
import { Session } from '../../../../@types/cohorts';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { updateSessionModalState } from '../../../../redux/slices/sessionFeedback';
import { updateSessionFeedbackStatus } from '../../../../redux/slices/cohort';

// Video Place Holder
import JoinZoomPrompt from '../../../../components/cohorts/JoinZoomPrompt';

// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
  isLearner: boolean;
};

const SessionTab = styled(Tab)(({ theme }) => ({
  color: '#595853',
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
    color: '#6C7885',
    '&.Mui-selected': {
      color: '#212B36'
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

export default function SessionBoard({ session, isLearner }: SessionBoardProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [recording, setRecording] = useState(session?.recording_urls[0]?.recording_url);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const dispatch = useDispatch();
  const feedbacks = useSelector((state: RootState) => state.sessionFeedback);
  const [modalState, setModal] = useState(!feedbacks[session?.id || '']);
  const { id } = useContext(CohortContext);
  const { sessionNumber } = useContext(SessionContext);
  const params = new URLSearchParams(window.location.search);
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const feedback = params.get('open_feedback');

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
    if (session && session.times) {
      const currentTime = moment();
      const sessionTime = surveyTime(session.times);
      const surveyReleaseTime = moment(sessionTime).add(30, 'minutes');
      const surveyCloseTime = moment(sessionTime).add(48, 'hours');
      if (currentTime > surveyReleaseTime && currentTime < surveyCloseTime) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setRecording(session?.recording_urls[0]?.recording_url);
    setFeedbackSubmitted(false);
    setModal(!feedbacks[session?.id || '']);
  }, [session]);

  const tabsContent = [
    <>
      <Description
        key="description"
        onTrack={(eventData: string) =>
          sendAnalyticsData(sessionNumber, SESSION_EVENTS.resources_tab, eventData)
        }
        innerContent={session?.description || ''}
        resourcesPresent={session?.session_materials && session?.session_materials?.length > 0}
      />
      {!isLearner ? (
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
      ) : (
        <SessionMaterials
          groupedMaterials={session?.session_materials || []}
          sessionId={session?.id}
          cohortId={id}
          key="session_materials"
          onTrack={(eventData: string) =>
            sendAnalyticsData(sessionNumber, SESSION_EVENTS.resources_tab, eventData)
          }
        />
      )}
    </>,
    <Slides
      key={session?.id}
      onTrack={(eventData: string) =>
        sendAnalyticsData(sessionNumber, SESSION_EVENTS.slides_tab, eventData)
      }
      pdfUrl={session?.presentation_pdf_url}
      pdfDownloadable={session?.presentation_pdf_downloadable}
    />,
    <Summary
      key="summary"
      onTrack={(eventData: string) =>
        sendAnalyticsData(sessionNumber, SESSION_EVENTS.summary_tab, eventData)
      }
      innerContent={session?.summary || ''}
    />
  ];

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
        {session.recording_urls && session.recording_urls.length ? (
          <StyledVideoPreview
            src={recording}
            poster={session.recording_thumbnail_url}
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
            onPlay={(e) => {
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
        ) : (
          <JoinZoomPrompt
            displayType="large"
            sessionTimeValue={firstUpcomingDate(session.times)}
            sessionTimesPreview={zoomTimesPreview(session.times)}
            sessionZoomUrl={session.zoom_url}
            onClick={(sessionNumber: number) => {
              sendAnalyticsData(
                sessionNumber,
                SESSION_EVENTS.zoom_preview,
                SESSION_EVENTS.opened_zoom_link
              );
            }}
          />
        )}
        {session.recording_urls && session?.recording_urls?.length > 1 && (
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
              label="Recording"
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
        {shouldDisplaySurveyModal() && (
          <FeedbackButton onClick={() => setModal(true)}>
            <Box className="img-content">
              <img src="/static/icons/navbar/ic_sun.svg" alt="" />
            </Box>
            <Box className="text-content">
              <Typography>
                Please help ScholarSite make their platform better by filling out{' '}
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
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Wrapper>
  );
}
