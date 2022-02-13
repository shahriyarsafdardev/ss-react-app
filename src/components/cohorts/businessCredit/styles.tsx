import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  sectionContainer: {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'space-between',
    marginBottom: '40px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  sectionCard: {
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
      padding: '24px 10px'
    }
  },
  width50: {
    width: '49%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  mt20: {
    marginTop: '20px'
  },
  creditsModal: {
    width: '50% !important',
    margin: 'auto'
  },
  yearLine: {
    color: '#C4C4C4',
    borderBottom: '1px solid #E3E7EA',
    fontSize: '16px'
  },
  rowContainer: {
    marginTop: '15px',
    height: '50vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
    '&::-webkit-scrollbar-thumb': { display: 'none' }
  },
  upcomingContainer: {
    marginTop: '10px',
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
    '&::-webkit-scrollbar-thumb': { display: 'none' }
  },
  dateBox: {
    height: 'fit-content',
    backgroundColor: 'rgba(77, 77, 205, 0.05)',
    textAlign: 'center',
    fontSize: '12px !important',
    lineHeight: '17px !important',
    padding: '10px',
    borderRadius: '8px',
    '&>p': {
      color: '#70767C',
      fontWeight: 300,
      textTransform: 'uppercase',

      '&:first-child': {
        fontWeight: 600
      }
    }
  },
  historyRow: {
    display: 'flex',
    padding: '15px 0',
    borderBottom: '1px solid #E3E7EA'
  },
  textSmall: {
    paddingBottom: '2px',
    fontSize: '14px',
    color: '#919EAB',
    fontWeight: 400,
    '& > span': {
      color: '#565455',
      fontWeight: 600
    },
    '& > a': {
      color: '#919EAB'
    }
  },
  notificationText: {
    height: '25px',
    backgroundColor: 'rgba(77, 77, 205, 0.05)',
    color: '#4D4DCD',
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 600
  },
  approveBtn: {
    display: 'flex',
    padding: '13px 0 0 0',
    justifyContent: 'center'
  },
  buttonIcon: {
    marginRight: 5,
    width: 24,
    height: 24,
    cursor: 'pointer'
  },
  boxTwo: {
    backgroundColor: 'rgba(77, 77, 205, 0.02)',
    padding: '10px 20px',
    marginBottom: '10px'
  },
  invoiceLink: {
    marginLeft: 'auto',
    textDecoration: 'none',
    fontSize: '14px'
  }
}));
