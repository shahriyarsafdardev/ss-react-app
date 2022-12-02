import { Avatar, Stack, Typography, Box } from '@material-ui/core';
import { useStyles } from './Common';

export default function CarouselItem({ course }: { course: any }) {
  const classes = useStyles();

  return (
    <Stack className={classes.courseTile}>
      <>
        <Typography
          variant="h4"
          sx={{ marginBottom: '20px', padding: '0px 20px', fontSize: '1.2rem !important' }}
        >
          {course.name}
        </Typography>
        <Stack>
          {course?.preview_instructor_name && (
            <Stack
              direction="row"
              spacing={2.5}
              sx={{ alignItems: 'center', marginBottom: '20px', padding: '0px 20px' }}
            >
              <Avatar
                src={course?.preview_instructor_image}
                alt={course?.preview_instructor_name}
                className={classes.instructorAvatar}
              />
              <Stack>
                <Typography className={classes.font15}>
                  Live with {course?.preview_instructor_name || 'the instructor'}
                </Typography>
                <Typography className={classes.font13}>
                  {course?.preview_instructor_affiliation}
                </Typography>
              </Stack>
            </Stack>
          )}
          {course?.preview_instructor_logos && (
            <Box sx={{ borderTop: '1px solid #E6E6E6' }}>
              <img
                src={course?.preview_instructor_logos}
                alt="instructor-companies"
                style={{ margin: '20px auto 0px auto', maxHeight: '30px', maxWidth: '250px' }}
              />
            </Box>
          )}
          {!course?.preview_instructor_name && !course?.preview_instructor_logos && (
            <Typography sx={{ padding: '0px 20px' }}>{course?.description}</Typography>
          )}
        </Stack>
      </>
    </Stack>
  );
}
