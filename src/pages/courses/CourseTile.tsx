import { Avatar, Grid, Stack, Typography, Box } from '@material-ui/core';
import { memo, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { trackEvent } from 'utils/eventTracking';
import { CourseTileHover, useStyles } from './Common';

function CourseTile({ course }: { course: any }) {
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
      trackEvent(course, 'All Courses Page - Course Tile - Hover', {
        'Course Name': course?.name,
        'Course ID': course?.id
      });
    }
  }

  const handleTileClick = useCallback(() => {
    trackEvent(course, 'All Courses Page - Course Tile - Selected', {
      'Course Name': course?.name,
      'Course ID': course?.id
    });
    const url = course?.registration_page_released
      ? course?.registration_page_url
      : `/registration/personal-details?cohort_id=${course?.cohort_id}`;
    window.open(url, '_blank');
  }, [course]);

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ px: '12px !important', maxWidth: '420px !important' }}>
      <Stack
        className={classes.courseTile}
        onMouseEnter={() => handleMouseIn()}
        onMouseLeave={() => handleMouseOut()}
      >
        <>
          <Typography variant="h4" className={classes.courseName}>
            {course.name}
          </Typography>
          <Stack>
            {course?.instructor_names && (
              <Stack
                direction="row"
                spacing={2.5}
                sx={{ alignItems: 'center', marginBottom: '20px', padding: '0px 20px' }}
              >
                <Avatar
                  src={course?.instructor_headshot}
                  alt={course?.instructor_names}
                  className={classes.instructorAvatar}
                />
                <Stack>
                  <Typography className={classes.font15}>
                    Live with {course?.instructor_names || 'the instructor'}
                  </Typography>
                  <Typography className={classes.font13}>{course?.instructor_title}</Typography>
                </Stack>
              </Stack>
            )}
            {course?.instructor_logos && (
              <Box sx={{ borderTop: '1.5px solid #0000001a' }}>
                <LazyLoadImage
                  src={course?.instructor_logos}
                  alt="instructor-companies"
                  style={{ margin: '20px auto 0px auto', maxHeight: '30px', maxWidth: '250px' }}
                />
              </Box>
            )}
            {!course?.instructor_names && !course?.instructor_logos && (
              <Typography sx={{ padding: '0px 20px', textAlign: 'left' }}>
                {course?.short_description}
              </Typography>
            )}
          </Stack>
        </>
        <CourseTileHover handleTileClick={handleTileClick} course={course} />
      </Stack>
    </Grid>
  );
}

export default memo(CourseTile);
