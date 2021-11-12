import React, { useState } from 'react';
import { Checkbox, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledCheckBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  width: '92px',
  height: '100%',
  background: 'rgba(77, 77, 205, 0.05)',
  borderRadius: '0px 8px 8px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  '&:hover': { opacity: 0.9 },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '53px',
    flexDirection: 'row',
    borderRadius: '0px 0px 8px 8px',
    justifyContent: 'flex-start'
  }
}));

const StyledText = styled(Typography)(() => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 600,
  color: '#4D4DCD'
}));

export default function MarkCheckbox({
  completed,
  onChange
}: {
  completed: boolean;
  onChange: Function;
}) {
  return (
    <StyledCheckBox onClick={() => onChange(!completed)}>
      <Checkbox checked={completed} />
      <StyledText> {completed ? 'Marked as Complete' : 'Mark as Complete'}</StyledText>
    </StyledCheckBox>
  );
}
