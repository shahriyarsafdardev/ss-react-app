import { useState } from 'react';
import { Container, Grid, Skeleton, Tabs, Tab, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Description from '../../../../components/cohorts/sessions/Description';
import { Session } from '../../../../@types/cohorts';

// Video player
import VideoPreview from './VideoPreview';
// ----------------------------------------------------------------------

type SessionBoardProps = {
  session: Session | undefined;
};

const SessionTab = styled(Tab)((props) => ({
  color: '#595853',
  justifyContent: 'space-between',
  width: '20%',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

const SessionTabs = styled(Tabs)((props) => ({
  width: '100%',
  backgroundColor: '#F4F6F8',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  justifyContent: 'center',
  '.MuiTabs-flexContainer': {
    justifyContent: 'center'
  },
  button: {
    '&.css-pjf68w-MuiButtonBase-root-MuiTab-root': {
      padding: '15px'
    },
    color: '#6C7885',
    '&.Mui-selected': {
      color: '#212B36'
    }
  }
}));

const SessionsContainer = styled(Container)((props) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

export default function SessionBoard({ session }: SessionBoardProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const tabsContent = [
    <Description key="hello" innerContent="Description" />,
    <Description key="hello" innerContent="Summary Notes" />,
    <Description key="hello" innerContent="Slides" />,
    <Description key="hello" innerContent="Survey" />
  ];

  if (!session) return null;

  return (
    <Container>
      <HeaderBreadcrumbs heading={session.name} links={[]} />
      <SessionsContainer>
        <VideoPreview />
        <SessionTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
          <SessionTab label="Description" />
          <SessionTab label="Summary Notes" />
          <SessionTab label="Slides" />
          <SessionTab label="Survey" />
        </SessionTabs>

        {tabsContent[currentTab]}
      </SessionsContainer>
    </Container>
  );
}
