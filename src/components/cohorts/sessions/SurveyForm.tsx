import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { Container, Box, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingButton } from '@material-ui/lab';

import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { Session } from '../../../@types/cohorts';

import useAuth from '../../../hooks/useAuth';

// axios
import axios from '../../../utils/axios';
import SurveyRow from './SurveyRow';

export const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '20px 10px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 25px'
  }
}));

export const QuestionContainer = styled(Container)(({ theme }) => ({
  minHeight: '72vh',
  position: 'relative'
}));

export const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 30
}));

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

export const CurrentStep = styled(Typography)(() => ({
  fontSize: 12,
  color: '#6C7885',
  textAlign: 'right'
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  flex: 1,
  marginLeft: '30px !important',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    marginLeft: '0 !important'
  },
  [theme.breakpoints.up('md')]: {
    width: '100%'
  }
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  bottom: '0',
  right: '0',

  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px'
  }
}));

export const SessionTitle = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  minHeight: '50px',
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

export const SessionNumber = styled('span')(({ theme }) => ({
  fontWeight: 400,
  minHeight: '50px',
  marginRight: 1,
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
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
  const [surveyData, setSurveyData] = useState<any>([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = surveyData.length;
  const [questionID, setQuestionID] = useState('');
  const [offboardingAnswerFound, setOffboardingAnswerFound] = useState(false);

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

  useEffect(() => {
    if (surveyData.length > 0) {
      const offboardingQuestionID = surveyData.filter(
        (q: any) => q?.question_type === 'offboarding-outcome-matrix'
      )?.[0]?.id;
      if (offboardingQuestionID) {
        setLoading(true);
        axios
          .get(`/cohort_sessions/${sessionId}/onboarding_question_answers.json`, {
            params: {
              current_user_id: user?.id
            }
          })
          .then((res) => {
            const newResponses = { ...response };
            newResponses[offboardingQuestionID] = res?.data?.answer;
            setResponse(newResponses);
            setLoading(false);
            if (res?.data?.answer) setOffboardingAnswerFound(true);
          })
          .catch((err) => setLoading(false));
      }
    }
  }, [surveyData]);

  const setQuestionResponse = (value: string, question_id: string) => {
    const newResponses = { ...response };
    newResponses[question_id] = value;
    setResponse(newResponses);
  };

  const submitResponse = () => {
    setLoading(true);

    axios
      .post(`/cohort_sessions/${sessionId}/submit_survey_responses.json`, {
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
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const progress = () => {
    if (totalQuestions > 0) {
      return ((currentQuestion + 1) / totalQuestions) * 100;
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

  const shouldDisableSubmitButton = () => {
    const question = surveyData[currentQuestion];
    const res = response[surveyData[currentQuestion]?.id];
    let isDisabled = question?.mandatory && [undefined, ''].includes(res);
    if (question?.question_type === 'offboarding-outcome-matrix' && res !== undefined) {
      isDisabled =
        isDisabled ||
        JSON.parse(res)?.flat()?.filter(Boolean)?.length !==
          question?.options?.outcomes?.length * 2;
    }
    if (question?.question_type === 'matrix' && res !== undefined) {
      isDisabled =
        isDisabled || JSON.parse(res)?.filter(Boolean)?.length !== question?.options?.length;
    }
    return isDisabled;
  };

  return (
    <StyledContainer>
      {surveyData && !loading && Object.keys(surveyData).length >= 0 ? (
        <QuestionContainer key={questionID}>
          <Box paddingBottom={{ xs: '100px', md: '50px' }}>
            <Box width="100%" marginBottom={2}>
              <SessionNumber>{`Session ${session?.number} |`} </SessionNumber>
              <SessionTitle>Feedback Survey</SessionTitle>
            </Box>
            <ProgressBarContainer>
              <BorderLinearProgress variant="determinate" value={progress()} />
              <CurrentStep>
                {currentQuestion + 1}/{totalQuestions}
              </CurrentStep>
            </ProgressBarContainer>
            {surveyData[currentQuestion] && (
              <SurveyRow
                item={surveyData[currentQuestion]}
                submitted_answer={response[surveyData[currentQuestion]?.id]}
                onChange={(answer: string) => {
                  setQuestionResponse(answer, questionID);
                }}
                offboardingAnswerFound={offboardingAnswerFound}
              />
            )}
          </Box>

          <ButtonsContainer>
            <StyledButton
              variant="outlined"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              data-testid="btn-previous"
            >
              Previous Question
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={handleNext}
              disabled={shouldDisableSubmitButton()}
              data-testid="btn-next"
            >
              {currentQuestion + 1 === totalQuestions ? 'Submit' : 'Next Question'}
            </StyledButton>
          </ButtonsContainer>
        </QuestionContainer>
      ) : (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      )}
    </StyledContainer>
  );
}
