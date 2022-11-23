import { styled, Tab, Tabs } from '@material-ui/core';

export const TOPICS = [
  'DATA ANALYSIS & EXPERIMENTATION',
  'ML Systems',
  'Data Infrastructure',
  'Data Essentials'
];

export const CurriculumTab = styled(Tab)(({ theme }) => ({
  justifyContent: 'space-around',
  marginRight: 0,
  width: '20%',
  color: '#101658',
  fontWeight: 700,
  fontSize: '16px',
  textTransform: 'uppercase',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

export const CurriculumTabsNavBar = styled(Tabs)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#fff',
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
