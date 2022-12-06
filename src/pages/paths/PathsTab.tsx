import { useEffect, useState } from 'react';
import { Stack, Container } from '@material-ui/core';
import Page from 'components/Page';
import { getPathData } from 'redux/slices/path';
import { RootState, useDispatch, useSelector } from 'redux/store';
import LoadingScreen from 'components/LoadingScreen';
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

  useEffect(() => {
    !path?.id && dispatch(getPathData(pathSlug));
    let found = false;
    if (path?.courses?.length > 0) {
      path?.courses?.forEach((course: any, index: any) => {
        if (!found && !course.is_complete) {
          setActiveCourse(index);
          setNextRecommended(index);
          found = true;
        }
      });
      setLoading(false);
    }
  }, [path?.id]);

  if (loading || path?.courses?.length === 0) {
    return (
      <Container sx={{ position: 'relative', height: '100%' }}>
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Page title="Sphere | Courses Path">
      <Stack>
        <PathHeader
          pathName={path?.name}
          pathDescription={path?.description}
          total={path?.courses?.length}
          complete={path?.courses?.filter((course) => course.is_complete).length}
        />
        <CoursesCarousel
          courses={path?.courses}
          activeCourse={activeCourse}
          setActiveCourse={(value: number) => setActiveCourse(value)}
        />
        <CourseDetails
          key={`${String(activeCourse)} ${path?.courses[activeCourse]}`}
          courseData={path?.courses[activeCourse]}
          pathSlug={path?.slug}
          nextRecommended={activeCourse === nextRecommended}
        />
      </Stack>
    </Page>
  );
}
