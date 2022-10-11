import { FormControl, TextField, Button, Stack, styled, Box, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Page from 'components/Page';

export const StyledBackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 110,
  left: 40,
  [theme.breakpoints.down('md')]: {
    top: 150,
    left: 10
  }
}));

export const StyledMembersList = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '39px 28px',
  marginBottom: '50px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px 5px'
  }
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #12125C',
  padding: '39px 28px',
  marginBottom: '50px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  height: '40px',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  width: '270px',
  height: '40px',
  borderRadius: '30px',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center'
}));

export const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  position: 'relative'
}));
