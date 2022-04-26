import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  mainHeading: {
    fontSize: '34px',
    lineHeight: '44px',
    letterSpacing: '1px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '24px',
      paddingRight: '24px'
    }
  },
  subHeading: {
    fontSize: '21px',
    lineHeight: '37px',
    textAlign: 'center',
    color: '#919EAB',
    marginTop: '15px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '24px',
      paddingRight: '24px'
    }
  },
  freeSessionForm: {
    marginTop: '48px',
    width: '75%'
  },
  btnSubmit: {
    width: '100%',
    paddingTop: '6px',
    paddingBottom: '6px'
  },
  btnContactUs: {
    width: '35%',
    paddingTop: '6px',
    paddingBottom: '6px',
    marginTop: '35px',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  }
}));
