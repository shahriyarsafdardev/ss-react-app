/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import { Box, Typography, Stack, Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { CohortContext } from 'contexts/CohortContext';
import { SessionTimestamp } from '../../../../@types/cohorts';
import { updateTimestamp } from '../../../../redux/slices/cohort';
import { useDispatch } from '../../../../redux/store';

const StyledStack = styled(Stack)(({ theme }) => ({
  marginBottom: '30px',
  justifyContent: 'space-between',
  background: '#FAFAFC',
  borderRadius: '8px',
  padding: '25px 15px'
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  width: '30%',
  margin: 'auto 0',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

function Timestamp({
  timestamp,
  handlePlay,
  sessionId
}: {
  timestamp: SessionTimestamp;
  handlePlay: Function;
  sessionId: string;
}) {
  const [updateDescription, setUpdateDescription] = useState(false);
  const [description, setDescription] = useState<string>(timestamp?.description || '');
  const dispatch = useDispatch();
  const { id } = useContext(CohortContext);

  function secondsToHms(d: any) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? (m > 0 ? `${h}:` : `${h}`) : '';
    const mDisplay = m > 0 ? (s > 0 ? `${m}:` : `${m}`) : '';
    const sDisplay = s > 0 ? (h === 0 && m === 0 ? `00:${s}` : `${s}`) : ':00';
    return hDisplay + mDisplay + sDisplay;
  }

  const handleSubmit = () => {
    setUpdateDescription(!updateDescription);
    if (updateDescription) {
      dispatch(updateTimestamp(id, sessionId, timestamp.id, description));
    }
  };

  return (
    <StyledStack direction={{ xs: 'column', md: 'row' }} spacing={1}>
      <StyledImageContainer>
        <img src="" alt="timestamp" width="100%" />
      </StyledImageContainer>

      <Box
        style={{
          borderLeft: '2px solid #E2E8F0',
          width: '0px',
          height: 'auto'
        }}
      />
      <Stack direction="column" spacing={2} width={{ sm: '100%', md: '60%' }}>
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
          {!updateDescription && (
            <Button
              onClick={() => handlePlay(timestamp?.timestamp)}
              variant="contained"
              style={{ borderRadius: '20px' }}
              fullWidth
            >
              Open Timestamp
            </Button>
          )}
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
    </StyledStack>
  );
}

export default Timestamp;
