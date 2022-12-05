import { Stack, Typography, Button, CircularProgress, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { getCourseSessions } from 'redux/slices/track';
import { useDispatch } from 'redux/store';
import { Course } from '../../@types/course';
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

export default function CourseDetails({ courseData }: { courseData: Course }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courseData?.sessions) {
      dispatch(getCourseSessions(courseData?.id));
    }
  }, []);

  return (
    <Box sx={{ p: '50px', color: '#1E293B' }}>
      <Stack spacing={2}>
        {courseData.is_next_recommended && !courseData.is_complete && (
          <Typography sx={{ fontWeight: '700' }}>
            The next recommended course in this track is:
          </Typography>
        )}
        <Typography variant="h3" sx={{ fontSize: '38px' }}>
          {courseData?.name}
        </Typography>
        <Typography>{courseData?.description}</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <StyledButton variant="outlined">See More Details</StyledButton>
          <StyledButton variant="contained">Enroll</StyledButton>
        </Stack>
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
