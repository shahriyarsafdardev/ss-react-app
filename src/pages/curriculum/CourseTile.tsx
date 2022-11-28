import { Avatar, Grid, Stack, Typography, Box } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { CourseTileHover, useStyles } from './Common';

export default function CourseTile({ course }: { course: any }) {
  const classes = useStyles();

  let startTime: any = {};
  let endTime: any = {};

  function handleMouseIn() {
    startTime = new Date();
  }

  function handleMouseOut() {
    endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;

    const hoverTime = Math.round(timeDiff % 60);
    if (hoverTime >= 2) {
      trackEvent(course, 'Curriculum Page - Cohort Tile - Hover', { 'Course Title': course?.name });
    }
  }

  const handleTileClick = () => {
    trackEvent(course, 'Curriculum Page - Cohort Tile - Selected', {
      'Course Title': course?.name
    });
    window.open(
      `https://portal.getsphere.com/registration/personal-details?cohort_id=${course?.id}`,
      '_blank'
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ px: '8px !important' }}>
      <Stack
        className={classes.courseTile}
        onMouseEnter={() => handleMouseIn()}
        onMouseLeave={() => handleMouseOut()}
      >
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            {course.name}
          </Typography>
          <Stack>
            {course?.preview_instructor_name && (
              <Stack direction="row" spacing={2.5} alignItems="center" marginBottom="20px">
                <Avatar
                  src={course?.preview_instructor_image}
                  alt={course?.preview_instructor_name}
                  className={classes.instructorAvatar}
                />
                <Stack>
                  <Typography className={classes.font14}>
                    Live with {course?.preview_instructor_name || 'the instructor'}
                  </Typography>
                  <Typography className={classes.font14}>
                    {course?.preview_instructor_affiliation}
                  </Typography>
                </Stack>
              </Stack>
            )}
            {course?.preview_instructor_logos && (
              <Box sx={{ borderTop: '1px solid #64748B' }}>
                <img
                  src={course?.preview_instructor_logos}
                  alt="instructor-companies"
                  style={{ margin: '20px auto 0px auto', maxHeight: '30px', maxWidth: '250px' }}
                />
              </Box>
            )}
            {!course?.preview_instructor_name && !course?.preview_instructor_logos && (
              <Typography>{course?.description}</Typography>
            )}
          </Stack>
        </>
        <CourseTileHover handleTileClick={handleTileClick} course={course} />
      </Stack>
    </Grid>
  );
}
