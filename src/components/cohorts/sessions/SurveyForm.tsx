import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { Container, Button, Box, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingButton } from '@material-ui/lab';

import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { Session } from '../../../@types/cohorts';

import useAuth from '../../../hooks/useAuth';

// axios
import axios from '../../../utils/axios';
import SurveyRow from './SurveyRow';

const SubmitButton = styled(Button)(() => ({
  padding: '10px 90px'
}));

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '20px 10px'
}));

const QuestionContainer = styled(Container)(({ theme }) => ({
  minHeight: '60vh',
  position: 'relative'
}));

const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 30
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

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  flex: 1,
  '&:hover': {
    backgroundColor: '#4D4DCD',
    opacity: 0.8
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function SurveyForm({
  sessionId,
  onComplete,
  sessionName,
  session
}: {
  sessionId: string | undefined;
  onComplete: Function;
  sessionName: string | undefined;
  session: Session | undefined;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [surveyData, setSurveyData] = useState([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = surveyData.length;
  const [questionID, setQuestionID] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`/cohort_sessions/${sessionId}/survey_questions.json`).then((res) => {
      setSurveyData(res.data);
      setLoading(false);
    });
  }, [sessionId]);

  useEffect(() => {
    if (surveyData.length > 0) {
      const question: any = surveyData[currentQuestion];
      setQuestionID(question.id);
    }
  }, [setCurrentQuestion, currentQuestion, surveyData]);

  useEffect(() => {}, [response]);

  const setQuestionResponse = (value: string, question_id: string) => {
    response[question_id] = value;
    setResponse(response);
  };

  const submitResponse = () => {
    setLoading(true);

    axios
      .post(`/cohort_sessions/submit_survey_responses.json`, {
        response,
        current_user_id: user?.id
      })
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        onComplete();
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        onComplete();
      });
  };

  const progress = () => {
    if (totalQuestions > 0) {
      return (currentQuestion / totalQuestions) * 100;
    }
    return 0;
  };

  const handleNext = () => {
    if (currentQuestion + 1 === totalQuestions) {
      submitResponse();
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <StyledContainer>
      {surveyData && !loading && Object.keys(surveyData).length >= 0 ? (
        <QuestionContainer key={questionID}>
          <Typography variant="h6">
            <strong>We would love to hear your feedback!</strong>
          </Typography>
          <Typography variant="body2">
            Session #{session?.number} - {sessionName}
          </Typography>
          <ProgressBarContainer>
            <BorderLinearProgress variant="determinate" value={progress()} />
            <CurrentStep>
              {currentQuestion + 1}/{totalQuestions}
            </CurrentStep>
          </ProgressBarContainer>
          {surveyData[currentQuestion] && (
            <SurveyRow
              item={surveyData[currentQuestion]}
              submitted_answer={response[questionID]}
              onChange={(answer: string) => setQuestionResponse(answer, questionID)}
            />
          )}

          <Box
            position="absolute"
            display="flex"
            justifyContent="center"
            width="100%"
            bottom="0"
            paddingRight="50px"
          >
            <StyledButton
              variant="contained"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous Step
            </StyledButton>
            <StyledButton variant="contained" style={{ marginLeft: '30px' }} onClick={handleNext}>
              {currentQuestion + 1 === totalQuestions ? 'Submit' : 'Next Step'}
            </StyledButton>
          </Box>
        </QuestionContainer>
      ) : (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      )}
    </StyledContainer>
  );
}
