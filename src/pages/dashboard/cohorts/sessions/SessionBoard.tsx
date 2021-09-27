import { useState } from 'react';
import { Container, Tabs, Tab } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Description, Summary, SurveyForm } from '../../../../components/cohorts/sessions';
import { Session } from '../../../../@types/cohorts';

// Video player
import VideoPreview from '../../../../components/cohorts/VideoPreview';
// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
};

const SessionTab = styled(Tab)(({ theme }) => ({
  color: '#595853',
  justifyContent: 'space-between',
  width: '20%',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

const SessionTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
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

  const tabsContent = [
    <Description key="description" innerContent={session?.description || ''} />,
    <Summary key="summary" innerContent={session?.summary || ''} />,
    <div key="slidesTab" />,
    <SurveyForm key="surveyForm" surveyData={session?.survey} />
  ];

  if (!session) return null;

  return (
    <Wrapper>
      {/* <HeaderBreadcrumbs heading={session.name} links={[]} /> */}
      <SessionTitle>{session.name}</SessionTitle>
      <SessionsContainer>
        <VideoPreview video_url="https://media.w3.org/2010/05/bunny/movie.mp4" />
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
