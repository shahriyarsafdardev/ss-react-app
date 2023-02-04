import { Stack, Typography } from '@material-ui/core';
import { memo } from 'react';
import { useStyles, CoursesInnerSection } from './Common';
import CoursesList from './CoursesList';

function CoursesContainer({ courses, heading }: { courses: any; heading: string }) {
  const classes = useStyles();

  return (
    <Stack spacing={2} className={classes.coursesContainer}>
      <CoursesInnerSection spacing={2}>
        <Typography
          fontSize="20px"
          textAlign="center"
        >{`Designed for teams and individuals ${heading} `}</Typography>

        <CoursesList courses={courses} />
      </CoursesInnerSection>
    </Stack>
  );
}

export default memo(CoursesContainer);
