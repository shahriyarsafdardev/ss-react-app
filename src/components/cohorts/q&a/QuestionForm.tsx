import { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import { isMobile } from 'react-device-detect';
import { Modal } from 'components/animate';
import useAuth from 'hooks/useAuth';
import { Question } from '../../../@types/cohorts';
import { SectionContainer, CircularLoader } from './Common';
import MediaRecordingTab from './MediaRecordingTab';
import AnswerForm from './AnswerForm';

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

const UnreadMessage = styled('p')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center'
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
  // zIndex: 1200,
  width: '100%',
  position: 'relative'
}));

const QuestionInput = styled(Box)(({ theme }) => ({
  width: '60%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '20px'
  },
  '.MuiOutlinedInput-root': {
    height: '100%'
  }
}));

const QuestionForm = ({
  onSuccess,
  hosts,
  unAnswered,
  addAnswer,
  isHost
}: {
  onSuccess: Function;
  hosts: string;
  isHost: boolean;
  unAnswered: Array<Question>;
  addAnswer: Function;
}) => {
  const [questionSummary, setQuestionSummary] = useState('');
  const [showMediaSection, setMediaSection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [questionType, setQuestionType] = useState('Text');
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const [modalState, setModal] = useState(false);
  const { user, updateProfile } = useAuth();
  const showAnswerForm = (isHost || user?.type === 'admin') && unAnswered.length > 0;

  useEffect(() => {
    const elem = document.getElementById('question-text-input');
    if (elem) {
      if (elem.scrollHeight > (isMobile ? 46 : 23)) {
        setMediaSection(true);
      }
    }
  }, [questionSummary.length]);

  const onFormSubmitHandler = async () => {
    setSubmitting(true);
    sendAnalyticsData('Question Form', 'Submitted question');
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

  const AnswerModal = ({
    state,
    onClose,
    onComplete
  }: {
    state: boolean;
    onClose: Function;
    onComplete: Function;
  }) => (
    <Modal open={state} onClose={() => onClose()}>
      <AnswerForm
        key="answerForm"
        onComplete={onComplete}
        onClose={onClose}
        unAnswered={unAnswered}
      />
    </Modal>
  );

  return (
    <QuestionFormContainer id="question-box">
      <AnswerModal
        state={modalState}
        onClose={() => {
          setModal(false);
        }}
        onComplete={addAnswer}
      />
      <SectionContainer className="newQuestion">
        {!submitting && (
          <StyledStack style={{ alignItems: `${showMediaSection === true ? 'unset' : 'center'}` }}>
            <QuestionInput>
              {!showAnswerForm || showMediaSection ? (
                <TextField
                  fullWidth
                  value={questionSummary}
                  placeholder={`Do you have any questions? ${hosts} would love to hear them!`}
                  multiline
                  size="small"
                  id="question-text-input"
                  rows={isMobile ? 2 : 1}
                  onChange={(e) => setQuestionSummary(e.target.value)}
                  onFocus={() => sendAnalyticsData('Question Form', 'Started entering question')}
                  style={{ height: '100%' }}
                  inputProps={{
                    height: '100%',
                    style: {
                      height: '100%'
                    }
                  }}
                />
              ) : (
                <UnreadMessage>
                  You have
                  <Button variant="text" onClick={() => setModal(true)}>
                    {`${unAnswered.length} `}
                    unanswered
                  </Button>
                  questions
                </UnreadMessage>
              )}
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
                  onTrack={(action: string) => sendAnalyticsData('Question Form', action)}
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
                  disabled={!showMediaSection && showAnswerForm}
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
