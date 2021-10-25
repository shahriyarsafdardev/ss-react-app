import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { Container, Button, Box, Typography } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingButton } from '@material-ui/lab';

import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { Session, SurveyContent } from '../../../@types/cohorts';

import useAuth from '../../../hooks/useAuth';

// axios
import axios from '../../../utils/axios';
import SurveyRow from './SurveyRow';

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '20px 10px'
}));

const QuestionContainer = styled(Container)(({ theme }) => ({
  minHeight: '72vh',
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
  '&.right-btn': {
    marginLeft: '30px !important',
    [theme.breakpoints.down('md')]: {
      marginTop: '10px',
      marginLeft: '0 !important'
    },
    '&:hover': {
      opacity: 0.8
    }
  },
  '&.left-btn': {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  [theme.breakpoints.up('md')]: {
    width: '100%'
  }
}));

const CloseButton = styled(Button)(({ theme }) => ({
  padding: 11,
  fontcolor: 'white',
  display: 'flex',
  width: '200px',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
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

const SessionTitle = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  minHeight: '50px',
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

const Title = styled('p')(({ theme }) => ({
  fontWeight: 'bolder',
  minHeight: '50px',
  fontSize: '1.2rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  }
}));

const Content = styled('p')(({ theme }) => ({
  fontWeight: 'normal',
  paddingTop: '15px',
  fontSize: '1rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  }
}));

const LinksContent = styled('p')(({ theme }) => ({
  fontWeight: 'normal',
  marginTop: '15px',
  fontSize: '1rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  }
}));

const SessionNumber = styled('span')(({ theme }) => ({
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
  session,
  isLastSession
}: {
  sessionId: string | undefined;
  onComplete: Function;
  sessionName: string | undefined;
  session: Session | undefined;
  isLastSession: boolean;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [surveyData, setSurveyData] = useState<SurveyContent[]>([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = surveyData.length;
  const [questionID, setQuestionID] = useState('');
  const [showLastPage, setLastPage] = useState<boolean>(false);

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

  const setQuestionResponse = (value: string, question_id: string) => {
    const newResponses = { ...response };
    newResponses[question_id] = value;
    setResponse(newResponses);
  };

  const onSuccessfullResponse = (message: string) => {
    setLoading(false);
    enqueueSnackbar(message, { variant: 'success' });
    onComplete();
  };

  const submitResponse = () => {
    if (!isLastSession) {
      setLoading(true);
    }

    axios
      .post(`/cohort_sessions/submit_survey_responses.json`, {
        response,
        current_user_id: user?.id
      })
      .then((res) => {
        if (isLastSession) {
          setLastPage(true);
        } else {
          onSuccessfullResponse(res.data.message);
        }
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
        <div>
          {!showLastPage ? (
            <QuestionContainer key={questionID}>
              <br />
              <Box width="100%" marginBottom={2}>
                <SessionNumber>{`Session ${session?.number} |`} </SessionNumber>
                <SessionTitle>Feedback Survey</SessionTitle>
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
                  className="left-btn"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous Question
                </StyledButton>
                <StyledButton
                  variant="contained"
                  className="right-btn"
                  onClick={handleNext}
                  disabled={
                    surveyData[currentQuestion].mandatory === true &&
                    response[questionID] === undefined
                  }
                >
                  {currentQuestion + 1 === totalQuestions ? 'Submit' : 'Next Question'}
                </StyledButton>
              </ButtonsContainer>
            </QuestionContainer>
          ) : (
            <Box>
              <QuestionContainer>
                <br />
                <Box width="100%" marginBottom={2}>
                  <SessionNumber>{`Session ${session?.number} |`} </SessionNumber>
                  <SessionTitle>Feedback Survey</SessionTitle>
                </Box>
                <br />
                <ProgressBarContainer>
                  <BorderLinearProgress variant="determinate" value={100} />
                  <CurrentStep>
                    {totalQuestions}/{totalQuestions}
                  </CurrentStep>
                </ProgressBarContainer>
                <Box width="100%" marginBottom={2}>
                  <Title>
                    🎉 Thank you for your feedback and participation, it has been an absolute
                    pleasure having you in the cohort!
                  </Title>
                  {/* <Content>
                    Don’t worry, this is not the end, you will still be able to access your session
                    materials and peers at any time by logging in to the Student Portal. The Discord
                    server will also remain open, we encourage you to keep in touch with the
                    community! You will also recieve your certificate of completion via email within
                    the next 24 hours.
                  </Content>
                  <LinksContent>
                    Follow us on{' '}
                    <a href="https://twitter.com/scholar_site" target="_blank" rel="noreferrer">
                      Twitter
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://www.linkedin.com/school/scholarsite/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>{' '}
                    to stay up to date with upcoming ScholarSite cohorts and news!
                  </LinksContent> */}
                </Box>
                <ButtonsContainer>
                  <CloseButton
                    variant="contained"
                    onClick={() => {
                      onSuccessfullResponse('Thank you for submitting your feedback');
                      setLoading(true);
                    }}
                  >
                    Close
                  </CloseButton>
                </ButtonsContainer>
              </QuestionContainer>
            </Box>
          )}
        </div>
      ) : (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      )}
    </StyledContainer>
  );
}
