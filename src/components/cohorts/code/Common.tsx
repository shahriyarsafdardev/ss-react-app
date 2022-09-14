import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#E2E8F0',
    width: '100%',
    padding: '15px'
  },
  openButton: {
    padding: '0 30px',
    borderRadius: '0px',
    fontSize: '18px'
  },
  checkedBox: {
    backgroundColor: '#E2E8F0'
  },
  unCheckedBox: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)'
  },
  font18: {
    fontSize: '18px'
  },
  ml60: {
    marginLeft: '60px'
  },
  checkbox: {
    padding: '0px',
    marginRight: '8px'
  },
  linkIcon: {
    marginLeft: '5px',
    width: '24px',
    height: '24px'
  }
}));
