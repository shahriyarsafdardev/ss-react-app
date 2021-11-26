import { useState } from 'react';
import { Stack, TextField, Box, Typography, Button, Divider, Container } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import VideoRecorder from 'components/media-recorders/VideoRecorder';
import { SectionContainer } from './Common';

const StyledStack = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'column'
  }
}));
const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: '170px',
  marginLeft: 10,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
    marginTop: 20
  }
}));

const StyledRecordingButton = styled(Button)(({ theme }) => ({
  height: '50px',
  margin: '10px',
  color: '#4D4DCD',
  width: 200,
  fontSize: 16,
  border: '2px solid',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const RecordingTabContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  width: '37%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '100%'
  }
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: 'auto',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '100%'
  }
}));

const AddQuestionButton = styled(Button)(({ theme }) => ({
  width: '170px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const QuestionFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#4D4DCD',
  padding: '16px 24px 16px 24px',
  zIndex: 1200,
  width: '100%',
  position: 'relative'
}));

const QuestionInput = styled(Box)(({ theme }) => ({
  width: '60%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const RecordingButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'column',
  background: 'linear-gradient(180deg, #F7FAFC 0%, rgba(247, 250, 252, 0) 100%)',
  border: '1px dashed #DCE0E4',
  borderRadius: '8px',
  marginBottom: 20,
  height: 225,
  padding: '30px 10px 30px 16px'
}));

const recordingTab = (recording: boolean, setIsRecording: any) => (
  <>
    <RecordingButtonsContainer>
      {recording && (
        <VideoRecorder
          onClose={setIsRecording}
          onComplete={(response: any) => console.log(response)}
        />
      )}
      {!recording && (
        <>
          <Typography sx={{ fontWeight: 400, fontSize: 14, color: '#6C7885' }}>
            You can add a recording to provide context and a personal touch to your question!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <StyledRecordingButton
              variant="outlined"
              startIcon={<img src="/static/cohorts-home/video-outlined.svg" />}
              onClick={() => {
                setIsRecording(true);
              }}
            >
              Record Video
            </StyledRecordingButton>
            <StyledRecordingButton
              variant="outlined"
              startIcon={<img src="/static/cohorts-home/audio-outlined.svg" />}
            >
              Record Audio
            </StyledRecordingButton>
          </Box>
        </>
      )}
    </RecordingButtonsContainer>
  </>
);

const QuestionForm = ({ onSubmit, submitting }: { onSubmit: any; submitting: boolean }) => {
  const [question, setQuestion] = useState('');
  const [showRecording, setShowRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const submitQuestion = async () => {
    onSubmit(question);
    setQuestion('');
  };

  const handleRecording = () => {
    if (showRecording && isRecording) {
      setIsRecording(false);
    }
  };

  return (
    <QuestionFormContainer id="question-box">
      <SectionContainer className="newQuestion">
        <StyledStack style={{ alignItems: `${showRecording === true ? 'unset' : 'center'}` }}>
          <QuestionInput>
            <TextField
              fullWidth
              value={question}
              placeholder="Do you have any questions? Host would love to hear them! "
              multiline
              rows={showRecording === true ? '9' : ''}
              size="small"
              onChange={(e) => setQuestion(e.target.value)}
              inputProps={{ maxLength: 120 }}
            />
          </QuestionInput>
          <RecordingTabContainer>
            {showRecording && recordingTab(isRecording, setIsRecording)}
            <ButtonsContainer>
              <AddQuestionButton
                onClick={() => {
                  setShowRecording(!showRecording);
                  handleRecording();
                }}
                variant="outlined"
                id="btn-submit"
                startIcon={
                  showRecording === true ? (
                    <img src="/static/cohorts-home/arrow-up.svg" />
                  ) : (
                    <img src="/static/cohorts-home/arrow-down.svg" />
                  )
                }
              >
                {showRecording === true ? 'Hide' : 'Add Recording'}
              </AddQuestionButton>
              <StyledLoadingButton
                onClick={() => submitQuestion()}
                variant="contained"
                loading={submitting}
                id="btn-submit"
              >
                Submit Question
              </StyledLoadingButton>
            </ButtonsContainer>
          </RecordingTabContainer>
        </StyledStack>
      </SectionContainer>
    </QuestionFormContainer>
  );
};

export default QuestionForm;
