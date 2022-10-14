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
  minHeight: '38vh',
  [theme.breakpoints.down('md')]: {
    minHeight: '320px'
  }
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  height: '35px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
export const StyledNextButton = styled(LoadingButton)(({ theme }) => ({
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
    padding: '100px',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/payment-detail-bg.svg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#FAFAFC',
    height: '90vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '100px 20px'
    }
  },
  paymentForm: {
    padding: '100px',
    height: '90vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '120px 20px'
    }
  }
}));
