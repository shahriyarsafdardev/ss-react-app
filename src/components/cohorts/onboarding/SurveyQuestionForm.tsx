import { Typography, Box, Container } from '@material-ui/core';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@material-ui/lab';
import SurveyRow from '../sessions/SurveyRow';

const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 30
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '60vh',
  position: 'relative'
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

const CurrentStep = styled(Typography)(() => ({
  fontSize: 12,
  color: '#6C7885',
  textAlign: 'right'
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
  onComplete
}: {
  last_recorded_question?: number | undefined;
  questionsData: any;
  onComplete: Function;
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

  const progress = () => {
    if (totalQuestions > 0) {
      return (currentQuestion / totalQuestions) * 100;
    }
    return 0;
  };

  const handlePrevious = () => {
    // here we'll send answer for this question to the backend
    updateQuestionData();
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    updateQuestionData();
    if (currentQuestion + 1 >= totalQuestions) {
      onComplete();
      return;
    }
    // here we'll send answer for this question to the backend

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <StyledContainer>
      <Typography variant="subtitle1">
        Intake Questionaire: First we just have to ask a few questions
      </Typography>
      <ProgressBarContainer>
        <BorderLinearProgress variant="determinate" value={progress()} />
        <CurrentStep>
          {currentQuestion + 1}/{totalQuestions}
        </CurrentStep>
      </ProgressBarContainer>
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
