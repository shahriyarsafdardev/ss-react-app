import React, { useState } from 'react';
import { Checkbox, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledCheckBox = styled(Box)(({ theme }) => ({
  width: '92px',
  height: '110px',
  background: 'rgba(77, 77, 205, 0.05)',
  borderRadius: '0px 8px 8px 0px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '53px',
    flexDirection: 'row',
    borderRadius: '0px 0px 8px 8px'
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
  const [marked, setMarked] = useState<boolean>(completed);
  return (
    <StyledCheckBox>
      <Checkbox
        checked={marked}
        onChange={(e) => {
          setMarked(e.target.checked);
          onChange(e.target.checked);
        }}
      />
      <StyledText> {marked ? 'Marked as Complete' : 'Mark as Complete'}</StyledText>
    </StyledCheckBox>
  );
}
