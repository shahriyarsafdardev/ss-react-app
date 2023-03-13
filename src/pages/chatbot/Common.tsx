import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThreeDots } from 'react-loader-spinner';

export const useStyles = makeStyles((theme: Theme) => ({
  rootPage: {
    width: '100%',
    backgroundImage: `url(
          'https://sphere-public.s3.eu-west-2.amazonaws.com/chatbot-bg.png'
        )`,
    backgroundSize: 'cover',
    height: 'calc(100vh - 92px)',
    overflow: 'auto',
    marginTop: '-24px',
    [theme.breakpoints.down('lg')]: {
      height: 'calc(100vh - 64px)'
    }
  },
  rootStack: {
    padding: '40px',
    paddingBottom: '0px !important',
    height: '100%',
    maxWidth: '1200px',
    margin: '0px auto',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '40px 20px',
      paddingBottom: '0px !important'
    }
  },
  messageCard: {
    minWidth: '48%',
    maxWidth: '70%',
    padding: '12px',
    borderRadius: '8px',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      maxWidth: '90%'
    }
  },
  questionCardBox: {
    margin: '0px auto',
    marginTop: 'auto !important',
    position: 'sticky',
    bottom: 0,
    width: '100%',
    padding: '30px 0px',
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
    fontFamily: 'Public Sans,sans-serif',
    '&:focus-visible': {
      outline: 'none'
    }
  },
  resourceGrid: {
    width: '260px !important',
    height: '100%',
    maxHeight: '270px',
    paddingRight: '16px',
    paddingBottom: '16px'
  },
  resourceStack: {
    borderRadius: '7px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    height: '100%'
  },
  resourceName: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: 1.1,
    color: '#000',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3
  },
  resourceInstructorNames: {
    fontWeight: 600,
    fontSize: '11px',
    color: '#A6AEB7'
  },
  darkImage: {
    filter: 'brightness(0.7)'
  }
}));

export const DotsLoader = () => (
  <ThreeDots
    height="30"
    width="80"
    radius="9"
    color="#fff"
    ariaLabel="three-dots-loading"
    visible={true}
    wrapperStyle={{ margin: '20px auto 30px auto', width: 'fit-content' }}
  />
);
