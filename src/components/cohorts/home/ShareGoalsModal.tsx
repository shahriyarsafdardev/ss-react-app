import { Box } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack5';
import { Modal } from 'components/animate';
import { dispatch } from 'redux/store';
import { updateFeedbackStatus } from 'redux/slices/cohort';
import useAuth from '../../../hooks/useAuth';
// axios
import axios from '../../../utils/axios';

import {
  BorderLinearProgress,
  ButtonsContainer,
  CurrentStep,
  ProgressBarContainer,
  QuestionContainer,
  SessionTitle,
  StyledButton,
  StyledContainer
} from '../sessions/SurveyForm';
import SurveyRow from '../sessions/SurveyRow';
import { OnboardingStepsContainer } from '../onboarding/OnboardingModal';

export default function ShareGoalsModal({
  shareGoalsModalState,
  setShareGoalsModalState,
  cohort_id,
  onFinish
}: {
  shareGoalsModalState: boolean;
  setShareGoalsModalState: Function;
  cohort_id: string;
  onFinish: Function;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [surveyData, setSurveyData] = useState<any>([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = surveyData.length;
  const [questionID, setQuestionID] = useState('');

  useEffect(() => {
    axios.get(`/cohorts/${cohort_id}/survey_questions.json`).then((res) => {
      setSurveyData(res.data);
      setLoading(false);
    });
  }, [cohort_id]);

  useEffect(() => {
    if (surveyData.length > 0) {
      const question: any = surveyData[currentQuestion];
      setQuestionID(question.id);
    }
  }, [setCurrentQuestion, currentQuestion, surveyData]);

  const progress = () => {
    if (totalQuestions > 0) {
      return ((currentQuestion + 1) / totalQuestions) * 100;
    }
    return 0;
  };

  const setQuestionResponse = (value: string, question_id: string) => {
    const newResponses = { ...response };
    newResponses[question_id] = value;
    setResponse(newResponses);
  };

  const submitResponse = () => {
    setLoading(true);

    axios
      .post(`/cohorts/${cohort_id}/submit_survey_responses.json`, {
        response,
        current_user_id: user?.id
      })
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        setShareGoalsModalState(false);
        dispatch(updateFeedbackStatus(cohort_id));
        onFinish();
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        setCurrentQuestion(0);
      });
  };

  const handleNext = () => {
    if (currentQuestion + 1 === totalQuestions) {
      submitResponse();
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Modal
      open={shareGoalsModalState}
      onClose={() => {
        setShareGoalsModalState(false);
      }}
      id="share-goals-modal"
    >
      <OnboardingStepsContainer>
        <StyledContainer>
          {surveyData && !loading && Object.keys(surveyData).length >= 0 ? (
            <QuestionContainer key={questionID}>
              <br />
              <Box width="100%" marginBottom={2}>
                <SessionTitle>We would love to know more about you</SessionTitle>
              </Box>
              <br />
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
                    response[questionID] === undefined
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
      </OnboardingStepsContainer>
    </Modal>
  );
}
