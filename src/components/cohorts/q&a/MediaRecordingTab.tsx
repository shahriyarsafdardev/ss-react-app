import VideoRecorder from 'components/media-recorders/VideoRecorder';
import { Box, Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AudioRecorder from 'components/media-recorders/AudioRecorder';

const StyledRecordingButton = styled(Button)(({ theme }) => ({
  height: '50px',
  margin: '10px',
  width: 200,
  fontSize: 16,
  border: '2px solid',
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
  height: 270,
  padding: '30px 10px 30px 16px',
  position: 'relative'
}));

const MediaRecordingTab = ({
  isRecording,
  onVideoRecordingComplete,
  onAudioRecordingComplete,
  setIsRecording,
  setQuestionType,
  questionType,
  onTrack
}: {
  isRecording: boolean;
  onVideoRecordingComplete: Function;
  setIsRecording: Function;
  setQuestionType: Function;
  questionType: string;
  onAudioRecordingComplete: Function;
  onTrack: Function;
}) => (
  <>
    <RecordingButtonsContainer>
      {isRecording && questionType === 'Video' && (
        <VideoRecorder
          onTrack={onTrack}
          onClose={(value: boolean) => {
            setIsRecording(value);
            onVideoRecordingComplete(null);
            setQuestionType('Text');
          }}
          onComplete={(response: any) => onVideoRecordingComplete(response)}
        />
      )}
      {isRecording && questionType === 'Audio' && (
        <AudioRecorder
          onComplete={(response: any) => onAudioRecordingComplete(response)}
          onTrack={onTrack}
          onClose={(value: boolean) => {
            setIsRecording(value);
            onAudioRecordingComplete(null);
            setQuestionType('Text');
          }}
        />
      )}
      {!isRecording && (
        <>
          <Typography
            sx={{ fontWeight: 400, fontSize: 14, color: 'text.secondary', textAlign: 'center' }}
          >
            You can add a recording to provide context and a personal touch to your question!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <StyledRecordingButton
              variant="outlined"
              startIcon={<img src="/static/cohorts-home/video-outlined.svg" alt="video-icon" />}
              onClick={() => {
                setQuestionType('Video');
                setIsRecording(true);
              }}
            >
              Record Video
            </StyledRecordingButton>
            <StyledRecordingButton
              variant="outlined"
              startIcon={<img src="/static/cohorts-home/audio-outlined.svg" alt="audio-icon" />}
              onClick={() => {
                setQuestionType('Audio');
                setIsRecording(true);
              }}
            >
              Record Audio
            </StyledRecordingButton>
          </Box>
        </>
      )}
    </RecordingButtonsContainer>
  </>
);
export default MediaRecordingTab;
