import { memo } from 'react';
import { styled } from '@material-ui/core/styles';
import { Stack, Typography } from '@material-ui/core';

const StyledBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '3rem',
  img: {
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '80%'
    }
  }
}));

const StyledPara = styled('p')(() => ({
  fontFamily: 'Public Sans',
  fontSize: '16px',
  lineHeight: '28px',
  textAlign: 'center',
  fontWeight: 400,
  color: '#A6AEB7'
}));

const EmptyAttendanceTab = ({ imageLink }: { imageLink: string }) => (
  <StyledBox flexDirection="column" justifyContent="center">
    <img src={imageLink} alt="empty-session" />
    <Typography align="center" color="primary" variant="h5" sx={{ mt: 3 }}>
      Available soon!
    </Typography>
    <StyledPara>As soon as sessions begin, this data will be shown</StyledPara>
  </StyledBox>
);

export default memo(EmptyAttendanceTab);
