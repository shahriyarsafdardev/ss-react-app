import { Typography, Box, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@material-ui/lab';
import SurveyRow from '../sessions/SurveyRow';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '60vh',
  position: 'relative'
}));

const QuestionRow = styled(SurveyRow)(() => ({
  div: {
    borderTop: 'none !important'
  }
}));

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  width: 250,
  '&:hover': {
    backgroundColor: '#4D4DCD',
    opacity: 0.8
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function SurveyQuestionForm({
  last_recorded_question,
  questionsData,
  onStepChange
}: {
  last_recorded_question?: number | undefined;
  questionsData: any;
  onStepChange: Function;
}) {
  const [questions, setQuestions] = useState(questionsData);
  const totalQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState<number>(last_recorded_question || 0);
  const [currentAnswer, setAnswer] = useState<string>(
    questions[currentQuestion].submitted_answer || ''
  );

  useEffect(() => {
    setAnswer(questions[currentQuestion].submitted_answer);
  }, [currentQuestion, questions]);

  useEffect(() => {
    questions[currentQuestion].submitted_answer = currentAnswer;
  }, [currentAnswer, currentQuestion, questions]);

  const updateQuestionData = () => {
    questions[currentQuestion].submitted_answer = currentAnswer;
    setQuestions(questions);
    setAnswer('');
  };

  const handlePrevious = () => {
    // here we'll send answer for this question to the backend
    updateQuestionData();
    setCurrentQuestion(currentQuestion - 1);
    onStepChange(-1);
  };

  const handleNext = () => {
    updateQuestionData();
    onStepChange(1);

    if (currentQuestion + 1 >= totalQuestions) {
      return;
    }
    // here we'll send answer for this question to the backend

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <StyledContainer>
      {questions[currentQuestion] && (
        <QuestionRow
          item={questions[currentQuestion]}
          submitted_answer={currentAnswer}
          onChange={setAnswer}
        />
      )}

      <Box position="absolute" display="flex" justifyContent="center" width="100%" bottom="0">
        <StyledButton variant="contained" disabled={currentQuestion === 0} onClick={handlePrevious}>
          Previous Step
        </StyledButton>
        <StyledButton
          variant="contained"
          disabled={!currentAnswer || currentAnswer === '' || currentQuestion === totalQuestions}
          style={{ marginLeft: '30px' }}
          onClick={handleNext}
        >
          Next Step
        </StyledButton>
      </Box>
    </StyledContainer>
  );
}
