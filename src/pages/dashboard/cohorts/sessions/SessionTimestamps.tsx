import React from 'react';
import { Box } from '@material-ui/core';
import { SessionTimestamp } from '../../../../@types/cohorts';
import Timestamp from './Timestamp';

function SessionTimestamps({
  timestamps,
  videoReference,
  sessionId
}: {
  timestamps: SessionTimestamp[];
  videoReference: any;
  sessionId: string;
}) {
  const handlePlayTimeStamp = (seconds: string) => {
    if (videoReference.current) {
      videoReference.current.currentTime = Number(seconds);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      videoReference.current.play();
    }
  };

  return (
    <Box>
      {timestamps?.map((timestamp) => (
        <Timestamp
          timestamp={timestamp}
          key={timestamp.id}
          handlePlay={handlePlayTimeStamp}
          sessionId={sessionId}
        />
      ))}
    </Box>
  );
}

export default SessionTimestamps;
