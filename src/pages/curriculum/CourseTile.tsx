import { Avatar, Grid, Stack, Typography, Box } from '@material-ui/core';
import { CourseTileHover, useStyles } from './Common';

export default function CourseTile({ course }: { course: any }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ px: '8px !important' }}>
      <Stack className={classes.courseTile}>
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
                  sx={{ width: 56, height: 56 }}
                />
                <Stack>
                  <Typography>
                    Live with {course?.preview_instructor_name || 'the instructor'}
                  </Typography>
                  <Typography>{course?.preview_instructor_affiliation}</Typography>
                </Stack>
              </Stack>
            )}
            {course?.preview_instructor_logos && (
              <Box sx={{ borderTop: '1px solid #64748B' }}>
                <img
                  src={course?.preview_instructor_logos}
                  alt="instructor-companies"
                  width="140"
                  height="25"
                  style={{ margin: '20px auto 0px auto' }}
                />
              </Box>
            )}
            {!course?.preview_instructor_name && !course?.preview_instructor_logos && (
              <Typography>{course?.description}</Typography>
            )}
          </Stack>
        </>
        <CourseTileHover course={course} />
      </Stack>
    </Grid>
  );
}
