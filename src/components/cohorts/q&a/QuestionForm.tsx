import { useState } from 'react';
import { TextField, Box, Typography, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { SectionContainer } from './Common';
import MediaRecordingTab from './MediaRecordingTab';

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

const QuestionForm = ({ onSubmit, submitting }: { onSubmit: any; submitting: boolean }) => {
  const [question, setQuestion] = useState('');
  const [showMediaSection, setMediaSection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [questionType, setQuestionType] = useState('Text');

  const submitQuestion = async () => {
    await onSubmit(question, videoData, questionType);
    setQuestion('');
    setMediaSection(false);
    setIsRecording(false);
    setQuestionType('Text');
    setVideoData(null);
  };

  return (
    <QuestionFormContainer id="question-box">
      <SectionContainer className="newQuestion">
        <StyledStack style={{ alignItems: `${showMediaSection === true ? 'unset' : 'center'}` }}>
          <QuestionInput>
            <TextField
              fullWidth
              value={question}
              placeholder="Do you have any questions? Host would love to hear them! "
              multiline
              rows={showMediaSection === true ? '10' : ''}
              size="small"
              onChange={(e) => setQuestion(e.target.value)}
              inputProps={{ maxLength: 120 }}
            />
          </QuestionInput>
          <RecordingTabContainer>
            {showMediaSection && (
              <MediaRecordingTab
                isRecording={isRecording}
                onVideoRecordingComplete={setVideoData}
                setIsRecording={setIsRecording}
                setQuestionType={setQuestionType}
                questionType={questionType}
              />
            )}
            <ButtonsContainer>
              <AddQuestionButton
                onClick={() => {
                  if (!showMediaSection) {
                    setQuestionType('Text');
                  }
                  setMediaSection(!showMediaSection);
                }}
                variant="outlined"
                id="btn-submit"
                startIcon={
                  showMediaSection === true ? (
                    <img src="/static/cohorts-home/arrow-up.svg" alt="up-arrow" />
                  ) : (
                    <img src="/static/cohorts-home/arrow-down.svg" alt="down-arrow" />
                  )
                }
              >
                {showMediaSection === true ? 'Hide' : 'Add Recording'}
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
