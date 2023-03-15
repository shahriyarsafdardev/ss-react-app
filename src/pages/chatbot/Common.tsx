import { Theme, styled, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThreeDots } from 'react-loader-spinner';

export type Resource = {
  id: string;
  thumbnail_image: string;
  name: string;
  url: string;
  resource_type: string;
  instructor_names: string;
  text: string;
};

export type Message = {
  role: string;
  content: string;
  resources?: Resource[];
};

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
    justifyContent: 'space-between',
    boxShadow: '0px 0px 50px 50px #2A1D4D'
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
  resourceCard: {
    background: '#ffffff',
    boxShadow: '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)',
    borderRadius: '8px',
    minWidth: '48%',
    maxWidth: '70%',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      maxWidth: '90%'
    }
  },
  resourceDescriptionStack: {
    height: '100%',
    padding: '15px 30px'
  },
  resourceName: {
    fontSize: '14px',
    lineHeight: 1.2,
    color: '#212B36'
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

export const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: '7px 0 0 7px',
  width: '25%',
  minWidth: '150px',
  [theme.breakpoints.down('md')]: {
    display: 'none !important'
  }
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.2,
  cursor: 'pointer',
  display: 'inline !important',
  color: '#43009A !important',
  textDecoration: 'underline'
}));
