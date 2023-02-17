import { Stack } from '@material-ui/core';
import { memo, useEffect, useState, useRef } from 'react';
import { useStyles, CoursesInnerSection } from './Common';
import CoursesList from './CoursesList';

function CoursesContainer({ courses }: { courses: any }) {
  const classes = useStyles();
  const courseRef = useRef<any>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const scrollTop = () => {
    if (courseRef.current) {
      return courseRef?.current?.scrollTop;
    }
    return 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Stack
      spacing={2}
      className={classes.coursesContainer}
      ref={courseRef}
      sx={{ overflow: scrollPosition >= 226 || scrollTop() !== 0 ? 'auto' : 'hidden' }}
    >
      <CoursesInnerSection spacing={2}>
        <CoursesList courses={courses} />
      </CoursesInnerSection>
    </Stack>
  );
}

export default memo(CoursesContainer);
