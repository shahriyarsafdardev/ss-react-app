import { useContext, memo } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import QuestionRow from './QuestionRow';
import { Question } from '../../../@types/cohorts';
import useAuth from '../../../hooks/useAuth';
import { CircularLoader } from './Common';

const StyledFeedContainer = styled(Box)(({ theme }) => ({
  width: '60%',
  overflowY: 'hidden',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const QnAFeed = ({
  questions,
  loadMore,
  totalQuestions,
  addComment,
  onDeleteClick,
  removeComment
}: {
  questions: Question[];
  addComment: Function;
  loadMore: any;
  totalQuestions: number;
  onDeleteClick: Function;
  removeComment: Function;
}) => {
  const { user } = useAuth();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  return (
    <StyledFeedContainer>
      <InfiniteScroll
        next={loadMore}
        hasMore={totalQuestions > questions.length}
        dataLength={questions.length}
        loader={<CircularLoader />}
        style={{ overflow: 'unset' }}
      >
        {questions &&
          questions?.map((question: any) => (
            <QuestionRow
              addComment={(comment: any) => addComment(question.id, comment)}
              key={question.id}
              canDelete={user?.type === 'admin' || question.asker_id === user?.id}
              question={question}
              onDeleteClick={onDeleteClick}
              removeComment={(comment_id: string) => removeComment(question.id, comment_id)}
              onTrack={(action: string) => sendAnalyticsData('Questions Feed', action)}
            />
          ))}
      </InfiniteScroll>
    </StyledFeedContainer>
  );
};

export default memo(QnAFeed);
