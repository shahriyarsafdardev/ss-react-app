/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, TextField } from '@material-ui/core';
import axios from 'utils/axios';
import { SessionTimestamp } from '../../../../@types/cohorts';

function Timestamp({
  timestamp,
  updateTimestamps,
  handlePlay
}: {
  timestamp?: SessionTimestamp;
  updateTimestamps?: Function;
  handlePlay: Function;
}) {
  const [updateDescription, setUpdateDescription] = useState(false);
  const [description, setDescription] = useState<string>(timestamp?.description || '');

  function secondsToHms(d: any) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? (m > 0 ? `${h}:` : `${h}`) : '';
    const mDisplay = m > 0 ? (s > 0 ? `${m}:` : `${m}`) : '';
    const sDisplay = s > 0 ? `${s}` : ':00';
    return hDisplay + mDisplay + sDisplay;
  }

  const handleSubmit = () => {
    setUpdateDescription(!updateDescription);
    if (updateDescription) {
      try {
        axios
          .post(`/session_timestamps/${timestamp?.id}/update_timestamp.json`, {
            description
          })
          .then((res) => {
            // updateTimestamps(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Box
      style={{
        padding: '24px',
        margin: '16px',
        border: '1px solid #C4CDD5',
        background: '#F9FAFB',
        borderRadius: '8px',
        width: '100%'
      }}
    >
      <img src={timestamp?.thumbnail_url} alt="timestamp" />
      <Stack direction="column" spacing={1}>
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
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
          <Button
            onClick={() => handlePlay(timestamp?.timestamp)}
            variant="contained"
            style={{ borderRadius: '20px' }}
            fullWidth
          >
            Open Timestamp
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            style={{ borderRadius: '20px' }}
            fullWidth
          >
            {updateDescription
              ? 'Save Description'
              : !timestamp?.description
              ? 'Add Description'
              : 'Edit Description'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Timestamp;
