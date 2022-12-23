import { Box, styled, Theme, Input, Stack, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import Page from 'components/Page';
import { memo } from 'react';

export const useStyles = makeStyles((theme: Theme) => ({
  paymentData: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    padding: '120px',
    [theme.breakpoints.down('lg')]: {
      padding: '60px'
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
  wrapperPaymentStack: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  paymentStack: {
    width: '100%',
    minHeight: '100% !important',
    [theme.breakpoints.down('md')]: {
      minHeight: '100% !important'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '100% !important'
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
  saleBanner: {
    background: 'linear-gradient(180deg, #9D4EDD 0%, #212B36 179.63%)',
    backgroundSize: 'cover',
    backfaceVisibility: 'hidden',
    backgroundPosition: 'center',
    color: 'white',
    padding: '10px',
    height: '84px',
    textAlign: 'center',
    width: '100%',
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      height: '104px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '125px'
    }
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
  },
  blackFridayText: {
    fontSize: '15px',
    fontWeight: 'bold',
    background: '-webkit-linear-gradient(94.23deg, #913DFF -4.78%, #43009A 53.44%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  whiteFridayText: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff',
    [theme.breakpoints.up('md')]: {
      background: '-webkit-linear-gradient(94.23deg, #913DFF -4.78%, #43009A 53.44%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '45%'
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

export const BannerLogo = styled('img')(({ theme }) => ({
  width: '9%',
  position: 'absolute',
  top: '120px',
  left: '2%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
export const StyledCheckIcon = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
  marginRight: '8px'
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: '8px',
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

export const InputAmount = memo(
  ({ amount, onChange, minValue }: { amount: number; onChange: Function; minValue: number }) => (
    <Stack direction="row" justifyContent="center" spacing={1}>
      <Typography variant="h4">$</Typography>
      <Input
        disableUnderline
        size="small"
        value={amount}
        onChange={(e) => onChange(e?.target?.value)}
        onBlur={(e) =>
          onChange(parseInt(e?.target?.value, 10) < minValue ? minValue : e?.target?.value)
        }
        inputProps={{ min: minValue, type: 'number' }}
        sx={{
          typography: 'h4',
          '& input': {
            p: 0,
            color: '#fff',
            textAlign: 'center',
            width: `${amount?.toString()?.length + 1}ch`
          }
        }}
      />
      <Typography variant="h4">USD</Typography>
    </Stack>
  )
);

export function SaleBanner() {
  const classes = useStyles();

  return (
    <Stack className={classes.saleBanner} alignItems="center" justifyContent="center">
      <Typography>
        🚨 <b>End of Year Deal</b> 🚨 Get $200 towards your next purchase by purchasing a course
        through an individual or team subscription | Expires Jan 1 2023
      </Typography>
    </Stack>
  );
}
