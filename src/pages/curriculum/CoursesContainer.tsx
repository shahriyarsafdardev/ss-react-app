import { Grid } from '@material-ui/core';
import CourseTile from './CourseTile';

export default function CoursesContainer({ courses }: { courses: any }) {
  return (
    <Grid container spacing={4} sx={{ ml: '-8px !important' }}>
      {courses.map((course: any) => (
        <CourseTile key={course.id} course={course} />
      ))}
    </Grid>
  );
}
