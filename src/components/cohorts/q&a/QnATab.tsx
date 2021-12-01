import { Container, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { deleteQuestion } from 'utils/requests';
import { Question } from '../../../@types/cohorts';

import QuestionForm from './QuestionForm';
import QnAFeed from './QnAFeed';
import About from './About';
import Filters from './Filters';

const StyledPage = styled(Page)(({ theme }) => ({
  marginTop: '-15px',
  [theme.breakpoints.up('lg')]: {
    marginTop: '-25px'
  }
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
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

  const onCreateSuccess = (questionObject: Question) => {
    setList([questionObject, ...list]);
  };

  const addComment = (questionID: string, comment: any) => {
    const index = list.findIndex((question) => question.id === questionID);
    const updated: Question = list[index];
    const updatedList: Question[] = [...list];
    updatedList[index] = {
      ...updated,
      comments: [...updated.comments, comment]
    };
    setList(updatedList);
  };

  const removeComment = (questionID: string, comment_id: string) => {
    const index = list.findIndex((question) => question.id === questionID);
    const updated: Question = list[index];
    const updatedList: Question[] = [...list];
    updatedList[index] = {
      ...updated,
      comments: updated.comments.filter((comment) => comment.id !== comment_id)
    };
    setList(updatedList);
  };

  const handleDelete = async (questionID: string) => {
    await deleteQuestion(
      questionID,
      () => {
        setList(list.filter((question) => question.id !== questionID));
        enqueueSnackbar('Question Deleted Successfully', { variant: 'success' });
      },
      () => {
        enqueueSnackbar('Some error occurred, please try again', { variant: 'error' });
      }
    );
  };

  return (
    <StyledPage title="ScholarSite | Q&A">
      <QuestionForm onSuccess={onCreateSuccess} />
      <Container style={{ marginBottom: '50px' }}>
        <StyledBox>
          <QnAFeed
            addComment={addComment}
            questions={list}
            removeComment={removeComment}
            onDeleteClick={handleDelete}
          />
        </StyledBox>
      </Container>
    </StyledPage>
  );
}
export default QnATab;
