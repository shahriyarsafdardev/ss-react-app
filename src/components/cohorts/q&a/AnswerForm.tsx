import { useEffect, useState } from 'react';
import VideoRecorder from 'components/media-recorders/VideoRecorder';
import { styled, useTheme } from '@material-ui/core/styles';
import axios from 'utils/axios';
import moment from 'moment';
import {
  Container,
  Box,
  Button,
  Divider,
  Typography,
  Stack,
  useMediaQuery
} from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { Question } from '../../../@types/cohorts';

const QuestionContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  paddingBottom: '10px',
  marginBottom: '12px',
  position: 'relative'
}));

const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 30
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 8,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

const CurrentStep = styled('span')(() => ({
  fontSize: 18,
  color: '#4D4DCD',
  fontWeight: 'bold',
  fontFamily: 'Public Sans'
}));

const CompleteBox = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '400px',
  fontWeight: 600
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: 11,
  flex: 1,
  '&.right-btn': {
    marginLeft: '30px !important',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      marginLeft: '0 !important'
    }
  },
  '&.btn-add-recording': {
    margin: '10px 0px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  '&.btn-close': {
    width: '60%',
    flex: 'none',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
  [theme.breakpoints.up('md')]: {
    width: '100%'
  }
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '10px 0px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column-reverse'
  }
}));

const QuestionBox = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: '280px',
  padding: '20px',
  background: 'linear-gradient(180deg, #F7FAFC 0%, rgba(247, 250, 252, 0) 1)',
  border: '2px solid #DCE0E4',
  borderRadius: '8px',
  overflowY: 'auto',

  [theme.breakpoints.down('md')]: {
    display: 'block',
    height: '3100px'
  }
}));

const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#CD4D56',
  width: '100%',
  padding: '10px 125px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    padding: '10px'
  }
}));

const RecorderBox = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: '280px',
  padding: '20px',
  background: 'linear-gradient(180deg, #F7FAFC 0%, rgba(247, 250, 252, 0) 1)',
  border: '2px dashed #DCE0E4',
  borderRadius: '8px',
  marginLeft: '30px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
    width: '100%',
    height: '240px',
    marginLeft: '0px'
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

const MainStack = styled(Stack)(({ theme }) => ({
  height: '310px',
  width: '100%',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '25px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
    height: '270px',
    marginLeft: '0px'
  }
}));

