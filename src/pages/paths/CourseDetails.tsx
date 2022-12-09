import { Stack, Typography, Button, CircularProgress, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { getCourseSessions } from 'redux/slices/path';
import { useDispatch } from 'redux/store';
import { trackEvent } from 'utils/eventTracking';
import { Course } from '../../@types/course';
import { useStyles } from './Common';
import SessionDetails from './SessionDetails';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '30px',
  padding: '10px',
  margin: '40px auto !important'
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  margin: '100px auto'
}));

export default function CourseDetails({
  pathSlug,
  courseData,
  nextRecommended
}: {
  courseData: Course;
  pathSlug: String;
  nextRecommended: boolean;
}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!courseData?.sessions && pathSlug) {
      dispatch(getCourseSessions(pathSlug, courseData?.id));
    }
  }, []);

  const handleSeeDetails = () => {
    trackEvent(courseData, 'Path Pages - "See More Details" button clicked', {
      'Course Name': courseData?.name
    });
    window.open(courseData?.registration_page_url, '_blank');
  };

  return (
    <Box
      padding={{ xs: '20px', sm: '50px' }}
      sx={{ width: '100%', color: '#1E293B', maxWidth: '1200px' }}
    >
      <Stack spacing={2}>
        {nextRecommended && (
          <Typography sx={{ fontWeight: '700' }}>
            The next recommended course in this track is:
          </Typography>
        )}
        <Typography variant="h3" className={classes.courseDetailsHeading}>
          {courseData?.name}
        </Typography>
        <Typography>{courseData?.description}</Typography>
        <StyledButton
          variant="contained"
          sx={{ marginX: 'auto !important' }}
          onClick={() => handleSeeDetails()}
        >
          See More Details
        </StyledButton>
      </Stack>
      {courseData?.sessions ? (
        courseData?.sessions?.map(
          (session: any) =>
            session.summary && <SessionDetails key={session.number} sessionData={session} />
        )
      ) : (
        <StyledCircularLoader>
          <CircularProgress />
        </StyledCircularLoader>
      )}
    </Box>
  );
}
