import { makeStyles } from '@material-ui/styles';
import { styled, Theme, Box, Tabs, Tab } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

export const useStyles = makeStyles((theme: Theme) => ({
  purpleContainer: {
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '67px 100px',
    textAlign: 'center',
    marginTop: '2rem',
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
    boxShadow: 'none',
    border: 'solid 1px rgba(145, 158, 171, 0.5)'
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
    marginTop: '3rem',
    padding: '40px',
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
    minWidth: '100%',
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
  borderLeft: '2px solid #CBD5E1',
  height: '100px !important',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const NavbarTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: 'space-around',
  marginRight: 0,
  width: '20%',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

export const TabsNavBar = styled(Tabs)(({ theme }) => ({
  width: '100%',
  margin: '2rem 0',
  backgroundColor: '#F4F6F8',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  justifyContent: 'center',
  overflow: 'unset !important',
  [theme.breakpoints.down('sm')]: {
    button: {
      width: '25%',
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

export const getColor = (status: String) => {
  switch (status.toLocaleLowerCase()) {
    case 'credit received':
      return '#229A16';
    case 'enrolled':
      return '#B78103';
    case 'invited':
      return '#637381';
    case 'redeemed':
      return '#0C53B7';
    default:
      return '#000';
  }
};

export const getBackgroundColor = (status: String) => {
  switch (status.toLocaleLowerCase()) {
    case 'credit received':
      return 'rgba(84, 214, 44, 0.16)';
    case 'enrolled':
      return 'rgba(255, 193, 7, 0.16)';
    case 'invited':
      return 'rgba(145, 158, 171, 0.16)';
    case 'redeemed':
      return 'rgba(24, 144, 255, 0.16)';
    default:
      return '#fff';
  }
};
