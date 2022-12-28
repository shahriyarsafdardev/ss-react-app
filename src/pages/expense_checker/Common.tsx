import { Box, styled, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Page from 'components/Page';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const useStyles = makeStyles((theme: Theme) => ({
  paymentData: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '100px',
    [theme.breakpoints.down('lg')]: {
      padding: '30px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '60px',
      height: 'fit-content'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  wrapperStack: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  fullWidthCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  purpleBackground: {
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  },
  heading: {
    fontSize: '32px',
    textAlign: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px'
    }
  },
  toggleFont: {
    color: '#000',
    [theme.breakpoints.down('md')]: {
      color: '#fff'
    }
  },
  whiteFont: {
    color: '#fff'
  },
  textCenter: {
    textAlign: 'center'
  },
  enrollButton: {
    borderRadius: '30px',
    [theme.breakpoints.down('md')]: {
      backgroundColor: '#fff',
      color: '#12125C',
      marginTop: '50px !important'
    }
  }
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const Logo = styled(LazyLoadImage)(({ theme }) => ({
  width: '9%',
  position: 'absolute',
  top: '4%',
  left: '2%',
  [theme.breakpoints.down('md')]: {
    width: '30%',
    top: '3%',
    left: '6%'
  }
}));

export const PaymentRootStyle = styled(Page)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  marginLeft: '0',
  marginRight: '0',
  [theme.breakpoints.down('md')]: {
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  }
}));
