import { Stack } from '@material-ui/core';
import CourseTile from './CourseTile';

export default function CoursesList({ courses }: { courses: any }) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{ justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}
    >
      {courses.map((course: any) => (
        <CourseTile key={course.id} course={course} />
      ))}
    </Stack>
  );
}
