import { Stack, styled, Typography, Theme, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

export const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: '#F6F7F8',
  padding: '50px',
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    padding: '24px'
  }
}));

export const StyledHeading = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#101658'
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
  cursor: 'pointer',
  color: '#101658'
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  width: '220px',
  borderRadius: '30px',
  [theme.breakpoints.down('md')]: {
    width: '80%'
  }
}));

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: '50px',
    height: '50px',
    border: '3px solid white',
    margin: '0px 32px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '0px',
      marginBottom: '5px'
    }
  },
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
  },
  gradientBackground: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/purple-bg-credit.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '30px',
    borderRadius: '8px'
  },
  subscriptionDetail: {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}));
