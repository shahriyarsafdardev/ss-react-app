import { Stack, Typography } from '@material-ui/core';
import CoursesList from './CoursesList';

export default function CoursesContainer({ courses, heading }: { courses: any; heading: string }) {
  return (
    <Stack
      spacing={4}
      sx={{
        paddingY: '4rem',
        paddingX: '5rem',
        alignItems: 'center',
        backgroundColor: '#082139',
        backgroundImage: 'linear-gradient(189deg, #082139, rgba(116, 116, 208, 0.26))',
        color: '#fff'
      }}
    >
      <Typography fontSize="20px">{`Designed for teams and individuals ${heading} `}</Typography>
      <CoursesList courses={courses} />
    </Stack>
  );
}
