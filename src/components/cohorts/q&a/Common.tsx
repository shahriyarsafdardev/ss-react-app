import { useState, useRef, memo } from 'react';
import { Icon } from '@iconify/react';
import cancel from '@iconify/icons-ic/cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';

// material
import { styled } from '@material-ui/core/styles';

import {
  Box,
  MenuItem,
  CircularProgress,
  IconButton,
  Container,
  Stack,
  Button,
  Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuPopover from '../../MenuPopover';

export const QuestionContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  paddingBottom: '10px',
  marginBottom: '12px',
  position: 'relative'
}));

export const ProgressBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 30
}));

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 8,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

export const CurrentStep = styled('span')(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontFamily: 'Public Sans'
}));

export const CompleteBox = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '400px',
  fontWeight: 600
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: 11,
  flex: 1,
  '&.right-btn': {
    marginLeft: '30px !important',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      marginLeft: '0 !important'
    }
  },
  '&.btn-add-recording': {
    margin: '10px 0px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  '&.btn-close': {
    width: '60%',
    flex: 'none',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
  [theme.breakpoints.up('md')]: {
    width: '100%'
  }
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '10px 0px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column-reverse'
  }
}));

export const QuestionBox = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: '280px',
  padding: '20px',
  background: 'linear-gradient(180deg, #F7FAFC 0%, rgba(247, 250, 252, 0) 1)',
  border: '2px solid #DCE0E4',
  borderRadius: '8px',
  overflowY: 'auto',

  [theme.breakpoints.down('md')]: {
    display: 'block',
    height: '3100px'
  }
}));

export const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#CD4D56',
  width: '100%',
  padding: '10px 125px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    padding: '10px'
  }
}));

export const RecorderBox = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: '280px',
  padding: '20px',
  background: 'linear-gradient(180deg, #F7FAFC 0%, rgba(247, 250, 252, 0) 1)',
  border: '2px dashed #DCE0E4',
  borderRadius: '8px',
  marginLeft: '30px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
    width: '100%',
    height: '240px',
    marginLeft: '0px'
  }
}));

export const SessionTitle = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  minHeight: '50px',
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}));

export const MainStack = styled(Stack)(({ theme }) => ({
  height: '310px',
  width: '100%',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '25px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
    height: '270px',
    marginLeft: '0px'
  }
}));

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.newQuestion': {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  '&.filters': {
    height: '250px',
    marginTop: '20px'
  },
  '&.about': {
    height: '340px'
  }
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20%'
}));

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);

export const DeleteOption = memo(({ handleDelete }: { handleDelete: Function }) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        ref={menuRef}
      >
        <MoreVertIcon />
      </IconButton>
      <MenuPopover
        open={open}
        anchorEl={menuRef.current}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ width: 200 }}
      >
        <MenuItem
          id="comment-settings"
          onClick={() => handleDelete()}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={cancel}
            sx={{
              mr: 2,
              width: 24,
              height: 24
            }}
          />
          Delete
        </MenuItem>
      </MenuPopover>
    </Box>
  );
});

export const useStyles = makeStyles((theme: Theme) => ({
  uploadQuestionBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  askerDetails: {
    fontSize: '0.8rem',
    fontWeight: 400,
    color: '#212B36',
    lineHeight: '16px',
    marginTop: '5px'
  },
  aboutDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '295px'
  },
  questionVideo: {
    width: '100%',
    height: '150px',
    borderRadius: '8px',
    marginTop: '10px'
  },
  questionLabel: {
    position: 'absolute',
    top: '15px',
    background: 'white',
    fontWeight: 600,
    padding: '0px 5px'
  }
}));
