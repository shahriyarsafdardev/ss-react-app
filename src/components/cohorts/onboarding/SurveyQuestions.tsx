import { Box, styled, Stack } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { memo, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { updateOnboardingData } from 'redux/slices/cohort';
import { trackEvent } from 'utils/eventTracking';
import { RootState, useSelector } from 'redux/store';
import useAuth from '../../../hooks/useAuth';
// axios
import axios from '../../../utils/axios';
import {
  BorderLinearProgress,
  CurrentStep,
  ProgressBarContainer,
  SessionTitle,
  StyledContainer
} from '../sessions/SurveyForm';
import SurveyRow from '../sessions/SurveyRow';

const NavigationButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  borderRadius: '50px',
  width: '200px',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    width: '100%'
  }
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px'
  }
}));

function SurveyQuestions({ setInvitePeersModalState }: { setInvitePeersModalState: Function }) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [surveyData, setSurveyData] = useState<any>([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = surveyData.length;
  const [questionID, setQuestionID] = useState('');
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/cohorts/${cohort_id}/onboarding/get_onboarding_questionnaire.json`).then((res) => {
      setSurveyData(res.data);
      setLoading(false);
    });
  }, [cohort_id]);

  useEffect(() => {
    trackEvent(cohort, 'Cohort Onboarding - Questionnaire - Page Loaded');
  }, []);

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
      .post(`/cohorts/${cohort_id}/onboarding/submit_onboarding_questionnaire.json`, {
        response,
        current_user_id: user?.id,
        cohort_id
      })
      .then((res) => {
        setLoading(false);
        dispatch(updateOnboardingData(cohort_id, res.data));
        setInvitePeersModalState(true);
        trackEvent(cohort, 'Cohort Onboarding - Questionnaire - Questionnaire Submitted');
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        setCurrentQuestion(0);
      });
  };

  const handleNext = () => {
    trackEvent(cohort, 'Cohort Onboarding - Questionnaire - "Next Question" Selected');
    if (currentQuestion + 1 === totalQuestions) {
      submitResponse();
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    trackEvent(cohort, 'Cohort Onboarding - Questionnaire - "Previous Question" Selected');
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <Stack width={{ xs: '100%', md: '80%' }}>
      {surveyData && !loading && Object.keys(surveyData).length > 0 ? (
        <StyledContainer>
          <Box key={questionID}>
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
                submitted_answer={response[surveyData[currentQuestion]?.id]}
                onChange={(answer: string) => {
                  setQuestionResponse(answer, questionID);
                }}
              />
            )}

            <ButtonsContainer>
              <NavigationButton
                variant="outlined"
                disabled={currentQuestion === 0}
                sx={{ mr: { xs: 0, md: 2 } }}
                onClick={handlePrevious}
                data-testid="btn-previous"
              >
                Previous Question
              </NavigationButton>
              <NavigationButton
                variant="contained"
                onClick={handleNext}
                sx={{ ml: { xs: 0, md: 2 } }}
                disabled={
                  surveyData[currentQuestion].mandatory === true &&
                  response[questionID] === undefined
                }
                data-testid="btn-next"
              >
                {currentQuestion + 1 === totalQuestions ? 'Submit' : 'Next Question'}
              </NavigationButton>
            </ButtonsContainer>
          </Box>
        </StyledContainer>
      ) : (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      )}
    </Stack>
  );
}

export default memo(SurveyQuestions);
