import { Grid } from '@material-ui/core';
import CourseTile from './CourseTile';

export default function CoursesList({ courses }: { courses: any }) {
  return (
    <Grid container spacing={4}>
      {courses.map((course: any) => (
        <CourseTile key={course.id} course={course} />
      ))}
    </Grid>
  );
}
