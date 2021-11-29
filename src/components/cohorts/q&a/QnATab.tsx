import { Container, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import axios from '../../../utils/axios';
import { Question } from '../../../@types/cohorts';

import QuestionForm from './QuestionForm';
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

const StyledFiltersContainer = styled(Box)(({ theme }) => ({
  width: '33%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '530px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

function QnATab() {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [submitting, setSubmitting] = useState(false);
  const [list, setList] = useState<Question[]>([]);
  const { enqueueSnackbar } = useSnackbar();

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

  const onFormSubmitHandler = async (
    question: string,
    videoData: File | null,
    questionType: string
  ) => {
    if (question) {
      setSubmitting(true);
      const questionData = new FormData();

      questionData.append('question_summary', question);
      questionData.append('question_type', questionType);
      videoData && questionData.append('question_video', videoData);

      questionData.append('cohort_id', cohort_id);
      await axios.post(`/questions_feed.json`, questionData).then((res) => {
        if (res.data.question) {
          enqueueSnackbar('New question added', { variant: 'success' });
          setSubmitting(false);
          setList([res.data.question, ...list]);
        } else {
          enqueueSnackbar('Failed to submit question', { variant: 'error' });
        }
      });
    }
  };

  const addComment = (questionID: string, comment: any) => {
    console.log('QnATab');
    const index = list.findIndex((question) => question.id === questionID);
    const updated: Question = list[index];
    const updatedList: Question[] = [...list];
    updatedList[index] = {
      ...updated,
      comments: [...updated.comments, comment]
    };
    setList(updatedList);
  };

  return (
    <Page title="ScholarSite | Q&A">
      <QuestionForm submitting={submitting} onSubmit={onFormSubmitHandler} />
      <Container style={{ marginBottom: '50px' }}>
        <StyledBox>
          <QnAFeed addComment={addComment} questions={list} />
          <StyledFiltersContainer>
            <About />
            <Filters />
          </StyledFiltersContainer>
        </StyledBox>
      </Container>
    </Page>
  );
}
export default QnATab;
