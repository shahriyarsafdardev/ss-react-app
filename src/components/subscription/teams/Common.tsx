import { Theme } from '@material-ui/core/styles';
import { Stack, Typography, Button, Card, styled } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  [theme.breakpoints.down('md')]: {
    margin: '40px 0px'
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    marginBottom: '10px'
  }
}));

export const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  height: '92px',
  position: 'absolute',
  padding: '24px 40px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #CBD5E1',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: '140px',
    alignItems: 'flex-start',
    padding: '16px'
  }
}));

export const StyledLogo = styled('img')(({ theme }) => ({
  width: '130px',
  position: 'absolute',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    position: 'unset',
    margin: 'auto',
    marginBottom: '20px'
  }
}));

export const StyledHeading = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    marginTop: '0px !important',
    marginBottom: '15px !important'
  }
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  marginBottom: 0,
  borderRadius: '30px',
  height: '40px',
  width: '100%'
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  padding: '24px',
  width: '45%',
  height: '330px',
  margin: 'auto',
  justifyContent: 'center',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: '18px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '12px'
  },
  text: {
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    marginBottom: '20px',
    height: '45%',
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px'
    }
  },
  icon: {
    margin: 'auto',
    marginBottom: '16px'
  }
}));
