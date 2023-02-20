import { Box, Stack, styled, Button, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { memo, useCallback, useMemo, useContext } from 'react';

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
  coursesHeader: {
    padding: '77px 92px',
    height: '226px',
    backgroundColor: '#F1F1FB',
    [theme.breakpoints.down('md')]: {
      padding: '40px 30px'
    }
  },
  coursesHeaderText: {
    fontSize: '48px',
    fontWeight: 600,
    color: '#101658',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px'
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
    height: 'calc(100% - 299px)',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      height: 'unset',
      overflow: 'unset'
    },
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  courseListComponent: {
    backgroundColor: '#082139',
    width: 'calc(100% - 293px)',
    backgroundImage: 'linear-gradient(135.12deg, #2E0055 0.07%, #000000 100.02%)',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100vw - 293px)'
    }
  },
  courseTile: {
    height: '100%',
    borderRadius: '8px',
    position: 'relative',
    cursor: 'pointer',
    '&:hover > .descriptionHover': {
      top: 0,
      opacity: 1
    },
    overflow: 'hidden'
  },
  suggestCourseTile: {
    height: '100%',
    padding: '34px 34px',
    background: '#F1F1FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px'
  },
  suggestHeader: {
    color: '#000000',
    fontSize: '22px',
    fontWeight: 700
  },
  suggestButton: {
    fontWeight: 700,
    fontSize: '16px',
    height: '40px',
    borderRadius: '50px'
  },
  font15: {
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'left'
  },
  page: {
    paddingTop: '73px',
    width: '100%',
    minHeight: 'calc(100vh - 73px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  chipStyle: {
    color: '#101658',
    backgroundColor: '#F1F1FB',
    fontWeight: 600,
    width: 'fit-content',
    borderColor: '#CBD5E1',
    cursor: 'pointer'
  },
  tileChip: {
    marginRight: '10px',
    fontSize: '13px !important',
    border: 'none',
    fontWeight: 600,
    width: 'fit-content',
    color: '#fff',
    backgroundColor: '#101658'
  },
  selectedChip: {
    backgroundColor: '#101658',
    color: '#ffffff',
    fontWeight: 600,
    width: 'fit-content',
    borderColor: '#CBD5E1',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#101658 !important',
      color: '#ffffff'
    }
  },
  font13: {
    fontSize: '13px',
    fontWeight: 300,
    textAlign: 'left'
  },
  courseName: {
    fontSize: '20px !important',
    textAlign: 'left',
    fontWeight: 700,
    color: '#fff',
    lineHeight: '28px',
    paddingBottom: '6px',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2
  },
  instructorAvatar: {
    width: 56,
    height: 56,
    alignSelf: 'center'
  },
  coursesGrid: {
    maxWidth: '1280px',
    padding: '0px 40px',
    marginTop: '10px',
    marginBottom: '40px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      marginTop: '10px',
      marginBottom: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 30px'
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
  },
  filtersHeader: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#101658'
  },
  filtersSubHeader: {
    fontSize: '17px',
    fontWeight: 600,
    color: '#101658'
  }
}));

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
  textAlign: 'center'
}));

export const CourseTileHover = memo(
  ({ handleTileClick, course }: { handleTileClick: Function; course: any }) => {
    const buttonText = useMemo(
      () => (!course?.registration_page_released ? 'Join the waitlist' : 'Learn more'),
      [course]
    );
    const { sendAnalyticsData } = useContext(AnalyticsContext);

    const handleClick = useCallback(() => {
      sendAnalyticsData(course, `All Courses Page - Course "${buttonText}" button clicked`, {});
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
          background: `linear-gradient(102.98deg, rgba(0, 0, 0, 0.2) 20.06%, rgba(0, 0, 0, 0) 76.6%), ${getColor(
            course?.business_function_category
          )} !important`,
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

export const getColor = (category: string) => {
  switch (category) {
    case 'Data & ML':
      return '#54377A';
    case 'Sales':
      return '#5F52A1';
    case 'Other':
      return '#696DC8';
    default:
      return '#101658';
  }
};
