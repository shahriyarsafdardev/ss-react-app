import { Stack, Typography } from '@material-ui/core';
import { useStyles } from './Common';
import CoursesList from './CoursesList';

export default function CoursesContainer({ courses, heading }: { courses: any; heading: string }) {
  const classes = useStyles();

  return (
    <Stack spacing={4} className={classes.coursesContainer}>
      <Typography
        fontSize="20px"
        textAlign="center"
      >{`Designed for teams and individuals ${heading} `}</Typography>

      <CoursesList courses={courses} />
    </Stack>
  );
}
