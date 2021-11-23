import { Box } from '@material-ui/core';
import QuestionRow from './QuestionRow';
import { Question } from '../../../@types/cohorts';

const QnAFeed = ({ questions }: { questions: Question[] }) => {
  const arr = 0;
  return (
    <Box style={{ width: '65%', minHeight: '500px' }}>
      {questions &&
        questions?.map((question: any) => <QuestionRow key={question.id} question={question} />)}
    </Box>
  );
};

export default QnAFeed;
