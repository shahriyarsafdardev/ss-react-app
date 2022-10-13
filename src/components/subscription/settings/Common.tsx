import { Stack, styled, Typography, Theme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const StyledStack = styled(Stack)(() => ({
  backgroundColor: '#F6F7F8',
  padding: '30px 10%',
  borderRadius: '10px'
}));

export const StyledHeading = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: 'bold'
}));

export const BoldText = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 'bold'
}));

export const StyledText = styled(Typography)(() => ({
  fontSize: '14px'
}));

export const StyledLink = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: '220px',
  borderRadius: '30px',
  [theme.breakpoints.down('md')]: {
    width: '80%'
  }
}));

export const useStyles = makeStyles((theme: Theme) => ({
  cardDetailsBox: {
    backgroundColor: '#F6F7F8',
    borderRadius: '10px',
    fontSize: '14px',
    padding: '5px 20px'
  },
  updateCardBox: {
    backgroundColor: '#F6F7F8',
    borderRadius: '10px',
    fontSize: '14px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '10px'
    }
  },
  subscriptionModal: {
    width: '50% !important',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '95% !important'
    }
  },
  cancelButton: {
    color: '#FF4842',
    borderColor: '#FF4842',
    '&:hover': {
      borderColor: '#FF4842'
    }
  }
}));
