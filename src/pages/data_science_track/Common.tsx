import { Box, Stack, styled, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    minHeight: 'calc(100vh - 202px)',
    [theme.breakpoints.down('lg')]: {
      minHeight: 'calc(100vh - 174px)'
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 'calc(100vh - 164px)'
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
  courseTile: {
    height: '210px',
    width: '400px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    position: 'relative',
    padding: '20px 20px 16px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
      borderRadius: '8px !important',
      height: '250px',
      width: '425px'
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
  }
}));

export const SessionSummaryBox = styled(Box)(() => ({
  fontWeight: 'normal',
  fontSize: 15,
  lineHeight: '27px',
  marginTop: '24px',
  ul: {
    paddingLeft: '30px'
  }
}));

export const SessionSummary = ({ innerContent }: { innerContent: string }) => (
  <SessionSummaryBox dangerouslySetInnerHTML={{ __html: innerContent }} />
);

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
