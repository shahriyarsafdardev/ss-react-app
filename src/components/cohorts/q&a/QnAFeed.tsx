import { useContext } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import QuestionRow from './QuestionRow';
import { Question } from '../../../@types/cohorts';
import useAuth from '../../../hooks/useAuth';

const StyledFeedContainer = styled(Box)(({ theme }) => ({
  width: '60%',
  overflowY: 'hidden',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const QnAFeed = ({
  questions,
  addComment,
  onDeleteClick,
  removeComment
}: {
  questions: Question[];
  addComment: Function;
  onDeleteClick: Function;
  removeComment: Function;
}) => {
  const { user } = useAuth();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  return (
    <StyledFeedContainer>
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
    </StyledFeedContainer>
  );
};

export default QnAFeed;
