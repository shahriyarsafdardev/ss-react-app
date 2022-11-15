import { makeStyles } from '@material-ui/styles';
import { styled, Theme, Box } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

export const useStyles = makeStyles((theme: Theme) => ({
  purpleBackground: {
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '67px 100px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '50px 30px'
    }
  },
  greyBackground: {
    background: '#FAFAFC',
    color: '#071A33',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginTop: '2rem !important'
  },
  font22Bold: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  font22: {
    fontSize: '22px',
    lineHeight: '30px',
    marginTop: '15px'
  },
  greyBGHeading40: {
    fontSize: '40px',
    fontWeight: 'bold'
  },
  font18: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 'bold'
  },
  font16: {
    fontSize: '16px',
    lineHeight: '20px',
    marginTop: '15px'
  },
  font16Bold: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 'bold',
    marginTop: '15px'
  },
  formCard: {
    color: '#071A33',
    marginTop: '2rem',
    padding: '50px',
    textAlign: 'center',
    border: 'solid 1px rgba(145, 158, 171, 0.5)'
  }
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: '8px',
  borderRadius: '30px',
  height: '48px',
  minWidth: '300px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '48px'
  }
}));

export const StyledDiv = styled(Box)(({ theme }) => ({
  height: '20px !important',
  width: '20px !important',
  minWidth: '20px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '8px'
}));
