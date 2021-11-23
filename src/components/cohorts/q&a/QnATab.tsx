import { Container, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import axios from '../../../utils/axios';
import { Question } from '../../../@types/cohorts';

import AskQuestion from './AskQuestion';
import QnAFeed from './QnAFeed';
import About from './About';
import Filters from './Filters';

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

function QnATab() {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [list, setList] = useState<Question[]>([]);
  useEffect(() => {
    const initMaterials = async () => {
      try {
        const response = await axios.get(`/questions_feed.json?cohort_id=${cohort_id} `);
        setList(response.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    initMaterials();
  }, [cohort_id]);
  return (
    <Page title="ScholarSite | QnA">
      <Container style={{ marginBottom: '50px' }}>
        <AskQuestion />
        <StyledBox>
          <QnAFeed questions={list} />
          <Box
            style={{
              width: '33%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '530px'
            }}
          >
            <About />
            <Filters />
          </Box>
        </StyledBox>
      </Container>
    </Page>
  );
}
export default QnATab;
