import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { Container, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';
import { SESSION_EVENTS, trackSessionsPageEvent } from 'utils/amplitude';
import { CohortContext, SessionContext } from 'contexts/CohortContext';
import { Description, Summary, SurveyForm, Slides } from '../../../../components/cohorts/sessions';
import { Session } from '../../../../@types/cohorts';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { updateSessionModalState } from '../../../../redux/slices/sessionFeedback';
import { updateSessionFeedbackStatus } from '../../../../redux/slices/cohort';

// Video Place Holder
import VideoPlaceHolder from '../../../../components/cohorts/VideoPlaceHolder';

// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
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

export default function SessionBoard({ session }: SessionBoardProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const dispatch = useDispatch();
  const feedbacks = useSelector((state: RootState) => state.sessionFeedback);
  const [modalState, setModal] = useState(!feedbacks[session?.id || '']);
  const { id, cohortName, cohortIntake } = useContext(CohortContext);
  const { sessionNumber } = useContext(SessionContext);
  const params = new URLSearchParams(window.location.search);
  const feedbackSessionNumber = Number(params.get('session'));
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
    if (session && session.time) {
      const sessionTime1 = new Date(session.time);
      const sessionTime2 = new Date(session.time);
      const currentTime = new Date();
      const surveyReleaseTime = sessionTime1;
      surveyReleaseTime.setHours(surveyReleaseTime.getHours() + 1);
      const surveyCloseTime = sessionTime2;
      surveyCloseTime.setHours(surveyCloseTime.getHours() + 24);
      if (currentTime > surveyReleaseTime && currentTime < surveyCloseTime) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setFeedbackSubmitted(false);
    setModal(!feedbacks[session?.id || '']);
  }, [session]);

  const tabsContent = [
    <Description
      key="description"
      onTrack={(eventData: string) =>
        trackSessionsPageEvent(
          cohortName,
          cohortIntake,
          sessionNumber,
          SESSION_EVENTS.resources_tab,
          eventData
        )
      }
      innerContent={session?.description || ''}
    />,
    <Summary key="summary" innerContent={session?.summary || ''} />,
    <Slides
      key="slidesTab"
      onTrack={(eventData: string) =>
        trackSessionsPageEvent(
          cohortName,
          cohortIntake,
          sessionNumber,
          SESSION_EVENTS.slides_tab,
          eventData
        )
      }
      pdfUrl={session?.presentation_pdf_url}
      pdfDownloadable={session?.presentation_pdf_downloadable}
    />
  ];

  if (!session) return null;

  console.log(session);

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
        {session.recording_url && session.recording_url !== '' ? (
          <StyledVideoPreview
            src={session.recording_url}
            poster={session.recording_thumbnail_url}
            controls
            controlsList="nodownload"
            autoPlay={false}
            data-testid="session-video-url"
          />
        ) : (
          <VideoPlaceHolder sessionTimeValue={session.time} sessionZoomUrl={session.zoom_url} />
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
          <SessionTab label="Summary Notes" data-testid="session-notes" />
          <SessionTab label="Session Slides" data-testid="session-slides" />
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Wrapper>
  );
}
