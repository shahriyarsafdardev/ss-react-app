import { useState } from 'react';
import { Container, Tabs, Tab } from '@material-ui/core';
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
  marginBottom: '20px',
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

  const SurveyModal = () => {
    const [modalState, setModalState] = useState(true);

    return (
      <Modal open={modalState}>
        <SurveyForm
          key="surveyForm"
          onComplete={() => setModalState(false)}
          sessionId={session?.id}
        />
      </Modal>
    );
  };

  const shouldDisplaySurveyModal = () => {
    if (session?.survey_completed === true) return false;

    if (session && session.time) {
      const sessionTime = new Date(session.time);
      const currentTime = new Date();

      if (sessionTime < currentTime) {
        return true;
      }
      return false;
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
      {shouldDisplaySurveyModal() && <SurveyModal />}
      <SessionTitle>{session.name}</SessionTitle>
      <SessionsContainer>
        {session.recording_url && session.recording_url !== '' ? (
          <VideoPreview video_url={session.recording_url} />
        ) : (
          <VideoPlaceHolder sessionTimeValue={session.time} />
        )}

        <SessionTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
          <SessionTab label="Description" />
          <SessionTab label="Summary Notes" />
          <SessionTab label="Slides" />
          {/* <SessionTab label="Survey" /> */}
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Wrapper>
  );
}
