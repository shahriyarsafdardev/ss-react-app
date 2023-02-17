import { Grid } from '@material-ui/core';
import { memo } from 'react';
import { useStyles } from './Common';
import CourseTile from './CourseTile';
import SuggestACourseTile from './SuggestACourseTile';

function CoursesList({ courses }: { courses: any }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} sx={{ ml: '0 !important' }} className={classes.justifyMobileCenter}>
      {courses.map((course: any) => (
        <CourseTile key={course.id} course={course} />
      ))}
      <SuggestACourseTile />
    </Grid>
  );
}

export default memo(CoursesList);
