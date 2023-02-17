import { Grid, Stack, Typography, Chip, Avatar } from '@material-ui/core';
import { memo, useCallback } from 'react';
import { trackEvent } from 'utils/eventTracking';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import { CourseTileHover, useStyles, getColor } from './Common';

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
    <Grid item xs={12} sm={12} md={6} lg={4} sx={{ px: '12px !important' }}>
      <Stack
        className={classes.courseTile}
        onMouseEnter={() => handleMouseIn()}
        onMouseLeave={() => handleMouseOut()}
      >
        <>
          <Stack
            sx={{
              background: `linear-gradient(102.98deg, rgba(0, 0, 0, 0.2) 20.06%, rgba(0, 0, 0, 0) 76.6%), ${getColor(
                course?.business_function_category
              )}`,
              p: '20px'
            }}
            height="170px"
            minHeight="170px"
            justifyContent="space-around"
          >
            <Typography variant="h4" className={classes.courseName}>
              {course.name}
            </Typography>
            <Stack direction="row" flexWrap="wrap">
              {course?.start_date && (
                <Chip
                  label={`Starting ${moment(new Date(course?.start_date)).format('ll').toString()}`}
                  variant="outlined"
                  className={classes.tileChip}
                  sx={{ backgroundColor: '#101658', marginBottom: '5px' }}
                />
              )}
              {course?.business_function_category && (
                <Chip
                  label={course.business_function_category}
                  variant="outlined"
                  className={classes.tileChip}
                  sx={{ backgroundColor: '#101658' }}
                />
              )}
            </Stack>
          </Stack>
          <Stack
            spacing={2}
            justifyContent="space-around"
            height="inherit"
            sx={{ p: '20px', color: '#1e293b' }}
          >
            {course?.instructor_names && (
              <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
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
            {course?.instructor_names && course?.instructor_logos && (
              <LazyLoadImage
                src={course?.instructor_logos}
                alt="instructor-companies"
                style={{ margin: '20px auto 0px auto', maxHeight: '30px', maxWidth: '250px' }}
              />
            )}
            {!course?.instructor_names && !course?.instructor_logos && (
              <Typography sx={{ textAlign: 'left' }}>{course?.short_description}</Typography>
            )}
          </Stack>
        </>
        {/* <CourseTileHover handleTileClick={handleTileClick} course={course} /> */}
      </Stack>
    </Grid>
  );
}

export default memo(CourseTile);
