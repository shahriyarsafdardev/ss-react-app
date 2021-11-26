import VideoRecorder from 'react-video-recorder';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import './VideoRecorder.css';
import { RecordButton, StopButton, SaveOptions, Timer, Countdown } from './utilities';

const notSupportMessage = () => (
  <div style={{ padding: '1rem', textAlign: 'center' }}>
    This browser does not support video recording, please{' '}
    <a
      href="https://www.google.com.au/chrome/"
      target="_blank"
      style={{ textDecoration: 'underline' }}
      rel="noreferrer"
    >
      install
    </a>{' '}
    or{' '}
    <a
      href="https://support.google.com/chrome/answer/95414"
      target="_blank"
      style={{ textDecoration: 'underline' }}
      rel="noreferrer"
    >
      upgrade
    </a>{' '}
    to the latest version of Chrome.
  </div>
);

const ActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 25;
`;

const Controls =
  (setFile) =>
  ({
    t,
    isVideoInputSupported,
    isInlineRecordingSupported,
    thereWasAnError,
    isRecording,
    isCameraOn,
    streamIsReady,
    isConnecting,
    isRunningCountdown,
    isReplayingVideo,
    countdownTime,
    timeLimit,
    showReplayControls,
    replayVideoAutoplayAndLoopOff,
    useVideoInput,

    onTurnOnCamera,
    onTurnOffCamera,
    onOpenVideoInput,
    onStartRecording,
    onStopRecording,
    onPauseRecording,
    onResumeRecording,
    onStopReplaying,
    onConfirm
  }) => {
    const renderContent = () => {
      const shouldUseVideoInput = !isInlineRecordingSupported && isVideoInputSupported;

      if (
        (!isInlineRecordingSupported && !isVideoInputSupported) ||
        thereWasAnError ||
        isConnecting ||
        isRunningCountdown
      ) {
        return null;
      }

      if (isReplayingVideo) {
        return (
          <SaveOptions
            onRedoClick={() => {
              onStopReplaying();
              setFile(null);
            }}
          />
        );
      }

      if (isRecording) {
        return <StopButton type="button" name="stop-video-button" onClick={onStopRecording} />;
      }

      if (isCameraOn && streamIsReady) {
        return (
          <RecordButton
            t={t}
            type="button"
            name="start-video-button"
            onClick={onStartRecording}
            data-qa="start-recording"
          />
        );
      }
      return null;
    };

    return (
      <div>
        {isRecording && (
          <div className="upper">
            <Timer timeLimit={timeLimit} />
          </div>
        )}
        {isRunningCountdown && (
          <div className="upper">
            <Countdown countdownTime={countdownTime} />
          </div>
        )}
        <ActionsWrapper>{renderContent()}</ActionsWrapper>
      </div>
    );
  };

const CustomVideoRecorder = ({ onComplete }) => (
  <Box>
    <div className="question-video-recorder-screen">
      <div className="question-recorder-wrapper">
        <VideoRecorder
          isOnInitially
          showReplayControls
          isFlipped={true}
          replayVideoAutoplayAndLoopOff
          onRecordingComplete={(videoBlob) => {
            onComplete(new File([videoBlob], 'question.webm', { type: 'video/webm' }));
          }}
          renderActions={Controls(onComplete)}
          renderUnsupportedView={notSupportMessage}
        />
      </div>
    </div>
  </Box>
);

export default CustomVideoRecorder;
