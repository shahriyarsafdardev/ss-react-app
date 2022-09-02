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
    videoReference.current.currentTime = Number(seconds);
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
