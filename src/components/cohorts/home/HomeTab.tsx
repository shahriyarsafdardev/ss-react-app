import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import Page from 'components/Page';
import CohortTimeLine from './CohortTimeLine';
import NetworkSuggestion from './NetworkSuggestion';
import SessionPrereading from './SessionPrereading';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginTop: 0,
    '> div': {
      marginTop: '20px'
    }
  }
}));

const dummyList = [
  {
    name: 'Read Prereading 1: An introduction to the chicken and egg problem with details',
    action_text: 'Open Prereading',
    info_text: '3 min read',
    type: 'video',
    complete: true
  },
  {
    name: 'Prereading 2: Facebook - good or evil?',
    action_text: 'watch video',
    info_text: '4 min watch',
    type: 'video',
    complete: false
  },
  {
    name: 'Say hello to your section!',
    action_text: 'Open Messaging',
    info_text: 'Waiting for you!',
    type: 'video',
    complete: true
  },
  {
    name: 'Say hello to your section!',
    action_text: 'Open Messaging',
    info_text: 'Waiting for you!',
    type: 'video',
    complete: true
  }
];

const Index = () => (
  <Page title="ScholarSite | Homepage">
    <Container style={{ marginBottom: '50px' }}>
      <CohortTimeLine />
      <StyledBox>
        <SessionPrereading />
        <NetworkSuggestion />
      </StyledBox>
    </Container>
  </Page>
);
export default Index;
