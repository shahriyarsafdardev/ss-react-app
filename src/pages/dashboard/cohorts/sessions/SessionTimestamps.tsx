import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { SessionTimestamp } from '../../../../@types/cohorts';
import Timestamp from './Timestamp';
import EmptySessionTimestamps from './EmptySessionTimestamps';
import { useStyles } from './Common';

export default function SessionTimestamps({
  timestamps,
  handlePlayTimeStamp,
  sessionId,
  isRecordingAvailable
}: {
  timestamps: SessionTimestamp[];
  handlePlayTimeStamp: any;
  sessionId: string;
  isRecordingAvailable: boolean;
}) {
  const classes = useStyles();

  return (
    <Box width="100%">
      {timestamps?.length ? (
        <>
          {!isRecordingAvailable && (
            <Typography className={classes.recordingNotAvailableText}>
              Once the session recording is available, you will be able to use timestamps to jump to
              the corresponding spot in the recording.
            </Typography>
          )}
          {timestamps?.map((timestamp) => (
            <Timestamp
              timestamp={timestamp}
              key={timestamp.id}
              handlePlay={handlePlayTimeStamp}
              sessionId={sessionId}
              isRecordingAvailable={isRecordingAvailable}
            />
          ))}
        </>
      ) : (
        <EmptySessionTimestamps />
      )}
    </Box>
  );
}
