/* eslint-disable no-nested-ternary */
import { useState, useContext, memo } from 'react';
import { Box, Typography, Stack, Button, TextField } from '@material-ui/core';
import { CohortContext } from 'contexts/CohortContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SessionTimestamp } from '../../../../@types/cohorts';
import { updateTimestamp } from '../../../../redux/slices/cohort';
import { useDispatch } from '../../../../redux/store';
import { useStyles, StyledImageContainer, StyledStack } from './Common';

function Timestamp({
  timestamp,
  handlePlay,
  sessionId,
  isRecordingAvailable,
  sendAnalyticsEvent
}: {
  timestamp: SessionTimestamp;
  handlePlay: Function;
  sessionId: string;
  isRecordingAvailable: boolean;
  sendAnalyticsEvent: Function;
}) {
  const [updateDescription, setUpdateDescription] = useState(false);
  const [description, setDescription] = useState<string>(timestamp?.description || '');
  const dispatch = useDispatch();
  const { id } = useContext(CohortContext);
  const classes = useStyles();

  function secondsToHms(d: any) {
    const secs = Number(d);
    const h = Math.floor(secs / 3600);

    if (h > 0) {
      return new Date(secs * 1000).toISOString().slice(11, 19);
    }
    return new Date(secs * 1000).toISOString().slice(14, 19);
  }

  const handleSubmit = () => {
    handleEvent(`Sessions Page - Timestamps - "${buttonText()}" button clicked`);
    setUpdateDescription(!updateDescription);
    if (updateDescription) {
      dispatch(updateTimestamp(id, sessionId, timestamp.id, description));
    }
  };

  const handleEvent = (eventName: string) => {
    sendAnalyticsEvent(eventName, { 'Time Point': secondsToHms(timestamp?.timestamp || 0) });
  };

  const handleOpenTimestamp = () => {
    handlePlay(timestamp?.timestamp);
    handleEvent('Sessions Page - Timestamps - "Open Timestamp" button clicked');
  };

  const buttonText = () =>
    updateDescription
      ? 'Save Description'
      : !timestamp?.description
      ? 'Add Description'
      : 'Edit Description';

  return (
    <StyledStack direction={{ xs: 'column', md: 'row' }} spacing={1}>
      <StyledImageContainer>
        <LazyLoadImage
          src={
            timestamp?.thumbnail_url ||
            'https://sphere-public.s3.eu-west-2.amazonaws.com/Default+thumbnail.png'
          }
          alt="timestamp"
          width="100%"
        />
      </StyledImageContainer>

      <Box
        style={{
          borderLeft: '2px solid #E2E8F0',
          width: '0px',
          height: 'auto'
        }}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        spacing={4}
        width={{ sm: '100%', md: '60%' }}
      >
        {updateDescription ? (
          <TextField
            id="outlined-multiline-static"
            label="Enter description"
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          />
        ) : (
          <Typography style={{ color: '#454F5B', fontSize: '14px' }}>
            {secondsToHms(timestamp?.timestamp || 0)}
            {` | ${timestamp?.description || 'New Timestamp'}`}
          </Typography>
        )}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {!updateDescription && isRecordingAvailable && (
            <Button
              onClick={() => handleOpenTimestamp()}
              variant="contained"
              className={classes.timestampButton}
              fullWidth
            >
              Open Timestamp
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            variant="outlined"
            className={classes.timestampButton}
            fullWidth
          >
            {buttonText()}
          </Button>
        </Stack>
      </Stack>
    </StyledStack>
  );
}

export default memo(Timestamp);
