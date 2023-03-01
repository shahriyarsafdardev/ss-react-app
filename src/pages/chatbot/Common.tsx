import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  rootStack: {
    padding: '40px',
    paddingBottom: '0px !important',
    height: '100%',
    maxWidth: '1200px',
    maxHeight: 'calc(100vh - 116px)',
    overflow: 'auto',
    margin: '0px auto',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '40px 20px',
      paddingBottom: '0px !important'
    }
  },
  messageCard: {
    width: '48%',
    padding: '12px',
    borderRadius: '8px',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  },
  questionCardBox: {
    margin: '0px auto',
    marginTop: 'auto !important',
    position: 'sticky',
    bottom: 0,
    width: '100%',
    padding: '20px 0px 40px 0px',
    backdropFilter: 'blur(5px)',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0px'
    }
  },
  questionCard: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    color: '#000',
    minHeight: '108px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  questionInput: {
    border: '0px',
    color: '#000',
    width: '90%',
    maxWidth: '90%',
    overflow: 'auto',
    fontSize: '16px',
    '&:focus-visible': {
      outline: 'none'
    }
  }
}));
