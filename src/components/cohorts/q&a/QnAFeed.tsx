import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import QuestionRow from './QuestionRow';
import { Question } from '../../../@types/cohorts';

const StyledFeedContainer = styled(Box)(({ theme }) => ({
  width: '65%',
  maxHeight: '600px',
  overflowY: 'scroll',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
// eslint-disable-next-line arrow-body-style
const QnAFeed = ({ questions, addComment }: { questions: Question[]; addComment: Function }) => {
  return (
    <StyledFeedContainer>
      {questions &&
        questions?.map((question: any) => (
          <QuestionRow
            addComment={(comment: any) => addComment(question.id, comment)}
            key={question.id}
            question={question}
          />
        ))}
    </StyledFeedContainer>
  );
};

export default QnAFeed;
