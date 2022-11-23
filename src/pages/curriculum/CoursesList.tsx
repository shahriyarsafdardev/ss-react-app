import { Stack } from '@material-ui/core';
import CourseTile from './CourseTile';

export default function CoursesList({ courses }: { courses: any }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ width: '100%', flexWrap: 'wrap' }}>
      {courses.map((course: any) => (
        <CourseTile key={course.id} course={course} />
      ))}
    </Stack>
  );
}
