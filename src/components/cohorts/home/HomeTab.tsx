import { Container, Box, Typography } from '@material-ui/core';
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

const Index = () => (
  <Page title="ScholarSite | Homepage">
    <Container style={{ marginBottom: '50px' }}>
      <Typography variant="h3" style={{ marginBottom: '20px' }}>
        👋 Hi, welcome to the EODP S21 Cohort!
      </Typography>
      <CohortTimeLine />
      <StyledBox>
        <SessionPrereading />
        <NetworkSuggestion />
      </StyledBox>
    </Container>
  </Page>
);
export default Index;
