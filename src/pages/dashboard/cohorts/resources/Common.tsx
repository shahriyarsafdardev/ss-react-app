import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';
import { ToggleButton, Typography } from '@material-ui/core';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

export const StyledImage = styled('img')(({ theme }) => ({
  height: 'auto',
  width: '60px'
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: '#E1E4E74D',
  border: 'none',
  borderRadius: '10px !important',
  ':hover': {
    backgroundColor: '#2F80ED !important',
    '&:ToggleButtonTypography': {
      color: '#ffffff'
    }
  }
}));

export const ToggleButtonTypography = styled(Typography)(({ theme }) => ({
  color: '#334155'
  // ':hover': {
  //   color: '#ffffff'
  // }
}));
