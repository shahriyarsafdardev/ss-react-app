import { Stack, Typography, Button, CircularProgress, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { getCourseSessions } from 'redux/slices/path';
import { useDispatch } from 'redux/store';
import { Course } from '../../@types/course';
import { useStyles } from './Common';
import SessionDetails from './SessionDetails';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '50%',
  borderRadius: '30px',
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
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
    window.open(courseData?.registration_page_url, '_blank');
  };

  const handleEnroll = () => {
    window.open(
      `https://portal.getsphere.com/registration/personal-details?cohort_id=${courseData?.id}`,
      '_blank'
    );
  };

  return (
    <Box sx={{ p: '50px', color: '#1E293B' }}>
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
        {courseData?.wait_listed ? (
          <StyledButton
            variant="contained"
            sx={{ marginX: 'auto !important' }}
            onClick={() => handleEnroll()}
          >
            Join the Waitlist
          </StyledButton>
        ) : (
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <StyledButton variant="outlined" onClick={() => handleSeeDetails()}>
              See More Details
            </StyledButton>
            <StyledButton variant="contained" onClick={() => handleEnroll()}>
              Enroll
            </StyledButton>
          </Stack>
        )}
      </Stack>
      {courseData?.sessions ? (
        courseData?.sessions?.map((session: any) => (
          <SessionDetails key={session.number} sessionData={session} />
        ))
      ) : (
        <StyledCircularLoader>
          <CircularProgress />
        </StyledCircularLoader>
      )}
    </Box>
  );
}
