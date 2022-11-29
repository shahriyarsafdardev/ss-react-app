import React from 'react';
import { Box } from '@material-ui/core';
import { SessionTimestamp } from '../../../../@types/cohorts';
import Timestamp from './Timestamp';
import EmptySessionTimestamps from './EmptySessionTimestamps';

export default function SessionTimestamps({
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
      {timestamps?.length ? (
        timestamps?.map((timestamp) => (
          <Timestamp
            timestamp={timestamp}
            key={timestamp.id}
            handlePlay={handlePlayTimeStamp}
            sessionId={sessionId}
          />
        ))
      ) : (
        <EmptySessionTimestamps />
      )}
    </Box>
  );
}