export default function AnswerForm({
  onComplete,
  onClose,
  unAnswered,
  handleSkipQuestion
}: {
  onComplete: Function;
  onClose: Function;
  unAnswered: Array<Question>;
  handleSkipQuestion: Function;
}) {
  const questionsData = unAnswered;
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = questionsData.length;
  const [questionID, setQuestionID] = useState('');
  const [recording, setRecording] = useState(null);
  const [complete, setComplete] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [addRecording, setAddRecording] = useState(!isMobile);

  useEffect(() => {
    setAddRecording(!isMobile);
  }, [theme.breakpoints, isMobile]);

  useEffect(() => {
    if (questionsData.length > 0) {
      const question: any = questionsData[currentQuestion];
      setQuestionID(question.id);
    }
  }, [setCurrentQuestion, currentQuestion, questionsData]);

  const handleSubmit = () => {
    if (questionID && recording) {
      onComplete(questionID, recording);
      handleNext();
    }
  };

  const progress = () => {
    if (totalQuestions > 0) {
      return ((currentQuestion + 1) / totalQuestions) * 100;
    }
    return 0;
  };

  const handleNext = () => {
    if (currentQuestion + 1 === totalQuestions) {
      setComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setRecording(null);
  };

  const RenderQuestion = ({ question }: { question: Question }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start'
      }}
    >
      <Box>
        {question.question_type === 'Audio' && question.audio_url && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio src={question.audio_url} controls style={{ width: '100%', marginTop: '10px' }} />
        )}
        {question.question_type === 'Video' && question.video_url && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={question.video_url}
            poster={question?.video_screenshot}
            preload="auto"
            controls
            controlsList="nodownload"
            autoPlay={false}
            style={{ width: '100%', height: '150px', borderRadius: '8px', marginTop: '10px' }}
          />
        )}
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <Stack direction="column">
          <Typography style={{ fontSize: '1rem', fontWeight: 700, color: '#212B36' }}>
            {question?.question_summary ? `${question.question_summary}` : 'Question summary'}
          </Typography>
          {/* {question.question_type === 'Text' && question.question_text && (
            <div
              style={{ marginTop: '12px', fontWeight: 200, fontSize: '16px', lineHeight: '28px' }}
              dangerouslySetInnerHTML={{ __html: question.question_text }}
            />
          )} */}
          <Typography
            style={{
              fontSize: '0.8rem',
              fontWeight: 400,
              color: '#212B36',
              lineHeight: '16px',
              marginTop: '5px'
            }}
          >
            {question?.asker_name
              ? `Asked by ${question.asker_name} ${moment(question.date).fromNow()}`
              : 'Some User'}
          </Typography>
        </Stack>
      </Box>
    </div>
  );

  const Label = ({ value }: { value: string }) => (
    <p
      style={{
        position: 'absolute',
        top: '15px',
        background: 'white',
        fontWeight: 600,
        padding: '0px 5px'
      }}
    >
      {value}
    </p>
  );

  return (
    <>
      {questionsData && !loading && Object.keys(questionsData).length >= 0 ? (
        <>
          <QuestionContainer>
            <br />
            <Box width="100%">
              <SessionTitle>
                New Questions{' '}
                <CurrentStep>
                  ({currentQuestion + 1}/{totalQuestions})
                </CurrentStep>
              </SessionTitle>
            </Box>
            <br />
            <ProgressBarContainer>
              <BorderLinearProgress variant="determinate" value={progress()} />
            </ProgressBarContainer>
          </QuestionContainer>
          {!complete ? (
            <QuestionContainer>
              <Stack direction="column" justifyContent="space-between">
                <MainStack direction={{ xs: 'column', sm: 'row' }}>
                  <QuestionBox
                    display={addRecording && isMobile ? 'none !important' : 'block !important'}
                  >
                    <Label value="Question" />
                    <RenderQuestion question={questionsData[currentQuestion]} />
                  </QuestionBox>
                  <RecorderBox
                    key={currentQuestion}
                    display={!addRecording && isMobile ? 'none !important' : 'block !important'}
                  >
                    <Label value="Your Answer" />
                    <VideoRecorder
                      onTrack={() => {}}
                      onClose={() => {}}
                      onComplete={(response: any) => {
                        setRecording(response);
                      }}
                    />
                  </RecorderBox>
                </MainStack>
                {!isMobile && <Divider />}
                {(addRecording || !isMobile) && (
                  <MessageBox>* By clicking the button, you will be posting the answer</MessageBox>
                )}
                <ButtonsContainer key={questionID}>
                  <StyledButton
                    className="btn-previous"
                    variant="outlined"
                    onClick={() => {
                      handleNext();
                      setAddRecording(false);
                      handleSkipQuestion(questionID);
                    }}
                    data-testid="btn-previous"
                  >
                    Skip Question
                  </StyledButton>
                  {isMobile ? (
                    <StyledButton
                      className="btn-add-recording"
                      variant="contained"
                      key={`${addRecording}`}
                      disabled={addRecording && !recording}
                      onClick={() => {
                        addRecording ? handleSubmit() : setAddRecording(true);
                      }}
                      data-testid="btn-addRecording"
                    >
                      Add Recording
                    </StyledButton>
                  ) : (
                    <StyledButton
                      variant="contained"
                      className="right-btn"
                      onClick={handleSubmit}
                      disabled={!recording}
                      data-testid="btn-next"
                    >
                      Submit Answer
                    </StyledButton>
                  )}
                </ButtonsContainer>
              </Stack>
            </QuestionContainer>
          ) : (
            <QuestionContainer>
              <CompleteBox>
                <Box component="img" src="/static/icons/tick.svg" sx={{ objectFit: 'cover' }} />
                <div>
                  <p>Thank you!</p>
                  <p style={{ color: '#637381' }}>You've answered all your questions!</p>
                </div>
                <StyledButton
                  variant="contained"
                  className="btn-close"
                  onClick={() => {
                    onClose();
                  }}
                  data-testid="btn-close"
                >
                  Close
                </StyledButton>
              </CompleteBox>
            </QuestionContainer>
          )}
        </>
      ) : (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      )}
    </>
  );
}
