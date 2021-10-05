import { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';
import { Description, Summary, SurveyForm, Slides } from '../../../../components/cohorts/sessions';
import { Session } from '../../../../@types/cohorts';

// Video player
import VideoPreview from '../../../../components/cohorts/VideoPreview';

// Video Place Holder
import VideoPlaceHolder from '../../../../components/cohorts/VideoPlaceHolder';

// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
};

const SessionTab = styled(Tab)(({ theme }) => ({
  color: '#595853',
  justifyContent: 'space-between',
  width: '27%',
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
    'button:not(:last-child)': {
      marginRight: '0px !important'
    },
    '.MuiTabs-flexContainer': {
      justifyContent: 'center'
    }
  },
  '.MuiTabs-flexContainer': {
    justifyContent: 'space-between'
  },
  button: {
    justifyContent: 'center',
    '&.css-pjf68w-MuiButtonBase-root-MuiTab-root': {
      paddingTop: '15px'
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

const SessionTitle = styled('h2')((props) => ({
  fontWeight: 'bolder',
  minHeight: '90px',
  marginLeft: '24px'
}));

export default function SessionBoard({ session }: SessionBoardProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [modalState, setModal] = useState(false);
  const [surveyComplete, setSurveyComplete] = useState(false);

  console.log(session?.survey_completed);

  const SurveyModal = ({
    state,
    setState,
    onComplete
  }: {
    state: boolean;
    setState: Function;
    onComplete: Function;
  }) => (
    <Modal open={state} onClose={() => setState(false)}>
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
    if (surveyComplete || session?.survey_completed) return false;

    if (session && session.time) {
      const sessionTime = new Date(session.time);
      const currentTime = new Date();
      const surveyReleaseTime = sessionTime;
      surveyReleaseTime.setHours(surveyReleaseTime.getHours() - 1);

      if (currentTime > surveyReleaseTime) {
        return true;
      }
    }
    return false;
  };

  const tabsContent = [
    <Description key="description" innerContent={session?.description || ''} />,
    <Summary key="summary" innerContent={session?.summary || ''} />,
    <Slides key="slidesTab" pdfUrl={session?.presentation_pdf_url} />
  ];

  if (!session) return null;

  return (
    <Wrapper>
      {/* {shouldDisplaySurveyModal() && <SurveyModal />} */}
      <SurveyModal
        state={modalState}
        setState={setModal}
        onComplete={() => {
          setModal(false);
          setSurveyComplete(true);
        }}
      />
      <SessionTitle>{session.name}</SessionTitle>
      <SessionsContainer>
        {session.recording_url && session.recording_url !== '' ? (
          <VideoPreview video_url={session.recording_url} />
        ) : (
          <VideoPlaceHolder sessionTimeValue={session.time} />
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
          <SessionTab label="Resources" />
          <SessionTab label="Summary Notes" />
          <SessionTab label="Session Slides" />
          {/* <SessionTab label="Survey" /> */}
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Wrapper>
  );
}
