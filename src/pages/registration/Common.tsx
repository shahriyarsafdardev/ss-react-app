import { Box, styled, Theme } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import Page from 'components/Page';

export const useStyles = makeStyles((theme: Theme) => ({
  paymentData: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '120px',
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
  inquiryTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '120px',
    [theme.breakpoints.down('lg')]: {
      padding: '30px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '20px',
      height: 'fit-content'
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
  formContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    maxWidth: '600px',
    padding: '5%',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  purpleBackground: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/Purple_BG.png')`,
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
  inquiryFont: {
    color: '#334155',
    fontWeight: 600,
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
  },
  paddingHorizontal40: {
    paddingLeft: '40px',
    paddingRight: '40px'
  },
  submitButton: {
    height: '40px',
    borderRadius: '30px'
  },
  paymentOptionButton: {
    marginTop: 'auto !important'
  },
  whiteStackCard: {
    backgroundColor: 'white',
    padding: '30px',
    paddingBottom: '15px',
    borderRadius: '16px',
    width: '31%',
    color: '#000',
    [theme.breakpoints.down('md')]: {
      width: '90%'
    }
  }
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const Logo = styled('img')(({ theme }) => ({
  width: '9%',
  position: 'absolute',
  top: '4%',
  left: '2%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: '24px',
  borderRadius: '30px',
  height: '40px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    height: '48px'
  }
}));

export const PaymentRootStyle = styled(Page)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  marginLeft: '0',
  marginRight: '0',
  [theme.breakpoints.down('md')]: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/Purple_BG.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  }
}));
