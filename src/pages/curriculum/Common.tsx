import { Box, Stack, styled, Tab, Tabs, Button, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
  width: '20%',
  color: '#101658',
  fontWeight: 700,
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
  [theme.breakpoints.down('sm')]: {
    button: {
      width: '25%',
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

export const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    padding: '30px 64px',
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
    [theme.breakpoints.down('md')]: {
      fontSize: '38px'
    }
  },
  headerText: {
    color: '#30364d',
    fontSize: '20px',
    textAlign: 'center'
  },
  coursesContainer: {
    padding: '64px 72px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#082139',
    backgroundImage: 'linear-gradient(189deg, #082139, rgba(116, 116, 208, 0.26))',
    color: '#fff',

    [theme.breakpoints.down('md')]: {
      padding: '40px 38px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '24px 20px'
    }
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
    padding: '16px',
    boxSizing: 'border-box',
    border: '1px solid #E2E8F0',
    textAlign: 'center',
    margin: '0px 12px',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px',
      margin: 0
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
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  font15: {
    fontSize: '15px',
    fontWeight: 500
  },
  font13: {
    fontSize: '13px',
    fontWeight: 300
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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
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
      padding: '40px 8px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '40px 20px'
    }
  }
}));

export const CourseTileHover = ({
  handleTileClick,
  course
}: {
  handleTileClick: Function;
  course: any;
}) => {
  const buttonText = () => (course?.wait_listed ? 'Join the waitlist' : 'Learn more');

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
      onClick={() => handleTileClick()}
    >
      <Typography>{course?.description}</Typography>
      <Typography sx={{ fontWeight: 'bold', width: '100%', borderBottom: '1px solid #fff' }}>
        {buttonText()}
      </Typography>
    </Stack>
  );
};

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
