import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { Container, Box, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingButton } from '@material-ui/lab';

import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { Modal } from 'components/animate';
import { useDispatch } from 'redux/store';
import { updateOnboardingData } from 'redux/slices/cohort';

import useAuth from '../../../hooks/useAuth';

// axios
import axios from '../../../utils/axios';
import SurveyRow from '../sessions/SurveyRow';

export const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '40px 10px'
}));

export const QuestionContainer = styled(Container)(({ theme }) => ({
  minHeight: '60vh',
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

export default function CohortSurveyModal({
  surveyModalState,
  setSurveyModalState,
  cohort
}: {
  surveyModalState: boolean;
  setSurveyModalState: Function;
  cohort: any;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [surveyData, setSurveyData] = useState<any>([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = surveyData.length;
  const [questionID, setQuestionID] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/cohorts/${cohort?.id}/unanswered_onboarding_questions.json`)
      .then((res) => {
        setSurveyData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
      });
  }, [cohort?.id]);

  useEffect(() => {
    if (surveyData.length > 0) {
      const question: any = surveyData[currentQuestion];
      setQuestionID(question.id);
    }
  }, [setCurrentQuestion, currentQuestion, surveyData]);

  const setQuestionResponse = (value: string, question_id: string) => {
    const newResponses = { ...response };
    newResponses[question_id] = value;
    setResponse(newResponses);
  };

  const submitResponse = () => {
    setLoading(true);
    axios
      .post(`/cohorts/${cohort?.id}/submit_survey_responses.json`, {
        response,
        current_user_id: user?.id
      })
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        setSurveyModalState(false);
        dispatch(
          updateOnboardingData(cohort?.id, {
            ...cohort?.onboarding_data,
            onboarding_is_any_question_unanswered: false
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        setSurveyModalState(false);
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
    const isDisabled = question?.mandatory && [undefined, ''].includes(res);
    if (question?.question_type === 'session-outcome-matrix' && res !== undefined) {
      return isDisabled && JSON.parse(res).flat() !== question?.options?.outcomes?.length * 2;
    }
    return isDisabled;
  };

  return (
    <Modal open={surveyModalState} onClose={() => setSurveyModalState(false)}>
      <StyledContainer>
        {surveyData && !loading && Object.keys(surveyData).length >= 0 ? (
          <QuestionContainer key={`${currentQuestion} ${questionID}`}>
            <Box width="100%" marginBottom={2}>
              <SessionTitle>Just a few more questions</SessionTitle>
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
              />
            )}

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
                disabled={
                  surveyData[currentQuestion]?.mandatory === true &&
                  [undefined, ''].includes(response[questionID])
                }
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
    </Modal>
  );
}
