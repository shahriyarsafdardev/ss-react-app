import { Grid } from '@material-ui/core';
import { memo } from 'react';
import { useStyles } from './Common';
import CourseTile from './CourseTile';

function CoursesContainer({ courses }: { courses: any }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} sx={{ ml: '0 !important' }} className={classes.justifyMobileCenter}>
      {courses.map((course: any) => (
        <CourseTile key={course.id} course={course} />
      ))}
    </Grid>
  );
}

export default memo(CoursesContainer);
