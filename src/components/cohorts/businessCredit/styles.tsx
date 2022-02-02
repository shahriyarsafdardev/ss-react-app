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
    height: '300px',
    overflowY: 'scroll'
  },
  dateBox: {
    width: '42px',
    height: '46px',
    backgroundColor: 'rgba(77, 77, 205, 0.05)',
    textAlign: 'center',
    borderRadius: '4px',
    '&>p': {
      color: '#70767C',
      lineHeight: '23px',
      fontWeight: 300,
      textTransform: 'uppercase',

      '&:first-child': {
        fontWeight: 600
      }
    }
  },
  historyRow: {
    display: 'flex',
    padding: '5px 0'
  },
  textSmall: {
    paddingBottom: '10px',
    fontSize: '14px',
    color: '#919EAB',
    fontWeight: 400,
    '& > span': {
      color: '#4D4DCD',
      fontWeight: 600
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
    borderTop: '1px solid #E3E7EA',
    padding: '13px 0 0 0',
    justifyContent: 'center',
    '& > button': {
      border: '1px solid #4d4dcd',
      padding: '5px 30px'
    }
  },
  boxTwo: {
    backgroundColor: 'rgba(77, 77, 205, 0.02)',
    padding: '10px 20px',
    marginBottom: '10px'
  }
}));
