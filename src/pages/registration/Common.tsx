import { Box, styled, Theme, Input, Stack, Typography } from '@material-ui/core';
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
    height: '48px',
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
    height: '48px',
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
    width: '30%',
    color: '#000',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  optionsStack: {
    marginBottom: '40px !important',
    [theme.breakpoints.down('md')]: {
      marginBottom: '15px !important'
    }
  },
  paymentSelectionAvatar: {
    width: '72px',
    height: '72px',
    border: '1px solid #fff',
    marginX: 'auto',
    [theme.breakpoints.down('md')]: {
      marginTop: '80px'
    }
  },
  counterButton: {
    borderRadius: '50%',
    border: '1px solid #fff',
    color: '#fff',
    cursor: 'pointer',
    minWidth: '35px',
    minHeight: '35px'
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
  height: '48px',
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
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  }
}));

export const InputAmount = ({ amount, onChange }: { amount: number; onChange: Function }) => (
  <Stack direction="row" justifyContent="center" spacing={1}>
    <Typography variant="h4">$</Typography>
    <Input
      disableUnderline
      size="small"
      value={amount}
      onChange={(e) => onChange(e?.target?.value)}
      inputProps={{ min: 0, type: 'number' }}
      sx={{
        typography: 'h4',
        '& input': {
          p: 0,
          color: '#fff',
          textAlign: 'center',
          width: `${amount?.toString()?.length}ch`
        }
      }}
    />
    <Typography variant="h4">USD</Typography>
  </Stack>
);
