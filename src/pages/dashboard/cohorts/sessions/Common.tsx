import {
  Tabs,
  Tab,
  Box,
  FormControl,
  Typography,
  Button,
  Theme,
  CircularProgress,
  Stack,
  Backdrop,
  Container,
  Paper
} from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import Scrollbar from '../../../../components/Scrollbar';
import { MIconButton } from '../../../../components/@material-extend';

const DRAWER_WIDTH = 260;
export const useStyles = makeStyles((theme: Theme) => ({
  hidden: {
    display: 'none'
  },
  shown: {
    display: 'block'
  },
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

type StyledSettingsBoxProps = {
  theme?: any;
  open: boolean;
};

export const StyledSettingsBox = styled(Box)(({ theme, open }: StyledSettingsBoxProps) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    top: 12,
    bottom: 12,
    right: 0,
    position: 'fixed',
    zIndex: 2001,
    ...(open && { right: 12 })
  }
}));

export const SessionListMobileConatiner = styled(Box)(() => ({
  padding: 5
}));

export const TooltipContainer = styled(Box)(({ theme }) => ({
  left: -44,
  top: '50%',
  position: 'absolute',
  backgroundColor: '#fff',
  borderRadius: '24px 0 16px 24px',
  boxShadow: theme.customShadows.z12,
  padding: 4,
  paddingLeft: 4,
  paddingRight: 4,
  marginTop: -24,
  color: '#212B36'
}));

export const StyledIconButton = styled(MIconButton)(({ theme }) => ({
  padding: 0,
  width: 40,
  height: 40,
  transition: theme.transitions.create('all'),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  }
}));

export const StyledPaper = styled(Paper)(({ theme, open }: StyledSettingsBoxProps) => ({
  height: '100%',
  width: '0',
  overflow: 'hidden',
  boxShadow: theme.customShadows.z24,
  transition: theme.transitions.create('width'),
  ...(open && { width: DRAWER_WIDTH })
}));

export const StyledScrollBar = styled(Scrollbar)(() => ({
  height: '100%'
}));

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

export const SessionsContainer = styled(Stack)(({ theme }) => ({
  marginBottom: '50px',
  borderTop: '1px solid #E5E5E5',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

export const SessionListDesktopContainer = styled(Box)(({ theme }) => ({
  width: '280px !important',
  borderRight: '1px solid #E5E5E5',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginBottom: '30px',
  justifyContent: 'space-between',
  background: '#FAFAFC',
  borderRadius: '8px',
  padding: '25px 15px'
}));

export const StyledImageContainer = styled(Box)(({ theme }) => ({
  width: '30%',
  margin: 'auto 0',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export const SessionTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: 'space-around',
  marginRight: 0,
  width: '20%',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

export const SessionTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
  margin: '16px 0px 14px 0',
  backgroundColor: '#F4F6F8',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  justifyContent: 'center',
  overflow: 'unset !important',
  [theme.breakpoints.down('sm')]: {
    button: {
      width: '30%',
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

export const FeedbackButton = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: '#D0F2FF',
  display: 'flex',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '25px',
  '.img-content': {
    width: '40px',
    [theme.breakpoints.down('sm')]: {
      width: '80px'
    }
  }
}));

export const Wrapper = styled(Container)(({ theme }) => ({
  maxWidth: '1000px',
  maxHeight: '100%',
  overflowY: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '10px'
  }
}));

export const SessionsBoardContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: 0
  }
}));

export const StyledVideoPreview = styled('video')(({ theme }) => ({
  width: '100%',
  borderRadius: '20px'
}));

export const SessionTitle = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  minHeight: '50px',
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

export const SessionNumber = styled('span')(({ theme }) => ({
  fontWeight: 400,
  minHeight: '50px',
  marginRight: 1,
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

export const RecordingSlelectForm = styled(FormControl)(({ theme }) => ({
  marginTop: '15px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '25% 0'
}));

export const VideoPlayerWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingBottom: '56.25% !important',
  paddingTop: '0px !important',
  height: '0px !important',
  overflow: 'hidden !important',
  width: '100%',
  maxWidth: '100%',
  '& iframe': {
    position: 'absolute',
    top: '0px !important',
    left: '0px !important',
    width: '100% !important',
    height: '100% !important'
  },
  '& div': {
    height: '100% !important',
    width: '100vw !important'
  }
}));

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);

export const StyledCard = styled(Stack)(({ theme }) => ({
  height: '650px',
  width: '95%',
  maxWidth: '1200px',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

export const InstructorMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px',
  borderRadius: '16px',
  width: '45%',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '30px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  textAlign: 'center',
  maxWidth: '70%'
}));

export const StyledImage = styled('img')(({ theme }) => ({
  width: '275px',
  height: '150px'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '5px 70px',
  marginTop: '30px !important'
}));

export const StyledTypographyContent = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px'
}));

export const StyledImageContent = styled(LazyLoadImage)(({ theme }) => ({
  marginBottom: '10px',
  width: '100px',
  height: 'auto'
}));

export const StyledStackContent = styled(Stack)(({ theme }) => ({
  width: '25%',
  margin: 'auto',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    margin: '30px auto',
    width: '90%'
  }
}));
