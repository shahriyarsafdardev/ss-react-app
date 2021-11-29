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
const QnAFeed = ({
  questions,
  addComment,
  removeComment
}: {
  questions: Question[];
  addComment: Function;
  removeComment: Function;
}) => (
  <StyledFeedContainer>
    {questions &&
      questions?.map((question: any) => (
        <QuestionRow
          addComment={(comment: any) => addComment(question.id, comment)}
          removeComment={(comment_id: string) => removeComment(question.id, comment_id)}
          key={question.id}
          question={question}
        />
      ))}
  </StyledFeedContainer>
);
export default QnAFeed;
