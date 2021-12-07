import { Container, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import axios from 'utils/axios';
import { EVENT_TYPES, trackQnAEvents, sendAmplitudeData } from 'utils/amplitude';
import { useSnackbar } from 'notistack5';
import { deleteQuestion, submitAnswer } from 'utils/requests';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Question } from '../../../@types/cohorts';
import { RootState, useSelector } from '../../../redux/store';
import LoadingScreen from '../../LoadingScreen';
import QuestionForm from './QuestionForm';
import QnAFeed from './QnAFeed';
import EmptyFeed from './EmptyFeed';
import About from './About';
import Filters from './Filters';

const StyledPage = styled(Page)(({ theme }) => ({
  marginTop: '-15px',
  height: '100%',
  overflow: 'hidden',
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

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

function QnATab() {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [list, setList] = useState<Question[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  useEffect(() => {
    if (cohort) {
      sendAmplitudeData(EVENT_TYPES.page_view, {
        page_type: EVENT_TYPES.questions_tab,
        [EVENT_TYPES.cohort_name]: cohort?.name,
        [EVENT_TYPES.cohort_intake_number]: cohort?.intake
      });
    }
  }, [cohort]);

  const sendAnalyticsData = (eventCategory: string, eventData: string) => {
    trackQnAEvents(cohort?.name, cohort?.intake, eventCategory, eventData);
  };

  useEffect(() => {
    const initMaterials = async () => {
      try {
        const response = await axios.get(`/questions_feed.json?cohort_id=${cohort_id} `);
        setList(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    initMaterials();
  }, [cohort_id]);

  const onCreateSuccess = (questionObject: Question) => {
    setList([questionObject, ...list]);
  };

  const handleSkipQuestion = (questionID: string) => {
    const initMaterials = async () => {
      try {
        await axios.post(`/questions_feed/${questionID}/skip_question.json`).then((res: any) => {
          setList(list.filter((question) => question.id !== res.data.question_id));
          enqueueSnackbar('Question Skipped Successfully', { variant: 'success' });
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Some Error Occurred', { variant: 'error' });
      }
    };
    initMaterials();
  };

  const addAnswer = (questionID: string, recording: any) => {
    submitAnswer(questionID, recording, list, (list: Question[]) => setList(list));
    enqueueSnackbar('Answer submitted, will be released soon', { variant: 'success' });
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

  if (loading || !cohort) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <StyledPage title="ScholarSite | Q&A">
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <QuestionForm
          hosts={cohort?.host_names}
          isHost={cohort?.is_host}
          onSuccess={onCreateSuccess}
          unAnswered={list.filter((q) => !q.answered && !q.skipped)}
          addAnswer={addAnswer}
          handleSkipQuestion={handleSkipQuestion}
        />
        <Container style={{ marginBottom: '50px' }}>
          <StyledBox>
            {list.length === 0 ? (
              <EmptyFeed hosts={cohort.host_names} />
            ) : (
              <QnAFeed
                addComment={addComment}
                questions={list}
                removeComment={removeComment}
                onDeleteClick={handleDelete}
              />
            )}
          </StyledBox>
        </Container>
      </AnalyticsContext.Provider>
    </StyledPage>
  );
}
export default QnATab;
