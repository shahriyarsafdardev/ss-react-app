import { styled, Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '45%'
}));

export const useStyles = makeStyles((theme: Theme) => ({
  rootContainer: {
    padding: '50px !important',
    [theme.breakpoints.down('sm')]: {
      padding: '20px !important'
    }
  },
  viewOnlyBox: {
    height: '100%',
    width: '90%',
    position: 'absolute',
    top: 0,
    left: '5%'
  }
}));
