import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';

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
    width: '20px',
    height: '20px'
  },
  openItemLink: {
    position: 'absolute',
    bottom: '24px',
    borderRadius: '20px',
    padding: '6px 60px',
    [theme.breakpoints.down('md')]: {
      position: 'inherit',
      bottom: '0px',
      marginTop: '20px'
    }
  }
}));

export const ResourceBox = styled(Box)(({ theme }) => ({
  width: '50%',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  display: 'flex',
  gap: '32px',
  margin: '32px 0px',
  alignItems: 'strech',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column-reverse'
  }
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  width: '60%',
  padding: '24px 0px 40px 24px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
