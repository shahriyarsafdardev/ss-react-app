import { Box } from '@material-ui/core';
import QuestionRow from './QuestionRow';
import { Question } from '../../../@types/cohorts';

// eslint-disable-next-line arrow-body-style
const QnAFeed = ({ questions }: { questions: Question[] }) => {
  return (
    <Box style={{ width: '65%', maxHeight: '600px', overflowY: 'scroll' }}>
      {questions &&
        questions?.map((question: any) => <QuestionRow key={question.id} question={question} />)}
    </Box>
  );
};

export default QnAFeed;
