import { useEffect, useState } from 'react';
import { Stack, Container } from '@material-ui/core';
import Page from 'components/Page';
import { getPathData } from 'redux/slices/path';
import { RootState, useDispatch, useSelector } from 'redux/store';
import LoadingScreen from 'components/LoadingScreen';
import { trackEvent } from 'utils/eventTracking';
import PathHeader from './PathHeader';
import CourseDetails from './CourseDetails';
import CoursesCarousel from './CoursesCarousel';
import { LoadingContainer } from './Common';

export default function PathsTab() {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [nextRecommended, setNextRecommended] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const pathSlug = window.location.pathname.split('/')[2] || '';
  const path = useSelector(
    (state: RootState) => state?.path?.paths.filter((path) => path.slug === pathSlug)[0]
  );
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);
  const { courses } = path || [];

  useEffect(() => {
    !courses && dispatch(getPathData(pathSlug));
  }, [pathSlug]);

  useEffect(() => {
    let found = false;
    if (courses?.length > 0) {
      trackEvent(cohort || courses[0], 'Path Pages - Page Loaded', {
        'Path Name': path?.name
      });
      courses?.forEach((course: any, index: any) => {
        if (!found && !course.is_complete) {
          setActiveCourse(index);
          setNextRecommended(index);
          found = true;
        }
      });
      setLoading(false);
    }
  }, [courses?.length]);

  if (typeof courses === 'undefined' || loading || courses?.length === 0) {
    return (
      <Container sx={{ position: 'relative', height: '100%' }}>
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Page title="Sphere | Courses Track">
      <Stack sx={{ alignItems: 'center' }}>
        <PathHeader
          pathName={path?.name}
          pathDescription={path?.description}
          total={courses?.length}
          complete={courses?.filter((course) => course.is_complete).length}
        />
        <CoursesCarousel
          courses={courses}
          activeCourse={activeCourse}
          setActiveCourse={(value: number) => setActiveCourse(value)}
        />
        <CourseDetails
          key={`${String(activeCourse)} ${courses[activeCourse]}`}
          courseData={courses[activeCourse]}
          pathSlug={path?.slug}
          nextRecommended={activeCourse === nextRecommended}
        />
      </Stack>
    </Page>
  );
}
