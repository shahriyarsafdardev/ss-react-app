import { useState, useEffect } from 'react';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import { SectionContainer, CircularLoader } from './Common';
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
  },
  '.MuiOutlinedInput-root': {
    height: '100%'
  }
}));

const QuestionForm = ({ onSuccess }: { onSuccess: Function }) => {
  const [questionSummary, setQuestionSummary] = useState('');
  const [showMediaSection, setMediaSection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [questionType, setQuestionType] = useState('Text');
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';

  useEffect(() => {
    const elem = document.getElementById('question-text-input');
    if (elem) {
      if (elem.scrollHeight > 23) {
        setMediaSection(true);
      }
    }
  }, [questionSummary.length]);

  const onFormSubmitHandler = async () => {
    setSubmitting(true);
    const questionData = new FormData();

    questionData.append('question_summary', questionSummary);
    questionData.append('question_type', questionType);
    videoData && questionData.append('question_video', videoData || '');
    audioData && questionData.append('question_audio', audioData || '');
    questionData.append('cohort_id', cohort_id);

    await axios
      .post(`/questions_feed.json`, questionData)
      .then((res) => {
        if (res.data.question) {
          enqueueSnackbar('New question added', { variant: 'success' });
          onSuccess(res.data.question);
          setQuestionSummary('');
          setMediaSection(false);
          setIsRecording(false);
          setQuestionType('Text');
          setVideoData(null);
          setAudioData(null);
        } else {
          enqueueSnackbar('Failed to submit question!', { variant: 'error' });
          enqueueSnackbar('Please try submitting again', { variant: 'error' });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        enqueueSnackbar('Failed to submit question!', { variant: 'error' });
        enqueueSnackbar('Please try submitting again', { variant: 'error' });
        setSubmitting(false);
      });
  };

  return (
    <QuestionFormContainer id="question-box">
      <SectionContainer className="newQuestion">
        {!submitting && (
          <StyledStack style={{ alignItems: `${showMediaSection === true ? 'unset' : 'center'}` }}>
            <QuestionInput>
              <TextField
                fullWidth
                value={questionSummary}
                placeholder="Do you have any questions? Host would love to hear them! "
                multiline
                size="small"
                id="question-text-input"
                rows={1}
                onChange={(e) => setQuestionSummary(e.target.value)}
                style={{ height: '100%' }}
                inputProps={{
                  height: '100%',
                  style: {
                    height: '100%'
                  }
                }}
              />
            </QuestionInput>
            <RecordingTabContainer>
              {showMediaSection && (
                <MediaRecordingTab
                  isRecording={isRecording}
                  onVideoRecordingComplete={setVideoData}
                  onAudioRecordingComplete={setAudioData}
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
                    if (isRecording) {
                      setIsRecording(false);
                    }
                    setMediaSection(!showMediaSection);
                  }}
                  variant="outlined"
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
                  onClick={onFormSubmitHandler}
                  variant="contained"
                  loading={submitting}
                >
                  Submit Question
                </StyledLoadingButton>
              </ButtonsContainer>
            </RecordingTabContainer>
          </StyledStack>
        )}
        {submitting && (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: `${showMediaSection === true ? '327px' : ''}`
            }}
          >
            <Typography> Hold on one second, we're just uploading your question!</Typography>
            <CircularLoader />
          </Box>
        )}
      </SectionContainer>
    </QuestionFormContainer>
  );
};

export default QuestionForm;
