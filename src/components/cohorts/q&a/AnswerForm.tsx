import { useEffect, useState, memo, useMemo } from 'react';
import VideoRecorder from 'components/media-recorders/VideoRecorder';
import { useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import { Box, Divider, Typography, Stack, useMediaQuery } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { Question } from '../../../@types/cohorts';
import {
  QuestionContainer,
  ProgressBarContainer,
  BorderLinearProgress,
  CurrentStep,
  CompleteBox,
  StyledButton,
  ButtonsContainer,
  QuestionBox,
  MessageBox,
  RecorderBox,
  SessionTitle,
  MainStack
} from './Common';

function AnswerForm({
  onComplete,
  onClose,
  unAnswered,
  handleSkipQuestion
}: {
  onComplete: Function;
  onClose: VoidFunction;
  unAnswered: Array<Question>;
  handleSkipQuestion: Function;
}) {
  const questionsData = unAnswered;
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

  const handleNext = () => {
    if (currentQuestion + 1 === totalQuestions) {
      setComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setRecording(null);
  };

  const handleSubmit = () => {
    if (questionID && recording) {
      onComplete(questionID, recording);
      handleNext();
    }
  };

  const progress = useMemo(() => {
    if (totalQuestions > 0) {
      return ((currentQuestion + 1) / totalQuestions) * 100;
    }
    return 0;
  }, [totalQuestions, currentQuestion]);

  const RenderQuestion = memo(({ question }: { question: Question }) => (
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
  ));

  const Label = memo(({ value }: { value: string }) => (
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
  ));

  const skipQuestion = () => {
    handleNext();
    setAddRecording(false);
    handleSkipQuestion(questionID);
  };

  const addRecordingButton = () => (addRecording ? handleSubmit() : setAddRecording(true));

  return (
    <>
      {questionsData && Object.keys(questionsData).length >= 0 ? (
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
              <BorderLinearProgress variant="determinate" value={progress} />
            </ProgressBarContainer>
          </QuestionContainer>
          {!complete && questionsData[currentQuestion] ? (
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
                    onClick={skipQuestion}
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
                      onClick={addRecordingButton}
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
                  onClick={() => onClose()}
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

export default memo(AnswerForm);
