import { Button, Stack, styled, Box, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

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

export const StyledDetailsStack = styled(Stack)(({ theme }) => ({
  color: 'white',
  padding: '100px 50px 200px 50px',
  [theme.breakpoints.down('md')]: {
    minHeight: '320px'
  }
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  height: '35px',
  width: '100%',
  marginTop: '32px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: '0px'
  }
}));
export const StyledNextButton = styled(Button)(({ theme }) => ({
  width: '270px',
  height: '40px',
  borderRadius: '30px',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '15px'
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

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const PaymentRootStyle = styled(Page)(({ theme }) => ({
  minHeight: '90vh',
  maxWidth: '1430px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('md')]: {
    marginTop: '45px'
  }
}));

export const StyledHeading = styled(Typography)(({ theme }) => ({
  color: '#475569',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}));

export const useStyles = makeStyles((theme: Theme) => ({
  paymentContainer: {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    padding: '0px'
  },
  noPadding: {
    paddingTop: '93px',
    paddingBottom: '0px'
  },
  font20: {
    fontSize: '20px !important',
    lineHeight: '25.2px'
  },
  font26: {
    fontSize: '26px !important',
    lineHeight: '26px'
  },
  font18: {
    fontSize: '18px !important',
    lineHeight: '24px'
  },
  colorGrey: {
    color: '#475569'
  },
  fontBolder: {
    fontWeight: 'bolder'
  },
  fontBold: {
    fontWeight: 'bold'
  },
  paymentInfo: {
    width: '50%',
    backgroundColor: '#FAFAFC',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  topUpContainer: {
    height: '100%',
    width: '50%',
    backgroundColor: '#FAFAFC',
    marginTop: '92px',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  topUp: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/topup-purple-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topUpButton: {
    width: '80%',
    backgroundColor: '#864FBC',
    marginTop: '56px !important'
  },
  grainedBackground: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/purple-bg-desktop.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/purple-bg-mbl.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  },
  paymentForm: {
    padding: '100px',
    height: '90vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '64px 20px',
      height: '75vh'
    },
    [theme.breakpoints.down('sm')]: {
      height: '95vh'
    }
  },
  fullWidthCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '600px'
  },
  mobilePosition: {
    padding: '30px',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      left: 0,
      backgroundColor: '#FAFAFC'
    }
  }
}));
