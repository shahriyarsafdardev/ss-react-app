import { makeStyles } from '@material-ui/styles';
import { styled, Theme, Box, Tabs, Tab } from '@material-ui/core';
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
    marginTop: '2rem !important',
    boxShadow: 'none'
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
  font18Bold: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 'bold'
  },
  font20Bold: {
    fontSize: '20px',
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

export const VerticalLine = styled(Box)(({ theme }) => ({
  // borderLeft: '1px',
  // height: '70%',
  // width: '1px'
}));

export const ReferralTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: 'space-around',
  marginRight: 0,
  width: '20%',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

export const ReferralTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
  margin: '2rem 0',
  backgroundColor: '#F4F6F8',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  justifyContent: 'center',
  overflow: 'unset !important',
  [theme.breakpoints.down('sm')]: {
    button: {
      width: '30%',
      minWidth: 60,
      fontSize: 12
    },
    '.MuiTabs-flexContainer': {
      justifyContent: 'center'
    }
  },
  [theme.breakpoints.between(900, 1000)]: {
    justifyContent: 'space-evenly',
    paddingLeft: '10px',
    button: {
      width: '18%',
      minWidth: 30,
      fontSize: 15
    }
  },
  [theme.breakpoints.between(1200, 1300)]: {
    justifyContent: 'space-evenly',
    paddingLeft: '10px',
    button: {
      width: '18%',
      minWidth: 30,
      fontSize: 15
    }
  },
  [theme.breakpoints.between(600, 700)]: {
    justifyContent: 'space-evenly',
    paddingLeft: '10px',
    button: {
      width: '18%',
      minWidth: 30,
      fontSize: 15
    }
  },
  '.MuiTabs-flexContainer': {
    justifyContent: 'space-evenly'
  },
  button: {
    justifyContent: 'center',
    '&.css-pjf68w-MuiButtonBase-root-MuiTab-root': {
      paddingTop: '15px',
      marginRight: '0 !important'
    },
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main
    }
  }
}));
