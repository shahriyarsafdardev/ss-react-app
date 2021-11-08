import { Container, Typography, Box } from '@material-ui/core';
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

const Index = () => {
  const a = 12; // will be removed, placed just to hide arrow function error of es lint
  return (
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
};

export default Index;
