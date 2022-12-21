import React, { memo, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { RootState, useSelector } from 'redux/store';
import { SessionTimestamp } from '../../../../@types/cohorts';
import Timestamp from './Timestamp';
import EmptySessionTimestamps from './EmptySessionTimestamps';
import { useStyles } from './Common';

const SessionTimestamps = ({
  timestamps,
  handlePlayTimeStamp,
  isRecordingAvailable,
  session
}: {
  timestamps: SessionTimestamp[];
  handlePlayTimeStamp: any;
  isRecordingAvailable: boolean;
  session: any;
}) => {
  const classes = useStyles();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  useEffect(() => {
    sendAnalyticsEvent('Sessions Page - Timestamps - Tab opened');
  }, []);

  const sendAnalyticsEvent = (eventName: string, eventProperties?: any) => {
    trackEvent(cohort, eventName, {
      'Session ID': session?.id,
      'Session Number': session?.number,
      'Session Name': session?.name,
      ...eventProperties
    });
  };

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
              sessionId={session?.id}
              isRecordingAvailable={isRecordingAvailable}
              sendAnalyticsEvent={sendAnalyticsEvent}
            />
          ))}
        </>
      ) : (
        <EmptySessionTimestamps sendAnalyticsEvent={sendAnalyticsEvent} />
      )}
    </Box>
  );
};

export default memo(SessionTimestamps);
