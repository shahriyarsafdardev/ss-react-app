import { Box, Stack, styled, Tab, Tabs, Button, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { memo, useCallback, useMemo } from 'react';
import { trackEvent } from 'utils/eventTracking';

export const TOPICS = [
  'Data Analysis & Experimentation',
  'ML Systems',
  'Data Infrastructure',
  'Data Essentials'
];

export const HEADINGS = [
  'conducting data analysis & experimentation',
  'creating ML systems',
  'building data infrastructure',
  'wanting to learn about data essentials'
];

export const CurriculumTab = styled(Tab)(({ theme }) => ({
  justifyContent: 'space-around',
  marginRight: 0,
  letterSpacing: '1px',
  color: '#101658',
  fontWeight: 900,
  fontSize: '16px',
  textTransform: 'uppercase',
  '.MuiButtonBase-root .Mui-selected': {
    fontWeight: '700'
  }
}));

export const CurriculumTabsNavBar = styled(Tabs)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#fff',
  justifyContent: 'center',
  overflow: 'unset !important',
  [theme.breakpoints.between(900, 1000)]: {
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

export const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    padding: '0px 64px 30px 64px',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '20px 0px'
    }
  },
  coursesHeading: {
    color: '#082139',
    fontSize: '68px',
    lineHeight: '1.4',
    fontWeight: 900,
    [theme.breakpoints.down('md')]: {
      fontSize: '35px'
    }
  },
  headerText: {
    color: '#30364d',
    fontSize: '20px',
    textAlign: 'center'
  },
  coursesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#082139',
    backgroundImage: 'linear-gradient(189deg, #082139, rgba(116, 116, 208, 0.26))',
    color: '#fff'
  },
  coursesGrid: {
    minHeight: 'calc(100vh - 203px)',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      minHeight: 'calc(100vh - 175px)'
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 'calc(100vh - 165px)'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 230px)'
    }
  },
  purpleBackground: {
    background: 'linear-gradient(163.43deg, #29064C 11.47%, #9E5AD7 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px',
    width: '100% !important',
    [theme.breakpoints.down('md')]: {
      padding: '24px 20px'
    }
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '40px 50px',
    boxSizing: 'border-box',
    border: '1px solid #E2E8F0',
    textAlign: 'center',
    marginLeft: '16px',
    marginRight: '16px !important',
    [theme.breakpoints.up(1615)]: {
      marginRight: '33px !important'
    },
    [theme.breakpoints.down('md')]: {
      padding: '30px 20px'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0px auto !important',
      maxWidth: '420px !important'
    }
  },
  whiteBoxGrid: {
    display: 'grid',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px !important',
      maxWidth: '100% !important'
    }
  },
  courseTile: {
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    position: 'relative',
    padding: '20px 0px 16px 0px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    '&:hover > .descriptionHover': {
      top: 0,
      opacity: 1
    },
    overflow: 'hidden'
  },
  topicButton: {
    borderRadius: '30px',
    height: '48px',
    width: '380px',
    fontSize: '16px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#12125C',
      opacity: 1
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  font15: {
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'left',
    color: '#082139'
  },
  font13: {
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'left',
    color: '#1e293b'
  },
  courseName: {
    marginBottom: '20px',
    padding: '0px 20px',
    fontSize: '24px !important',
    textAlign: 'left',
    fontWeight: 900,
    color: '#082139',
    lineHeight: '32px'
  },
  instructorAvatar: {
    width: 56,
    height: 56,
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center'
    }
  },
  justifyMobileCenter: {
    maxWidth: '1280px',
    padding: '0px 40px',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  font24Headings: {
    fontSize: '24px',
    fontWeight: 700,
    marginTop: '0 !important'
  },
  pathList: {
    backgroundColor: '#F1F1FB',
    padding: '40px 24px',
    color: '#000',
    [theme.breakpoints.down('md')]: {
      padding: '40px 4px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '40px 20px'
    }
  },
  blueText: {
    color: '#4D4DcD'
  },
  achievementItem: {
    width: '23%'
  }
}));

export const CourseTileHover = memo(
  ({ handleTileClick, course }: { handleTileClick: Function; course: any }) => {
    const buttonText = useMemo(
      () => (!course?.registration_page_released ? 'Join the waitlist' : 'Learn more'),
      [course]
    );

    const handleClick = useCallback(() => {
      trackEvent(course, `All Courses Page - Course "${buttonText}" button clicked`, {
        'Course Name': course?.name,
        'Course ID': course?.id
      });
      handleTileClick();
    }, [course, buttonText, handleTileClick]);

    return (
      <Stack
        className="descriptionHover"
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          opacity: 0,
          backgroundColor: '#7474D0 !important',
          color: '#fff',
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          padding: '20px 20px 16px',
          justifyContent: 'space-between',
          transition: 'all .4s ease-out',
          overflow: 'hidden'
        }}
        onClick={() => handleClick()}
      >
        <Typography sx={{ textAlign: 'left' }}>{course?.short_description}</Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            width: '100%',
            borderBottom: '1px solid #fff',
            textAlign: 'left'
          }}
        >
          {buttonText}
        </Typography>
      </Stack>
    );
  }
);

export const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '35%',
  left: '45%',
  [theme.breakpoints.down('md')]: {
    top: '40%',
    left: '43%'
  }
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '5px',
  width: '100%'
}));

export const PageSection = styled(Stack)(({ theme }) => ({}));

export const PageInnerSection = styled(Stack)(({ theme }) => ({
  margin: 'auto',
  maxWidth: '1280px',
  padding: '100px 70px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '40px 30px'
  }
}));
export const CoursesInnerSection = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1280px',
  padding: '50px 0px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '20px 30px'
  }
}));

export const PathTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '3.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem'
  }
}));

export const AchievementHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '3.5rem',
  color: '#232361'
}));

export const AchievementDescription = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  textAlign: 'center',
  color: '#30364d'
}));

export const PathDescription = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px'
  }
}));

export const PathButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '10px',
  width: '30%',
  backgroundImage: 'linear-gradient(135deg, #7474d0 0.07%, #4d4dcd)',
  fontWeight: 900,
  fontSize: '18px',
  minWidth: '350px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    minWidth: 'unset'
  }
}));
