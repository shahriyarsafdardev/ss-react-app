import { useState } from 'react';
import { Container, Tabs, Tab } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
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
  justifyContent: 'space-around',
  marginRight: 0,
  width: '20%',
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
      width: '25%',
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

  const tempSurveyData = {
    submitted: true,
    contents: [
      {
        type: 'multiple-choice',
        title: '1. How did you rate the course?',
        options: ['Loved it', 'It was okay'],
        submitted_answer: 'Loved it'
      },
      {
        type: 'text-input',
        title: '1. Describe your favourite part?',
        submitted_answer: 'My favourite part was ...'
      }
    ]
  };

  const tabsContent = [
    <Description key="description" innerContent={session?.description || ''} />,
    <Summary key="summary" innerContent={session?.summary || ''} />,
    <Slides key="slidesTab" pdfUrl={session?.presentation_pdf_url} />,
    <SurveyForm key="surveyForm" sessionId={session?.id} />
  ];

  if (!session) return null;

  return (
    <Wrapper>
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
          <SessionTab label="Survey" />
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Wrapper>
  );
}
