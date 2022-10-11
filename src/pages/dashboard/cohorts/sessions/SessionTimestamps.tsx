import React from 'react';
import { Box } from '@material-ui/core';
import { SessionTimestamp } from '../../../../@types/cohorts';
import Timestamp from './Timestamp';

function SessionTimestamps({
  timestamps,
  handlePlayTimeStamp,
  sessionId
}: {
  timestamps: SessionTimestamp[];
  handlePlayTimeStamp: any;
  sessionId: string;
}) {
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
