import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  styledText: {
    color: '#64748B',
    fontSize: '14px',
    lineHeight: '150%'
  },
  parentStack: {
    backgroundColor: '#FAFAFC',
    padding: '32px',
    borderRadius: '8px',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '32px 16px'
    }
  },
  detailsImage: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  greyLink: {
    textDecoration: 'underline',
    color: '#64748B',
    fontWeight: 600
  },
  styledButton: {
    height: '48px',
    color: '#475569',
    borderRadius: '30px'
  },
  timestampButton: {
    borderRadius: '20px',
    lineHeight: '120%',
    height: '40px'
  },
  recordingNotAvailableText: {
    color: '#64748B',
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 16px',
      marginBottom: '16px !important'
    }
  }
}));
