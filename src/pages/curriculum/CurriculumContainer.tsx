import { Stack, Typography } from '@material-ui/core';
import { memo } from 'react';
import { useStyles } from './Common';
import CoursesList from './CoursesList';

function CurriculumContainer({ courses, heading }: { courses: any; heading: string }) {
  const classes = useStyles();

  return (
    <Stack spacing={2} className={classes.coursesContainer}>
      <Typography
        fontSize="20px"
        textAlign="center"
      >{`Designed for teams and individuals ${heading} `}</Typography>

      <CoursesList courses={courses} />
    </Stack>
  );
}

export default memo(CurriculumContainer);
