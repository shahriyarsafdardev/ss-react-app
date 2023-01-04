import { useState, useEffect, memo } from 'react';
import { Box, IconButton, Button } from '@material-ui/core';
import Timer from './Timer';

import './AudioRecorder.css';

const AudioRecorder = ({ onComplete, onClose, onTrack }) => {
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      try {
        recorder.start();
      } catch (e) {
        requestRecorder().then(setRecorder, console.error);
      }
    } else {
      recorder.stop();
      recorder.stream.getTracks()[0].stop();
    }

    const handleData = (e) => {
      onComplete(e.data);
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener('dataavailable', handleData);
    // eslint-disable-next-line consistent-return
    return () => {
      recorder.removeEventListener('dataavailable', handleData);
      recorder.stream.getTracks()[0].stop();
    };
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    onTrack('Started recording audio question');
  };

  const stopRecording = () => {
    setIsRecording(false);
  };
  const renderAudio = () => {
    if (audioURL) {
      return (
        <Box
          style={{
            height: '200px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio src={audioURL} controls />
          }
          <IconButton
            onClick={() => {
              setAudioURL(null);
              onComplete(null);
            }}
          >
            <img src="/static/cohorts-home/trash-blue.svg" alt="mic" />
          </IconButton>
        </Box>
      );
    }

    if (!isRecording) {
      return (
        <Button
          startIcon={<img src="/static/cohorts-home/mic-icon.svg" alt="mic" />}
          onClick={() => {
            startRecording();
          }}
          style={{ height: '60px', width: '100%' }}
          variant="outlined"
        >
          Click to start recording
        </Button>
      );
    }

    return (
      <Box
        style={{
          height: '200px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <Timer />
        <Button onClick={() => stopRecording()} variant="outlined">
          Finish Recording
        </Button>
      </Box>
    );
  };

  return (
    <Box
      style={{
        height: '200px',
        width: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src="/static/cross-white.svg"
        alt="cross"
        onClick={() => onClose(false)}
        onKeyDown={() => {}}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 200, cursor: 'pointer' }}
      />
      {renderAudio()}
    </Box>
  );
};

export default memo(AudioRecorder);
